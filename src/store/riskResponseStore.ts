import { API_URL } from "@/constants"
import {
	NODE_EP,
	RISK_ANALYST_EP,
	RISK_RESPONSE_EP,
} from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import fetchFileViaProxy from "@/services/fetchFileAsFile"
import { commonInitualState } from "@/types/common"
import { Node } from "@/types/node"
import {
	Hazop,
	HazopStatus,
	RiskResponse,
	RiskResponseSevertyExpectMultipleSchemaForm,
	RiskResponseState,
} from "@/types/riskResponse"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	riskResponseItems: [],
	riskResponseSelected: null,
	nodeSelected: null,
	hazopItemsSelected: null,
	isFetchingHazopItems: false,
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
			fetchAllData: async (nodeId: any) => {
				set({
					isFetching: true,
				})
				return new Promise<
					ResponseApiType<{
						risk_response: RiskResponse[]
					}>
				>((resolve, reject) => {
					getDataApi<{
						risk_response: RiskResponse[]
					}>(`${RISK_RESPONSE_EP}/${nodeId}`, {
						page: get().pagination_tanstack.pageIndex,
						per_page: get().pagination_tanstack.pageSize,
					})
						.then((data) => {
							if (data.data) {
								set({
									riskResponseItems:
										data.data.risk_response || [],
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

			fetchSingleData: async (id: any) => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<RiskResponse>>(
					(resolve, reject) => {
						getDataApi<RiskResponse>(`${RISK_ANALYST_EP}/${id}`)
							.then((data) => {
								//parse data to flat

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
							`${RISK_RESPONSE_EP}/${nodeId}/${riskAnalystId}`
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
													`${API_URL}/storage/hazops/${hazopItems[i].document_report}`,

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
							`${RISK_RESPONSE_EP}/${nodeId}/create-hazop/${riskId}`,
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
							`${RISK_RESPONSE_EP}/${nodeId}/update-hazop/${riskId}`,
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
					postData<HazopStatus>(
						`${RISK_RESPONSE_EP}/${nodeId}/hazop-status/${riskId}`,
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
											item.risk_analyst_id?.toString() === data.data?.risk_analyst_id?.toString() &&
											item.risk_analyst.node_id?.toString() === nodeId.toString()
									)
								if (hazopItemsSelected > -1) {
									riskResponseItems[
										hazopItemsSelected
									].hazop_status.hazop_completed =
										data.data.hazop_completed

									riskResponseItems[
										hazopItemsSelected
									].hazop_status.date_finished =
										data.data.date_finished

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
							`${RISK_RESPONSE_EP}/${nodeId}/severity-multi`,
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
			// createData: async (payload: RiskResponseForm, nodeId : any) => {
			//    set({
			//       isSubmit: true,
			//    })
			//    return new Promise<ResponseApiType<RiskResponse>>(
			//       (resolve, reject) => {
			//          const formData = new FormData();
			//          Object.entries(payload).forEach(([key,value]) => {
			//             formData.append(key, value);
			//          })
			//          postData<RiskResponse>(RISK_ANALYST_EP+"/"+nodeId, payload, {
			//             headers: {
			//                "Content-Type": "multipart/form-data",
			//             },
			//          })
			//             .then((data) => {
			//                set((state) => {
			//                   return {
			//                      riskResponseItems: [
			//                         ...state.riskResponseItems,
			//                         ...(data.data ? [data.data] : []),
			//                      ],
			//                   }
			//                })
			//                resolve(data)
			//             })
			//             .catch((err) => {
			//                reject(err)
			//             })
			//             .finally(() => {
			//                set({
			//                   isSubmit: false,
			//                })
			//             })
			//       }
			//    )
			// },
			// updateData: async (id: any, payload: File) => {
			//    set({
			//       isSubmit: true,
			//    })
			//    return new Promise<ResponseApiType<RiskResponse>>(
			//       (resolve, reject) => {
			//          postData<RiskResponse>(
			//             `${RISK_ANALYST_EP}/${id}`,
			//             payload,
			//             {
			//                headers: {
			//                   "Content-Type": "multipart/form-data",
			//                },
			//             }
			//          )
			//             .then((data) => {
			//                set((state) => {
			//                   return {
			//                      riskResponseItems: [
			//                         ...state.riskResponseItems,
			//                         ...(data.data ? [data.data] : []),
			//                      ],
			//                   }
			//                })
			//                resolve(data)
			//             })
			//             .catch((err) => {
			//                reject(err)
			//             })
			//             .finally(() => {
			//                set({
			//                   isSubmit: false,
			//                })
			//             })
			//       }
			//    )
			// },
			deleteData: async (id) => {
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
		},
	})
)

export default useRiskResponseStore
