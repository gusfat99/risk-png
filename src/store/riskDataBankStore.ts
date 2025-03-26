import { DEVIATION_EP, RISK_BANK_EP, SAFEGUARD_EP } from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	putData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { SafeguardSchema } from "@/schemas/SafeguardSchema"
import { commonInitualState } from "@/types/common"
import {
	Deviations,
	RiskBank,
	RiskBankFlat,
	RiskDataBankState,
} from "@/types/riskDataBank"
import { z } from "zod"
import { createStore, runUpdater } from "./store"
import { Safeguard } from "@/types/safeguard"

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
									const flattenedData: RiskBankFlat[] = (
										data?.data || []
									).flatMap((mainEntry, mainIndex) => {
										const consequences =
											mainEntry.consequences || []
										const totalSafeguards =
											consequences.reduce(
												(sum, cons) =>
													sum +
													(cons.safeguards?.length ||
														0),
												0
											)

										return consequences.flatMap(
											(consequence, consIndex) => {
												const safeguards =
													consequence.safeguards || []
												const consequenceRowspan =
													safeguards.length

												return safeguards.map(
													(safeguard, sgIndex) => ({
														// Data Utama
														id: mainEntry.id,
														uniqueKey: `${mainEntry.id}_${consequence.id}_${safeguard.id}`,
														parameter:
															mainEntry.parameter,
														cause: mainEntry.cause,
														deviation_id:
															mainEntry.deviation_id,
														deviations:
															mainEntry.deviations,
														deviation:
															mainEntry.deviations
																.name,

														// Data Konsekuensi
														consequences,
														consequence:
															consequence.consequence,

														// Data Safeguard
														safeguards,
														safeguard:
															safeguard.safeguard,
														safeguard_link:
															safeguard.file_path,
														safeguard_title:
															safeguard.safeguard_title,

														// Metadata untuk Rowspan
														mainRowspan:
															totalSafeguards,
														consequenceRowspan:
															consequenceRowspan,
														isFirstMain:
															sgIndex === 0 &&
															consIndex === 0, // Baris pertama di grup utama
														isFirstConsequence:
															sgIndex === 0, // Baris pertama di grup konsekuensi
													})
												)
											}
										)
									})
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
			updateData: async (
				id: any,
				payload: z.infer<typeof SafeguardSchema>
			) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskBank>>(
					(resolve, reject) => {
						const formData = new FormData()
						Object.entries(payload).forEach(([key, value]) => {
							formData.append(key, value)
						})
						putData<RiskBank>(`${RISK_BANK_EP}/${id}`, formData, {
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
							set({
								riskDataBankItems: filterData,
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
			// setPagination : ()
		},
	})
)

export default useRiskDataBankStore
