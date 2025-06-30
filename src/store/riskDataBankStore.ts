import {
	DEVIATION_EP,
	EXPORT_RISK_BANK_EP,
	PARAMETER_EP,
	RISK_BANK_EP,
	SAFEGUARD_EP
} from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import {
	parseRiskBankToFlatted,
	parseRiskBankToFlattedByConsequences,
	parseRiskBankToPayload,
} from "@/modules/RiskBankModule/parseRiskBank"
import { downloadProxyFile } from "@/services/downloadFile"
import { commonInitualState } from "@/types/common"
import {
	Deviations,
	Parameter,
	RiskBank,
	RiskBankSchemaForm,
	RiskDataBankState,
} from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"
import useAuthStore from "./authStore"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	riskDataBankItems: [],
	riskDataBankFlat: [],
	riskDataBankFlatByConsequences : [],
	supportData: {
		isFetchingSupportData: false,
		parameterItems: [],
		deviationItems: [],
		safeguardItems: [],
	},
	riskDataBankSelected: null,
}

const useRiskDataBankStore = createStore<RiskDataBankState>(
	"risk-data-bank",
	(set, get) => ({
		...initialState,
		actions: {
			fetchAllData: async () => {
				const year_selected = useAuthStore.getState().year_selected
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<RiskBank[]>>(
					(resolve, reject) => {
						getDataApi<RiskBank[]>(RISK_BANK_EP, {
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
							year: year_selected,
							search : get().querySearch || undefined
						})
							.then((data) => {
								//parse data to flat

								if (Array.isArray(data.data)) {
									const flattenedData =
										parseRiskBankToFlattedByConsequences(data.data || [])

									set({
										riskDataBankItems: data.data || [],
										riskDataBankFlatByConsequences: flattenedData,
										meta: data?.meta,
									})
									resolve(data)
								}
							})
							.catch((err) => {
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
								reject(err)
							})
							.finally(() => {
								set({
									isFetching: false,
								})
							})
					}
				)
			},
			fetchSingleData: async (id: any) => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<RiskBank>>(
					(resolve, reject) => {
						getDataApi<RiskBank>(`${RISK_BANK_EP}/${id}`)
							.then((data) => {
								//parse data to flat

								if (data.data) {
									set({
										riskDataBankSelected: data.data,
									})
									resolve(data)
								}
							})
							.catch((err) => {
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
								reject(err)
							})
							.finally(() => {
								set({
									isFetching: false,
								})
							})
					}
				)
			},
			fetchAllSupportData: async () => {
				set((prev) => ({
					supportData: {
						...prev.supportData,
						isFetchingSupportData: true,
					},
				}))
				return new Promise<{
					deviation: Deviations[] | null
					safeguard: Safeguard[] | null
				}>(async (resolve, reject) => {
					try {
						const [parameterResult, deviationResult, safeguardReusult] =
							await Promise.all([
								getDataApi<Parameter[]>(PARAMETER_EP, {
									page: 1,
									per_page: 1000,
								}),
								getDataApi<Deviations[]>(DEVIATION_EP, {
									page: 1,
									per_page: 1000,
								}),
								getDataApi<Safeguard[]>(SAFEGUARD_EP, {
									page: 1,
									per_page: 1000,
								}),
							])

						const result: {
							parameter : Parameter[] | null,
							deviation: Deviations[] | null
							safeguard: Safeguard[] | null
						} = {
							parameter: null,
							deviation: null,
							safeguard: null,
						}

						if (Array.isArray(parameterResult.data)) {
							result.parameter = parameterResult.data
						}

						if (Array.isArray(deviationResult.data)) {
							result.deviation = deviationResult.data
						}
						if (Array.isArray(safeguardReusult.data)) {
							result.safeguard = safeguardReusult.data
						}

						resolve(result)
						set((prev) => ({
							supportData: {
								...prev.supportData,
								isFetchingSupportData: false,
								parameterItems: result.parameter,
								safeguardItems: result.safeguard,
								deviationItems: result.deviation,
							},
						}))
					} catch (error: any) {
						toast({
							title: "ERROR",
							description: error.message,
							variant: "destructive",
						})
						set((prev) => ({
							supportData: {
								...prev.supportData,
								isFetchingSupportData: false,
							},
						}))
						reject(error)
					}
				})
			},
			createData: async (payload: FormData) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskBank>>(
					(resolve, reject) => {
						postData<RiskBank>(RISK_BANK_EP, payload, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						})
							.then((data) => {
								set((state) => {
									return {
										riskDataBankItems: [
											...state.riskDataBankItems,
											...(data.data ? [data.data] : []),
										],
									}
								})
								resolve(data)
							})
							.catch((err) => {
								reject(err)
							})
							.finally(() => {
								set({
									isSubmit: false,
								})
							})
					}
				)
			},
			updateData: async (id: any, payload: RiskBankSchemaForm) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskBank>>(
					async (resolve, reject) => {
						try {
							const formData = parseRiskBankToPayload(payload)

							const result = await postData<RiskBank>(
								`${RISK_BANK_EP}/${id}`,
								formData,
								{
									headers: {
										"Content-Type": "multipart/form-data",
									},
								}
							)
							if (result.data) {
								set((state) => {
									return {
										riskDataBankItems: [
											...state.riskDataBankItems,
											...(result.data
												? [result.data]
												: []),
										],
									}
								})
								resolve(result)
							}
						} catch (error) {
							reject(error)
						} finally {
							set({
								isSubmit: false,
							})
						}
					}
				)
			},
			deleteData: async (id) => {
				set({
					isFetchingDelete : true
				})
				return new Promise<ResponseApiType<null>>((resolve, reject) => {
					deleteData<null>(RISK_BANK_EP + "/" + id)
						.then((data) => {
							// const filterData = get().riskDataBankItems.filter(
							// 	(x) => x.id?.toString() !== id.toString()
							// )
							// const filterDataFlat =
							// 	get().riskDataBankFlat.filter(
							// 		(x) => x.id?.toString() !== id.toString()
							// 	)
							// set({
							// 	riskDataBankItems: filterData,
							// 	riskDataBankFlat: filterDataFlat,
							// })
							resolve(data)
						})
						.catch((err) => {
							toast({
								title: "ERROR",
								description: err.message,
								variant: "destructive",
							})
							reject(err)
						})
						.finally(() => {
							set({
								isFetchingDelete : true
							})
						})
				})
			},
			setPagination: (updater) =>
				set((state) => ({
					pagination_tanstack: runUpdater(
						updater,
						state.pagination_tanstack
					),
				})),
			setQuerySearch: (serachValue) =>
				set(() => ({
					querySearch: serachValue,
				})),
			exportExcel() {
				set({
					isFetchingExportData: true,
				})
				const year_selected = useAuthStore.getState().year_selected
				downloadProxyFile(`${EXPORT_RISK_BANK_EP}`, {
					year: year_selected,
				})
					.then((blob) => {
						toast({
							title: "Success",
							description: "Successfull download file excel",
							variant: "success",
						})
					})
					.catch((err) => {
						toast({
							title: "Filed",
							description: err.message,
							variant: "destructive",
						})
					})
					.finally(() => {
						set({
							isFetchingExportData: false,
						})
					})
			},
		},
	})
)

export default useRiskDataBankStore
