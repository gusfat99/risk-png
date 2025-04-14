import {
	CAUSE_EP,
	CONSEQUENCE_EP,
	DEVIATION_EP,
	NODE_EP,
	RISK_ANALYST_EP,
	SAFEGUARD_EXIST_EP,
} from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"
import {
	RiskAnalysis,
	RiskAnalysisForm,
	RiskAnalysisSevertyMultipleForm,
	RiskAnalystState,
} from "@/types/riksAnalyst"

import { Node } from "@/types/node"
import { Cause, Consequences, Deviations } from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"
import { createStore, runUpdater } from "./store"
import fetchRiskBankHierarchy from "@/services/fetchRiskBankHierarchy"

const initialState = {
	...commonInitualState,
	riskAnalysItems: [],
	riskAnalysSelected: null,
	nodeSelected: null,
	supportData: {
		node: {
			isFetching: false,
			nodeItems: [],
		},
		deviation: {
			deviationItems: [],
			isFetching: false,
		},
		cause: {
			causeItems: [],
			isFetching: false,
		},
		consiquence: {
			consiquenceItems: [],
			isFetching: false,
		},
		safeguard: {
			safeguardItems: [],
			isFetching: false,
		},
	},
}

const useRiskAnalystStore = createStore<RiskAnalystState>(
	"risk-analyst",
	(set, get) => ({
		...initialState,
		actions: {
			fetchAllData: async (nodeId: any) => {
				set({
					isFetching: true,
				})
				return new Promise<
					ResponseApiType<{ risk_analyst: RiskAnalysis[] }>
				>((resolve, reject) => {
					getDataApi<{ risk_analyst: RiskAnalysis[] }>(
						`${RISK_ANALYST_EP}/${nodeId}`,
						{
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
						}
					)
						.then((data) => {
							if (data.data) {
								set({
									riskAnalysItems:
										data.data.risk_analyst || [],
									meta: data?.meta,
								})
							} else {
								set({
									riskAnalysItems: [],
									meta: data?.meta,
								})
							}
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
			fetchDeviationData: async () => {
				set((prev) => ({
					supportData: {
						...prev.supportData,
						deviation: {
							...prev.supportData.deviation,
							isFetching: true,
						},
					},
				}))
				return new Promise<ResponseApiType<Deviations[]>>(
					(resolve, reject) => {
						getDataApi<Deviations[]>(DEVIATION_EP)
							.then((data) => {
								//parse data to flat
								if (Array.isArray(data.data)) {
									set((prev) => ({
										supportData: {
											...prev.supportData,
											deviation: {
												isFetching: false,
												deviationItems: data.data || [],
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
										deviation: {
											...prev.supportData.deviation,
											isFetching: false,
										},
									},
								}))
							})
					}
				)
			},
			fetchSingleData: async (nodeId: any, id: any) => {
				set({
					isFetching: true,
					supportData: {
						...get().supportData,
						deviation: {
							...get().supportData.deviation,
							isFetching: true,
						},
						cause: {
							...get().supportData.cause,
							isFetching: true,
						},
						consiquence: {
							...get().supportData.consiquence,
							isFetching: true,
						},
						safeguard: {
							...get().supportData.safeguard,
							isFetching: true,
						},
					},
				})
				return new Promise<ResponseApiType<RiskAnalysis>>(
					async (resolve, reject) => {
						try {
							const data = await getDataApi<RiskAnalysis>(
								`${RISK_ANALYST_EP}/${nodeId}/${id}`
							)
							if (data.data) {
								const {
									deviations,
									causes,
									consequences,
									safeguards,
								} = await fetchRiskBankHierarchy(data.data)
								set({
									riskAnalysSelected: data.data,
									supportData: {
										...get().supportData,
										deviation: {
											...get().supportData.deviation,
											isFetching: false,
											deviationItems: deviations || [],
										},
										cause: {
											...get().supportData.cause,
											isFetching: false,
											causeItems: causes || [],
										},
										consiquence: {
											...get().supportData.consiquence,
											isFetching: false,
											consiquenceItems:
												consequences || [],
										},
										safeguard: {
											...get().supportData.safeguard,
											isFetching: false,
											safeguardItems: safeguards || [],
										},
									},
								})
								resolve(data)
							}
						} catch (err: any) {
							toast({
								title: "ERROR",
								description: err.message,
								variant: "destructive",
							})
							reject(err)
						} finally {
							set({
								isFetching: false,
								supportData: {
									...get().supportData,
									deviation: {
										...get().supportData.deviation,
										isFetching: false,
									},
									cause: {
										...get().supportData.cause,
										isFetching: false,
									},
									consiquence: {
										...get().supportData.consiquence,
										isFetching: false,
									},
									safeguard: {
										...get().supportData.safeguard,
										isFetching: false,
									},
								},
							})
						}
					}
				)
			},
			createData: async (payload: RiskAnalysisForm, nodeId: any) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<{risk_analyst : RiskAnalysis}>>(
					(resolve, reject) => {
						const formData = new FormData()
						Object.entries(payload).forEach(([key, value]) => {
							formData.append(key, value)
						})
						postData<{risk_analyst : RiskAnalysis}>(
							RISK_ANALYST_EP + "/" + nodeId,
							payload,
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						)
							.then((data) => {
								set((state) => {
									return {
										riskAnalysItems: [
											...state.riskAnalysItems,
											...(data.data ? [data.data.risk_analyst] : []),
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
			updateData: async (id: any, nodeId : any, payload: any) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<{risk_analyst : RiskAnalysis}>>(
					(resolve, reject) => {
						postData<{risk_analyst : RiskAnalysis}>(
							`${RISK_ANALYST_EP}/${nodeId}/update/${id}`,
							payload,
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						)
							.then((data) => {
								set((state) => {
									return {
										riskAnalysItems: [
											...state.riskAnalysItems,
											...(data.data ? [data.data.risk_analyst] : []),
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
			updateSavertyMultiple: async (
				nodeId: any,
				payload: RiskAnalysisSevertyMultipleForm
			) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskAnalysis[]>>(
					(resolve, reject) => {
						postData<RiskAnalysis[]>(
							`${RISK_ANALYST_EP}/${nodeId}/severity-multi`,
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
				return new Promise<ResponseApiType<null>>((resolve, reject) => {
					deleteData<null>(RISK_ANALYST_EP + "/" + id)
						.then((data) => {
							const filterData = get().riskAnalysItems.filter(
								(x) => x.id?.toString() !== id.toString()
							)

							set({
								riskAnalysItems: filterData,
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
			//this function for handle select data risk bank, leveling data
			handleChangeRiskBankData: (name, id) => {
				//Get Cause Data
				if (name === "deviation_id") {
					set((prevState) => ({
						supportData: {
							...prevState.supportData,
							cause: {
								...prevState.supportData.cause,
								isFetching: true,
							},
							consiquence: {
								...prevState.supportData.consiquence,
								consiquenceItems: [],
							},
							safeguard: {
								...prevState.supportData.safeguard,
								safeguardItems: [],
							},
						},
					}))

					getDataApi<Cause[]>(`/${id}${CAUSE_EP}`)
						.then((data) => {
							//parse data to flat
							if (Array.isArray(data.data)) {
								set((prevState) => ({
									supportData: {
										...prevState.supportData,
										cause: {
											causeItems: data.data || [],
											isFetching: false,
										},
									},
								}))
							}
						})
						.catch((err) => {
							toast({
								title: "ERROR",
								description: err.message,
								variant: "destructive",
							})
						})
						.finally(() => {
							set((prevState) => ({
								supportData: {
									...prevState.supportData,
									cause: {
										...prevState.supportData.cause,
										isFetching: false,
									},
								},
							}))
						})
				}
				//Get Consequence Data
				if (name === "risk_bank_id") {
					set((prevState) => ({
						supportData: {
							...prevState.supportData,
							consiquence: {
								...prevState.supportData.consiquence,
								isFetching: true,
							},
							safeguard: {
								...prevState.supportData.safeguard,
								safeguardItems: [],
							},
						},
					}))

					getDataApi<Consequences[]>(`/${id}${CONSEQUENCE_EP}`)
						.then((data) => {
							//parse data to flat
							if (Array.isArray(data.data)) {
								set((prevState) => ({
									supportData: {
										...prevState.supportData,
										consiquence: {
											consiquenceItems: data.data || [],
											isFetching: false,
										},
									},
								}))
							}
						})
						.catch((err) => {
							toast({
								title: "ERROR",
								description: err.message,
								variant: "destructive",
							})
						})
						.finally(() => {
							set((prevState) => ({
								supportData: {
									...prevState.supportData,
									consiquence: {
										...prevState.supportData.consiquence,
										isFetching: false,
									},
								},
							}))
						})
				}
				//Get Safeguard Data
				if (name === "consequence_id") {
					set((prevState) => ({
						supportData: {
							...prevState.supportData,
							safeguard: {
								...prevState.supportData.safeguard,
								isFetching: true,
							},
						},
					}))

					getDataApi<Safeguard[]>(`/${id}${SAFEGUARD_EXIST_EP}`)
						.then((data) => {
							//parse data to flat
							if (Array.isArray(data.data)) {
								set((prevState) => ({
									supportData: {
										...prevState.supportData,
										safeguard: {
											safeguardItems: data.data || [],
											isFetching: false,
										},
									},
								}))
							}
						})
						.catch((err) => {
							toast({
								title: "ERROR",
								description: err.message,
								variant: "destructive",
							})
						})
						.finally(() => {
							set((prevState) => ({
								supportData: {
									...prevState.supportData,
									safeguard: {
										...prevState.supportData.safeguard,
										isFetching: false,
									},
								},
							}))
						})
				}
			},
		},
	})
)

export default useRiskAnalystStore
