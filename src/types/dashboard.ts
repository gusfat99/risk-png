import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import { Node } from "./node"

export type Dashboard = {
	total_risk_bank: 11
	total_risk: 5
	total_safeguard: 13
	amount_above_apetite: 3
	implemented_safeguard: 2
	heat_map: HeatMap[]
}

export type HeatMap = {
	risk_ranking: number
	total: number
}

export interface DashboardState extends CommonState {
	dashboardItem: Dashboard | null
	nodeSelected: Node | null
	supportData: {
		node: {
			nodeItems: Node[]
			isFetching: boolean
		}
	}
	actions: {
		fetchDashboard(): Promise<ResponseApiType<Dashboard>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		setNodeSelected: (nodeId: any) => void
	}
}
