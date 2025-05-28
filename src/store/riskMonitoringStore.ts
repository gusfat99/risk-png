import {
	CAUSE_EP,
	CONSEQUENCE_EP,
	DEVIATION_EP,
	NODE_EP,
	PARAMETER_EP,
	RISK_MONITROING_EP,
	SAFEGUARD_EXIST_EP
} from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"

import fetchRiskBankHierarchy from "@/services/fetchRiskBankHierarchy"
import { Node } from "@/types/node"
import { Cause, Consequences, Deviations, Parameter } from "@/types/riskDataBank"
import {
	RiskMonitoring,
	RiskMonitoringSchemaForm,
	RiskMonitoringSevertyMultipleForm,
	RiskMonitoringState
} from "@/types/riskMonitoring"
import { Safeguard } from "@/types/safeguard"
import useAuthStore from "./authStore"
import { createStore, runUpdater } from "./store"
import fetchFileViaProxy from "@/services/fetchFileAsFile"
import { EVIDENCE_PATHNAME_STORAGE } from "@/constants"

const initialState = {
	...commonInitualState,
	riskMonitoringItems: [],
	riskMonitoringSelected: null,
	isFetchingReport: false,
	reportRiskMonitoring: [],
	reportRiskMonitoringDetail: [],
	nodeSelected: null,
	supportData: {
		node: {
			isFetching: false,
			nodeItems: [],
		},
		parameter: {
			parameterItems: [],
			isFetching: false,
		},
		deviation: {
			deviationItems: [],
			isFetching: false,
		},
		cause: {
			causeItems: [],
			isFetching: false,
		},
		consequence: {
			consequenceItems: [],
			isFetching: false
		},
		safeguard: {
			safeguardItems: [],
			isFetching: false
		},
	},
}

const useRiskMonitoringStore = createStore<RiskMonitoringState>(
	"risk-monitoring",
	(set, get) => ({
		...initialState,
		actions: {
			fetchAllData: async () => {
				const year_selected = useAuthStore.getState().year_selected
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<RiskMonitoring[]>>(
					(resolve, reject) => {
						getDataApi<RiskMonitoring[]>(`${RISK_MONITROING_EP}`, {
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
							year: year_selected,
							node_id: get().nodeSelected?.id || undefined,
						})
							.then((data) => {
								if (data.data && Array.isArray(data.data)) {
									set({
										riskMonitoringItems: data.data || [],
										meta: data?.meta,
									})
								} else {
									set({
										riskMonitoringItems: [],
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
					}
				)
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
			fetchParameterData: async () => {
				set((prev) => ({
					supportData: {
						...prev.supportData,
						parameter: {
							...prev.supportData.parameter,
							isFetching: true,
						},
					},
				}))
				return new Promise<ResponseApiType<Parameter[]>>(
					(resolve, reject) => {
						getDataApi<Parameter[]>(PARAMETER_EP)
							.then((data) => {
								//parse data to flat
								if (Array.isArray(data.data)) {
									set((prev) => ({
										supportData: {
											...prev.supportData,
											parameter: {
												isFetching: false,
												parameterItems: data.data || [],
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
										parameter: {
											...prev.supportData.parameter,
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
					supportData: {
						...get().supportData,
						parameter: {
							...get().supportData.parameter,
							isFetching: true,
						},
						cause: {
							...get().supportData.cause,
							isFetching: true,
						},
						consequence: {
							...get().supportData.consequence,
							isFetching: true,
						},
						safeguard: {
							...get().supportData.safeguard,
							isFetching: true,
						},
					}
				})
				return new Promise<ResponseApiType<RiskMonitoring>>(
					async (resolve, reject) => {
						try {
							const data = await getDataApi<RiskMonitoring>(
								`${RISK_MONITROING_EP}/${id}`
							)
							if (data.data?.evidence) {

								fetchFileViaProxy(`${EVIDENCE_PATHNAME_STORAGE}/${data.data?.evidence || ""}`).then(resultFile => {
									if (data.data)
										data.data.evidence = resultFile;

								}).catch(err => {
									if (data.data) {
										data.data.evidence = "";
									}
									console.log({ err })
								})
							}
							const {
								causes,
								parameters,
								consequences,
								safeguards
							} = await fetchRiskBankHierarchy({
								deviation_id: data.data?.deviation_id,
								parameter_id: data.data?.parameter_id,
								risk_bank_id: data.data?.risk_bank_id,
								consequence_id: data.data?.consequence_id
							}, [
								'parameters', 'causes', 'consequences', 'safeguards'
							])
							//parse data to flat
							if (data.data) {
								set((prevState) => ({
									isFetching: false,
									riskMonitoringSelected: data.data,
									supportData: {
										...prevState.supportData,
										cause: {
											causeItems: causes || [],
											isFetching: false,
										},
										parameter: {
											parameterItems: parameters || [],
											isFetching: false,
										},
										consequence: {
											consequenceItems: consequences || [],
											isFetching: false
										},
										safeguard: {
											safeguardItems: safeguards || [],
											isFetching: false
										}
									},
								}))
							}
							resolve(data)
						} catch (error: any) {
							toast({
								title: "ERROR",
								description: error.message,
								variant: "destructive",
							})
							reject(error)
							set((prevState) => ({
								isFetching: false,
								supportData: {
									...prevState.supportData,
									parameter: {
										...prevState.supportData.parameter,
										isFetching: false,
									},
									cause: {
										...prevState.supportData.cause,
										isFetching: false,
									},
								},
							}))
						}


					}
				)
			},
			fetchDetailData: async (id: any) => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<RiskMonitoring>>(
					async (resolve, reject) => {
						try {
							const data = await getDataApi<RiskMonitoring>(
								`${RISK_MONITROING_EP}/${id}`
							)
							//parse data to flat
							if (data.data) {
								set((prevState) => ({
									isFetching: false,
									riskMonitoringSelected: data.data,
									supportData: {
										...prevState.supportData,
										cause: {
											...prevState.supportData.cause,
											isFetching: true,
										},
									},
								}))
							}
							resolve(data);
						} catch (error: any) {
							toast({
								title: "ERROR",
								description: error.message,
								variant: "destructive",
							})
							reject(error)
							set((prevState) => ({
								isFetching: false,
								supportData: {
									...prevState.supportData,
									cause: {
										...prevState.supportData.cause,
										isFetching: false,
									},
								},
							}))
						}

					}
				)
			},
			createData: async (payload: RiskMonitoringSchemaForm) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskMonitoring>>(
					(resolve, reject) => {
						const formData = new FormData()
						Object.entries(payload).forEach(([key, value]) => {
							if (Array.isArray(value)) {
								value.forEach((val, index) => {
									formData.append(`${key}[${index}]`, val.value);
								})
							} else {
								formData.append(key, value)
							}
						})
						postData<RiskMonitoring>(RISK_MONITROING_EP, formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						})
							.then((data) => {
								set((state) => {
									return {
										riskMonitoringItems: [
											...state.riskMonitoringItems,
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
			updateData: async (id: any, payload: RiskMonitoringSchemaForm) => {
				set({
					isSubmit: true,
				})
				const formData = new FormData()
				Object.entries(payload).forEach(([key, value]) => {
					if (Array.isArray(value)) {

						value.forEach((val, index) => {
							formData.append(`${key}[${index}]`, val.value);
						})
					} else {
						formData.append(key, value)
					}
				})
				return new Promise<ResponseApiType<RiskMonitoring>>(
					(resolve, reject) => {
						postData<RiskMonitoring>(
							`${RISK_MONITROING_EP}/${id}`,
							formData,
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						)
							.then((data) => {
								set((state) => {
									return {
										riskMonitoringItems: [
											...state.riskMonitoringItems,
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
			updateSavertyMultiple: async (
				nodeId: any,
				payload: RiskMonitoringSevertyMultipleForm
			) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<RiskMonitoring[]>>(
					(resolve, reject) => {
						postData<RiskMonitoring[]>(
							`${RISK_MONITROING_EP}/severity-multi`,
							payload
						)
							.then((data) => {
								// if (Array.isArray(data.data)) {
								// 	set((prevState) => ({
								// 		riskMonitoringItems: [
								// 			...(prevState.riskMonitoringItems ||
								// 				[]),
								// 			...(data.data ? data.data : []),
								// 		],
								// 	}))
								// }
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
					set({
						isFetchingDelete: true
					})
					deleteData<null>(RISK_MONITROING_EP + "/" + id)
						.then((data) => {
							const filterData = get().riskMonitoringItems.filter(
								(x) => x.id?.toString() !== id.toString()
							)

							set({
								riskMonitoringItems: filterData,
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

			//this function for handle select data risk bank, leveling data
			handleChangeRiskMonitoringData: (name, id) => {
				//Get Cause Data
				if (name === "parameter_id") {
					set((prevState) => ({
						supportData: {
							...prevState.supportData,
							deviation: {
								...prevState.supportData.deviation,
								deviationItems: [],
								isFetching: true,
							},
							cause: {
								...prevState.supportData.cause,
								causeItems: [],
							},
							consequence: {
								...prevState.supportData.consequence,
								consequenceItems: [],
							},
							safeguard: {
								...prevState.supportData.safeguard,
								safeguardItems: [],
							}
						},
					}))

					getDataApi<Deviations[]>(`/${id}${DEVIATION_EP}`)
						.then((data) => {
							//parse data to flat
							if (Array.isArray(data.data)) {
								set((prevState) => ({
									supportData: {
										...prevState.supportData,
										deviation: {
											deviationItems: data.data || [],
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
									deviation: {
										...prevState.supportData.deviation,
										isFetching: false,
									},
								},
							}))
						})
				}
				if (name === "deviation_id") {
					set((prevState) => ({
						supportData: {
							...prevState.supportData,
							cause: {
								...prevState.supportData.cause,
								isFetching: true,
							},
							consequence: {
								...prevState.supportData.consequence,
								consequenceItems: [],
							},
							safeguard: {
								...prevState.supportData.safeguard,
								safeguardItems: [],
							}
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
				if (name === "risk_bank_id") {
					set((prevState) => ({
						supportData: {
							...prevState.supportData,
							consequence: {
								...prevState.supportData.consequence,
								isFetching: true,
							},
							safeguard: {
								...prevState.supportData.safeguard,
								safeguardItems: [],
							}
						},
					}))

					getDataApi<Consequences[]>(`/${id}${CONSEQUENCE_EP}`)
						.then((data) => {
							//parse data to flat
							if (Array.isArray(data.data)) {
								set((prevState) => ({
									supportData: {
										...prevState.supportData,
										consequence: {
											consequenceItems: data.data || [],
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
									consequence: {
										...prevState.supportData.consequence,
										isFetching: false,
									},
								},
							}))
						})
				}
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
				//Get Consequence Data
			},
			setNodeSelected: (nodeId: any) => {
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
			setStatus: async (monitoringId: any, status: any) => {
				return new Promise<ResponseApiType<any>>((resolve, reject) => {
					postData<any>(
						`${RISK_MONITROING_EP}/${monitoringId}/change-status`,
						{
							status: status,
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
								const riskMonitoringItems = [
									...get().riskMonitoringItems,
								]
								const monitSelected =
									riskMonitoringItems.findIndex(
										(item) =>
											item.id.toString() === monitoringId.toString()
									)
								if (monitSelected > -1) {
									riskMonitoringItems[
										monitSelected
									].status =
										data.data.status



									set({
										riskMonitoringItems,
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
		},
	})
)

export default useRiskMonitoringStore
