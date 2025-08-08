import { HAZOP_PATHNAME_STORAGE } from "@/constants"
import {
	EXPORT_HAZOP_RESPONSE_EP,
	EXPORT_RISK_SEVERITY_EP,
	NODE_EP,
	REPORT_RISK_HAZOP_RESPONSE_EP,
	REPORT_RISK_RESPONSE_EP,
	RISK_ANALYST_EP,
	RISK_RESPONSE_EP,
	SEVERITY_EP,
} from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { downloadProxyFile } from "@/services/downloadFile"
import fetchFileViaProxy from "@/services/fetchFileAsFile"
import { commonInitualState } from "@/types/common"
import { Node } from "@/types/node"
import {
	Hazop,
	HazopReport,
	RiskResponse,
	RiskResponseSevertyExpectMultipleSchemaForm,
	RiskResponseSevertyExpectSchemaForm,
	RiskResponseState
} from "@/types/riskResponse"
import { Severity } from "@/types/severity"
import useAuthStore from "./authStore"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	severityItems: [],
	riskResponseItems: [],
	hazopResponseReportItems: [],
	riskResponseSelected: null,
	nodeSelected: null,
	hazopItemsSelected: null,
	isFetchingHazopItems: false,
	isFetchingSeverity: false,
	isFetchingExportData: false,
	riskSeveritySelected: "risk_ranking_current",
	hazopDelete: {
		isFetching: false,
		id: null
	},
	supportData: {
		node: {
			isFetching: false,
			nodeItems: [],
		},
		isSubmitHazop: false,
	},
}

const useRiskResponseStore = createStore<RiskResponseState>(
	"risk-response",
	(set, get) => ({
		...initialState,
		actions: {
			fetchAllData: async (nodeId: any, isForReport = false) => {
				const year_selected = useAuthStore.getState().year_selected
				set({
					isFetching: true,
				})
				return new Promise<
					ResponseApiType<{
						risk_items: RiskResponse[]
					}>
				>((resolve, reject) => {
					const EP = isForReport ? `${REPORT_RISK_RESPONSE_EP}` : `${RISK_RESPONSE_EP}/node/${nodeId}`;
					getDataApi<{
						risk_items: RiskResponse[]
					}>(
						`${EP}`,
						{
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
							year: year_selected,
							search: get().querySearch || undefined,
							node_id: isForReport ? nodeId : undefined,
						}
					)
						.then((data) => {
							if (data.data) {
								set({
									riskResponseItems:
										data.data.risk_items || [],
									meta: data?.meta,
								})
								resolve(data)
							} else {
								set({
									riskResponseItems: [],
									meta: data?.meta,
								})
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
				})
			},
			fetchHazopResponseReport: async (nodeId: any) => {
				const year_selected = useAuthStore.getState().year_selected
				set({
					isFetching: true,
				})
				return new Promise<
					ResponseApiType<HazopReport[]>
				>((resolve, reject) => {
					const EP = `${REPORT_RISK_HAZOP_RESPONSE_EP}`;
					getDataApi<HazopReport[]>(
						`${EP}`,
						{
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
							year: year_selected,
							search: get().querySearch || undefined,
							node_id: nodeId,
						}
					)
						.then((data) => {
							if (data.data) {
								set({
									hazopResponseReportItems:
										data.data || [],
									meta: data?.meta,
								})
								resolve(data)
							} else {
								set({
									hazopResponseReportItems: [],
									meta: data?.meta,
								})
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
				})
			},
			fetchNodeData: async () => {
				set((prev) => ({
					supportData: {
						...prev.supportData,
						node: {
							...prev.supportData.node,
							isFetching: true,
						},
					},
				}))
				return new Promise<ResponseApiType<Node[]>>(
					(resolve, reject) => {
						getDataApi<Node[]>(NODE_EP, {
							page: 1,
							per_page: 1000,
						})
							.then((data) => {
								//parse data to flat
								if (Array.isArray(data.data)) {
									set((prev) => ({
										supportData: {
											...prev.supportData,
											node: {
												isFetching: false,
												nodeItems: data.data || [],
											},
										},
									}))
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
								set((prev) => ({
									supportData: {
										...prev.supportData,
										node: {
											...prev.supportData.node,
											isFetching: false,
										},
									},
								}))
							})
					}
				)
			},
			fetchSingleData: async (nodeId: any, riskId: any) => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<RiskResponse>>(
					(resolve, reject) => {
						getDataApi<RiskResponse>(`${RISK_ANALYST_EP}/${nodeId}/${riskId}`)
							.then((data) => {
								if (data.data) {
									set({
										riskResponseSelected: data.data,
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
			fetchHazopByRiskAnalyst: async (
				nodeId: any,
				riskAnalystId: any
			) => {
				set({
					isFetchingHazopItems: true,
				})
				return new Promise<ResponseApiType<Hazop[]>>(
					(resolve, reject) => {
						getDataApi<Hazop[]>(
							`${RISK_RESPONSE_EP}/node/${nodeId}/${riskAnalystId}`
						)
							.then(async (data) => {
								//parse data to flat
								const hazopItems = data.data

								if (hazopItems && Array.isArray(hazopItems)) {
									for (
										let i = 0;
										i < hazopItems.length;
										i++
									) {
										if (hazopItems[i].document_report) {
											const file =
												await fetchFileViaProxy(
													`${HAZOP_PATHNAME_STORAGE}/${hazopItems[i].document_report}`,

													hazopItems[i]
														.document_report
												)
											hazopItems[i].document_report = file
										}
									}

									set({
										isFetchingHazopItems: false,
										hazopItemsSelected: hazopItems,
									})
									resolve(data)
								} else {
									set({
										hazopItemsSelected: null,
										isFetchingHazopItems: false,
									})
								}
							})
							.catch((err) => {
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
								set({
									isFetchingHazopItems: false,
									hazopItemsSelected: null,
								})
								reject(err)
							})
					}
				)
			},

			fetchSeverity: async () => {
				set({
					isFetchingSeverity: true,
				})
				return new Promise<ResponseApiType<Severity[]>>(
					(resolve, reject) => {
						getDataApi<Severity[]>(`${SEVERITY_EP}`)
							.then(async (data) => {
								if (Array.isArray(data.data)) {
									data.data.push({
										label: "Risk Rank Current",
										key: "risk_ranking_current",
									})
									set({
										isFetchingSeverity: false,
										severityItems: data.data,
									})
								}
							})
							.catch((err) => {
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
								set({
									isFetchingSeverity: false,
									severityItems: [],
								})
								reject(err)
							})
					}
				)
			},
			setHazopByRiskAnalyst: (data: Hazop[] | null) => {
				set({
					hazopItemsSelected: data,
				})
			},
			createHazop: async (
				nodeId: any,
				riskId: any,
				payload: FormData
			) => {
				set((prev) => ({
					supportData: {
						...prev.supportData,
						isSubmitHazop: true,
					},
				}))

				return new Promise<ResponseApiType<RiskResponse[]>>(
					(resolve, reject) => {
						postData<RiskResponse[]>(
							`${RISK_RESPONSE_EP}/node/${nodeId}/create-hazop/${riskId}`,
							payload,
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						)
							.then((data) => {
								// set((state) => {
								// 	return {
								// 		riskAnalysItems: [
								// 			...state.riskAnalysItems,
								// 			...(data.data ? [data.data] : []),
								// 		],
								// 	}
								// })

								resolve(data)
							})
							.catch((err) => {
								reject(err)
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
							})
							.finally(() => {
								set((prev) => ({
									supportData: {
										...prev.supportData,
										isSubmitHazop: false,
									},
								}))
							})
					}
				)
			},
			updateHazop: async (
				nodeId: any,
				riskId: any,
				payload: FormData
			) => {
				set((prev) => ({
					supportData: {
						...prev.supportData,
						isSubmitHazop: true,
					},
				}))

				return new Promise<ResponseApiType<RiskResponse[]>>(
					(resolve, reject) => {
						postData<RiskResponse[]>(
							`${RISK_RESPONSE_EP}/node/${nodeId}/update-hazop/${riskId}`,
							payload,
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						)
							.then((data) => {
								// set((state) => {
								// 	return {
								// 		riskAnalysItems: [
								// 			...state.riskAnalysItems,
								// 			...(data.data ? [data.data] : []),
								// 		],
								// 	}
								// })

								resolve(data)
							})
							.catch((err) => {
								reject(err)
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
							})
							.finally(() => {
								set((prev) => ({
									supportData: {
										...prev.supportData,
										isSubmitHazop: false,
									},
								}))
							})
					}
				)
			},
			setHazopStatus: async ({ nodeId, riskId, status }) => {
				return new Promise<ResponseApiType<any>>((resolve, reject) => {
					postData<RiskResponse>(
						`${RISK_RESPONSE_EP}/node/${nodeId}/hazop-status/${riskId}`,
						{
							hazop_completed: status,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
							},
						}
					)
						.then((data) => {
							toast({
								title: "Successfull",
								description: data.message,
								variant: "success",
							})
							if (data.data) {
								const riskResponseItems = [
									...get().riskResponseItems,
								]
								const hazopItemsSelected =
									riskResponseItems.findIndex(
										(item) =>
											item.id?.toString() ===
											data.data?.id?.toString() &&
											item.node_id?.toString() ===
											nodeId.toString()
									)
								if (hazopItemsSelected > -1) {
									riskResponseItems[
										hazopItemsSelected
									].hazop_completed =
										data.data.hazop_completed

									riskResponseItems[
										hazopItemsSelected
									].date_finished =
										data.data.date_finished ?? ""

									set({
										riskResponseItems: riskResponseItems,
									})
								}
								resolve(data)
							}
						})
						.catch((err) => {
							reject(err)
							toast({
								title: "ERROR",
								description: err.message,
								variant: "destructive",
							})
						})
						.finally(() => {
							set((prev) => ({
								supportData: {
									...prev.supportData,
									isSubmitHazop: false,
								},
							}))
						})
				})
			},
			deleteHazop: async (
				{
					nodeId,
					riskId,
					hazopId,
					id
				}: {
					nodeId: any;
					riskId: any;
					hazopId: any;
					id: any
				}
			) => {
				set(() => ({
					hazopDelete: {
						isFetching: true,
						id
					}
				}))

				return new Promise<ResponseApiType<any>>(
					(resolve, reject) => {
						deleteData<any>(
							`${RISK_RESPONSE_EP}/node/${nodeId}/${riskId}/delete-hazop/${hazopId}`,
						)
							.then((data) => {
								resolve(data)
							})
							.catch((err) => {
								reject(err)
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
							})
							.finally(() => {
								set(() => ({
									hazopDelete: {
										isFetching: false,
										id: null
									}
								}))
							})
					}
				)
			},
			updateSavertyExpectMultiple: async (
				nodeId: any,
				payload: RiskResponseSevertyExpectMultipleSchemaForm
			) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskResponse[]>>(
					(resolve, reject) => {
						postData<RiskResponse[]>(
							`${RISK_RESPONSE_EP}/node/${nodeId}/severity-multi`,
							payload
						)
							.then((data) => {
								// set((state) => {
								// 	return {
								// 		riskAnalysItems: [
								// 			...state.riskAnalysItems,
								// 			...(data.data ? [data.data] : []),
								// 		],
								// 	}
								// })
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
			updateSavertyExpect: async (
				nodeId: any,
				riskId: any,
				payload: RiskResponseSevertyExpectSchemaForm
			) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskResponse>>(
					(resolve, reject) => {
						postData<RiskResponse>(
							`${RISK_RESPONSE_EP}/node/${nodeId}/severity/${riskId}`,
							payload
						)
							.then((data) => {
								// set((state) => {
								// 	return {
								// 		riskAnalysItems: [
								// 			...state.riskAnalysItems,
								// 			...(data.data ? [data.data] : []),
								// 		],
								// 	}
								// })
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
				set({
					isFetchingDelete: true
				})
				return new Promise<ResponseApiType<null>>((resolve, reject) => {
					deleteData<null>(RISK_ANALYST_EP + "/" + id)
						.then((data) => {
							const filterData = get().riskResponseItems.filter(
								(x) => x.id?.toString() !== id.toString()
							)

							set({
								riskResponseItems: filterData,
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
								isFetchingDelete: false
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
			setQuerySearch: (value: string) =>
				set(() => ({
					querySearch: value,
				})),
			setNodeSelected: (nodeId) => {
				const nodeItems = get().supportData.node.nodeItems
				const nodeSelected = nodeItems.find(
					(node) => node.id === nodeId
				)
				if (nodeSelected) {
					set({
						nodeSelected,
					})
				}
			},
			setRiskSeveritySelected: (severity) => {
				set({
					riskSeveritySelected: severity,
				})
			},
			exportExcel(nodeId: any) {
				set({
					isFetchingExportData: true,
				})
				downloadProxyFile(`${EXPORT_RISK_SEVERITY_EP}`, {
					node_id: nodeId,
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
			exportHazopResponseReport: async (nodeId: any) => {
				set({
					isFetchingExportData: true,
				})
				downloadProxyFile(`${EXPORT_HAZOP_RESPONSE_EP}`, {
					node_id: nodeId,
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
			}
		},
	})
)

export default useRiskResponseStore
