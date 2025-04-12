import { DEVIATION_EP, RISK_BANK_EP, SAFEGUARD_EP } from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { parseRiskBankToFlatted } from "@/modules/RiskBankModule/parseRiskBank"
import { commonInitualState } from "@/types/common"
import {
	Deviations,
	RiskBank,
	RiskDataBankState
} from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	riskDataBankItems: [],
	riskDataBankFlat: [],
	supportData: {
		isFetchingSupportData: false,
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
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<RiskBank[]>>(
					(resolve, reject) => {
						getDataApi<RiskBank[]>(RISK_BANK_EP, {
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
						})
							.then((data) => {
								//parse data to flat

								if (Array.isArray(data.data)) {
									const flattenedData =
										parseRiskBankToFlatted(data.data || [])
										
									set({
										riskDataBankItems: data.data || [],
										riskDataBankFlat: flattenedData,
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
						const [deviationResult, safeguardReusult] =
							await Promise.all([
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
							deviation: Deviations[] | null
							safeguard: Safeguard[] | null
						} = {
							deviation: null,
							safeguard: null,
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
			updateData: async (id: any, payload: File) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskBank>>(
					(resolve, reject) => {
						postData<RiskBank>(`${RISK_BANK_EP}/${id}`, payload, {
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
			deleteData: async (id) => {
				return new Promise<ResponseApiType<null>>((resolve, reject) => {
					deleteData<null>(RISK_BANK_EP + "/" + id)
						.then((data) => {
							const filterData = get().riskDataBankItems.filter(
								(x) => x.id?.toString() !== id.toString()
							)
							const filterDataFlat =
								get().riskDataBankFlat.filter(
									(x) => x.id?.toString() !== id.toString()
								)
							set({
								riskDataBankItems: filterData,
								riskDataBankFlat: filterDataFlat,
							})
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
								isFetching: false,
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
		},
	})
)

export default useRiskDataBankStore
