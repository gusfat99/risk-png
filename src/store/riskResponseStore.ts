import {
	NODE_EP,
	RISK_ANALYST_EP,
	RISK_RESPONSE_EP,
} from "@/constants/endpoints"
import { deleteData, getDataApi, postData, ResponseApiType } from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"
import { Node } from "@/types/node"
import {
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
	supportData: {
		node: {
			isFetching: false,
			nodeItems: [],
		},
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
