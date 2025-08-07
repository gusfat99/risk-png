import {
	DETAIL_REPORT_RISK_MONITROING_EP,
	EXPORT_MONITORING_EP,
	NODE_EP,
	REPORT_RISK_MONITROING_EP,
} from "@/constants/endpoints"
import {
	getDataApi,
	getDataBlob,
	ResponseApiType
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"

import { Node } from "@/types/node"
import {
	DetailReportRiskMonitoring,
	ReportRiskMonitoring,
	ReportRiskMonitoringState,
} from "@/types/riskMonitoring"
import useAuthStore from "./authStore"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	isFetchingReport: false,
	reportRiskMonitoring: [],
	reportRiskMonitoringDetail: [],
	nodeSelected: null,
	supportData: {
		node: {
			isFetching: false,
			nodeItems: [],
		},
	},
}

const useReportRiskMonitoringStore = createStore<ReportRiskMonitoringState>(
	"report-risk-monitoring",
	(set, get) => ({
		...initialState,
		actions: {
			fetchReportRiskMonitoring: async () => {
				const year_selected = useAuthStore.getState().year_selected
				set({
					isFetchingReport: true,
				})
				return new Promise<ResponseApiType<ReportRiskMonitoring[]>>(
					(resolve, reject) => {
						getDataApi<ReportRiskMonitoring[]>(
							`${REPORT_RISK_MONITROING_EP}`,
							{
								page: get().pagination_tanstack.pageIndex,
								per_page: get().pagination_tanstack.pageSize,
								year: year_selected,
								node_id: get().nodeSelected?.id || undefined
							}
						)
							.then((data) => {
								if (data.data && Array.isArray(data.data)) {
									set({
										reportRiskMonitoring: data.data || [],
										meta: data?.meta,
									})
								} else {
									set({
										reportRiskMonitoring: [],
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
									isFetchingReport: false,
								})
							})
					}
				)
			},
			fetchDetailReportRiskMonitoring: async ({
				nodeId,
				deviationId,
				riskBankId,
				parameterId,
				consequenceId
			}) => {
				const year_selected = useAuthStore.getState().year_selected
				set({
					isFetchingReport: true,
				})
				return new Promise<
					ResponseApiType<DetailReportRiskMonitoring[]>
				>((resolve, reject) => {
					getDataApi<DetailReportRiskMonitoring[]>(
						`${DETAIL_REPORT_RISK_MONITROING_EP}`,
						{
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
							year: year_selected,
							node_id: nodeId,
							deviation_id: deviationId,
							risk_bank_id: riskBankId,
							parameter_id: parameterId,
							consequence_id: consequenceId,
						}
					)
						.then((data) => {
							if (data.data && Array.isArray(data.data)) {
								set({
									reportRiskMonitoringDetail: data.data || [],
									meta: data?.meta,
								})
							} else {
								set({
									reportRiskMonitoringDetail: [],
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
								isFetchingReport: false,
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
			downloadFileReportDetail: async ({
				nodeId,
				deviationId,
				riskBankId,
				parameterId,
				consequenceId,
			}) => {
				const year_selected = useAuthStore.getState().year_selected
				set({
					isFetchingExportData: true,
				})
				getDataBlob(`${EXPORT_MONITORING_EP}`, {
					year: year_selected,
					node_id: nodeId,
					deviation_id: deviationId,
					risk_bank_id: riskBankId,
					parameter_id: parameterId,
					consequence_id: consequenceId,
				}).then(blob => {
					if (blob.data) {
						const blobUrl = window.URL.createObjectURL(blob.data)
						const link = document.createElement("a")
						link.href = blobUrl
						link.setAttribute("download", "Risk Monitoring Report.xlsx");
						document.body.appendChild(link)
						link.click()
						link.parentNode?.removeChild(link)
						window.URL.revokeObjectURL(blobUrl)
					}
				}).catch((err) => {
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
				// downloadProxyFile(`${EXPORT_MONITORING_EP}`, {
				// 	year: year_selected,
				// 	node_id: nodeId,
				// 	deviation_id: deviationId,
				// 	risk_bank_id: riskBankId,
				// 	parameter_id: parameterId,
				// 	consequence_id: consequenceId,
				// }).then((blob) => {
				// 	toast({
				// 		title: "Success",
				// 		description: "Successfull download file excel",
				// 		variant: "success",
				// 	})
				// })
				// 	.catch((err) => {
				// 		toast({
				// 			title: "Filed",
				// 			description: err.message,
				// 			variant: "destructive",
				// 		})
				// 	})
				// 	.finally(() => {
				// 		set({
				// 			isFetchingExportData: false,
				// 		})
				// 	})
			},
			setPagination: (updater) =>
				set((state) => ({
					pagination_tanstack: runUpdater(
						updater,
						state.pagination_tanstack
					),
				})),
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
		},
	})
)

export default useReportRiskMonitoringStore
