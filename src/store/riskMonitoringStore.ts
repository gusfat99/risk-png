import {
	CAUSE_EP,
	DEVIATION_EP,
	NODE_EP,
	RISK_ANALYST_EP,
	RISK_MONITROING_EP,
} from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"

import { Node } from "@/types/node"
import { Cause, Deviations } from "@/types/riskDataBank"
import {
	RiskMonitoring,
	RiskMonitoringSchemaForm,
	RiskMonitoringState,
} from "@/types/riskMonitoring"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	riskMonitoringItems: [],
	riskMonitoringSelected: null,
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
	},
}

const useRiskMonitoringStore = createStore<RiskMonitoringState>(
	"risk-monitoring",
	(set, get) => ({
		...initialState,
		actions: {
			fetchAllData: async () => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<RiskMonitoring[]>>(
					(resolve, reject) => {
						getDataApi<RiskMonitoring[]>(`${RISK_MONITROING_EP}`, {
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
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
			fetchSingleData: async (id: any) => {
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
								const restCause = await getDataApi<Cause[]>(
									`/${data.data.deviation_id}${CAUSE_EP}`
								)
								if (Array.isArray(restCause.data)) {
									set((prevState) => ({
										supportData: {
											...prevState.supportData,
											cause: {
												causeItems:
													restCause.data || [],
												isFetching: false,
											},
										},
									}))
								} else {
									throw new Error(data.message)
								}
							}
							set({
								isFetching: false,
							})
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
						getDataApi<RiskMonitoring>(
							`${RISK_MONITROING_EP}/${id}`
						).then((data) => {
							//parse data to flat

							if (data.data && Array.isArray(data.data)) {
								getDataApi<Cause[]>(
									`/${data.data.deviation_id}${CAUSE_EP}`
								)
									.then((restCause) => {
										//parse data to flat
										if (Array.isArray(restCause.data)) {
											set((prevState) => ({
												supportData: {
													...prevState.supportData,
													cause: {
														causeItems:
															restCause.data ||
															[],
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
													...prevState.supportData
														.cause,
													isFetching: false,
												},
											},
										}))
									})

								set({
									riskMonitoringSelected: data.data,
								})
								resolve(data)
							}
						})
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
							formData.append(key, value)
						})
						postData<RiskMonitoring>(RISK_MONITROING_EP, payload, {
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
				return new Promise<ResponseApiType<RiskMonitoring>>(
					(resolve, reject) => {
						postData<RiskMonitoring>(
							`${RISK_MONITROING_EP}/${id}`,
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
			deleteData: async (id) => {
				return new Promise<ResponseApiType<null>>((resolve, reject) => {
					deleteData<null>(RISK_ANALYST_EP + "/" + id)
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

			//this function for handle select data risk bank, leveling data
			handleChangeRiskMonitoringData: (name, id) => {
				//Get Cause Data
				if (name === "deviation_id") {
					set((prevState) => ({
						supportData: {
							...prevState.supportData,
							cause: {
								...prevState.supportData.cause,
								isFetching: true,
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
			},
		},
	})
)

export default useRiskMonitoringStore
