import { RISK_BANK_EP, SAFEGUARD_EP } from "@/constants/endpoints"
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
import { RiskBank, RiskBankFlat, RiskDataBankState } from "@/types/riskDataBank"
import { z } from "zod"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	riskDataBankItems: [],
	riskDataBankFlat: [],
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
														safeguard_link : safeguard.file_path,
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
			createData: async (payload: z.infer<typeof SafeguardSchema>) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskBank>>(
					(resolve, reject) => {
						const formData = new FormData()
						Object.entries(payload).forEach(([key, value]) => {
							formData.append(key, value)
						})
						postData<RiskBank>(SAFEGUARD_EP, formData, {
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
						putData<RiskBank>(`${SAFEGUARD_EP}/${id}`, formData, {
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
					deleteData<null>(SAFEGUARD_EP + "/" + id)
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
