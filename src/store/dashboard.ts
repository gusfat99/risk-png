import { DASHBOARD_EP, NODE_EP } from "@/constants/endpoints"
import {
   getDataApi,
   ResponseApiType
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"
import { Dashboard, DashboardState } from "@/types/dashboard"
import { Node } from "@/types/node"
import useAuthStore from "./authStore"
import { createStore } from "./store"

const initialState = {
	...commonInitualState,
	dashboardItem: null,
	nodeSelected: null,
	supportData: {
		node: {
			nodeItems: [],
			isFetching: false,
		},
	},
}

const useDashboardStore = createStore<DashboardState>(
	"dashboard",
	(set, get) => ({
		...initialState,
		actions: {
			fetchDashboard: async () => {
				const year_selected = useAuthStore.getState().year_selected
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<Dashboard>>(
					(resolve, reject) => {
						getDataApi<Dashboard>(DASHBOARD_EP, {
							year: year_selected,
							node_id: get().nodeSelected?.id || undefined,
						})
							.then((data) => {
								set({
									dashboardItem: data.data || null,
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
			setNodeSelected: (nodeId) => {
				const nodeItems = get().supportData.node.nodeItems
				const nodeSelected = nodeItems.find(
					(node) => node.id?.toString() === nodeId?.toString()
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

export default useDashboardStore
