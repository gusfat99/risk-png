import { ResponseApiType } from "@/helpers/ApiHelper"
import { PaginationState, Updater } from "@tanstack/react-table"
import { CommonState } from "./common"
import { Node } from "./node"

export interface Safeguard {
	id: number
	consequence_id: number | null
	safeguard: string
	safeguard_title: string
	is_master: 1 | 0 | undefined
	file_path: any
}

export interface SafeguardReport {
	risk_analyst_id: 13;
	safeguard: string;
	safeguard_title: string;
	file_path: string;
	node: string;
}

export interface SafeguardPayload {
	safeguard: string
	safeguard_title: string
	file_path: any
}

export interface SafeguardState extends CommonState {
	safeguardItems: Safeguard[]
	safeguardReportItems: SafeguardReport[]
	safeguardSelected: Safeguard | null
	nodeSelected: Node | null
	actions: {
		fetchAllData(): Promise<ResponseApiType<Safeguard[]>>
		fetchReportSafeguardRegistered(): Promise<ResponseApiType<SafeguardReport[]>>
		fetchSingleData?(safeguardId: any): Promise<ResponseApiType<Safeguard>>
		fetchNodeData?(): Promise<ResponseApiType<Node[]>>
		createData?(
			paylaod: SafeguardPayload
		): Promise<ResponseApiType<Safeguard>>
		updateData?(id: any, paylaod: any): Promise<ResponseApiType<Safeguard>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		// setPagination?: OnChangeFn<PaginationState>,
		setPagination?: (updater: Updater<PaginationState>) => void
		setQuerySearch?: (value: string) => void
		setNodeSelected?: (value: any) => void
		exportExcel?(): void
	}
	supportData: {
		node: {
			nodeItems: Node[]
			isFetching: boolean
		}
	}
}
