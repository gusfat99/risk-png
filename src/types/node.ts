import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import {  PaginationState, Updater } from "@tanstack/react-table"

export interface Node {
	id: number
	node: string
	node_description: string
	node_location: string
	drawing_reference: string
	inlet_pressure: string // atau number jika ingin tipe numerik
	outlet_pressure: string // atau number jika ingin tipe numerik
	remark_node: string
}

export interface NodePayload {
	node: string
	node_description: string
	node_location: string
	drawing_reference: string
	inlet_pressure: string // atau number jika ingin tipe numerik
	outlet_pressure: string // atau number jika ingin tipe numerik
	remark_node: string
}

export interface NodeState extends CommonState {
	nodeItems: Node[]
	nodeSelected: Node | null,
	actions: {
		fetchAllData(): Promise<ResponseApiType<Node[]>>
		fetchSingleData?(): Promise<ResponseApiType<Node>>
		createData?(paylaod: NodePayload): Promise<ResponseApiType<Node>>
		updateData?(id: any, paylaod: any): Promise<ResponseApiType<Node>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		// setPagination?: OnChangeFn<PaginationState>,
		setPagination?: (updater: Updater<PaginationState>) => void;
	}
}
