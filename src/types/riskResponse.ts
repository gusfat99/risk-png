import { ResponseApiType } from "@/helpers/ApiHelper"
import { RiskResponseHazopMultipleSchema, RiskResponseHazopSchema, RiskResponseSevertyExpectMultipleSchema, RiskResponseSevertyExpectSchema } from "@/schemas/RiskResponseSchema"
import { PaginationState, Updater } from "@tanstack/react-table"
import { z } from "zod"
import { CommonState } from "./common"
import { Node } from "./node"
import { Cause, Consequences, Deviations } from "./riskDataBank"

export type RiskResponse = {
	id: number
	risk_analyst_id: number
	sp_expected: number
	se_expected: number
	sf_expected: number
	srl_expected: number
	sa_expected: number
	spn_expected: number
	l_frequency_expected: number
	risk_ranking_expected: number
}

export type HazopStatus = {
	risk_analyst_id: number
	hazop_completed: string
	date_finished: string | null
}

export type HazopStatusValue = "pending" | "in_progress" | "done"

export type RiskResponseParent = {
	id: number
	node_id: number
	deviation_id: number
	risk_bank_id: number
	consequence_id: number
	existing_safeguard: string
	sp_current: number
	se_current: number
	sf_current: number
	srl_current: number
	sa_current: number
	spn_current: number
	l_frequency_current: number
	risk_ranking_current: number
	remark_analyst: string
	deviations: Deviations
	causes: Cause
	consequences: Consequences
	risk_response: RiskResponse
	hazop_status: HazopStatus
}

export interface RiskResponseState extends CommonState {
	riskResponseItems: RiskResponseParent[]
	riskResponseSelected: RiskResponseParent | null
	nodeSelected: Node | null
	supportData: {
		node: {
			nodeItems: Node[]
			isFetching: boolean
		}
	}
	actions: {
		fetchAllData(
			nodeId: any
		): Promise<ResponseApiType<{ risk_analyst: RiskResponseParent[] }>>
		fetchSingleData?(id: any): Promise<ResponseApiType<RiskResponseParent>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		updateSavertyExpectMultiple?(
			nodeId : any,
			payload: RiskResponseSevertyExpectMultipleSchemaForm
		): Promise<ResponseApiType<RiskResponseParent[]>>
		createData?(
			payload: any,
			nodeId: any
		): Promise<ResponseApiType<RiskResponseParent>>
		updateData?(
			id: any,
			paylaod: any
		): Promise<ResponseApiType<RiskResponseParent>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
		setNodeSelected: (nodeId: number) => void
	}
}


export type RiskResponseHazopSchemaForm = z.infer<typeof RiskResponseHazopSchema>
export type RiskResponseHazopMultipleSchemaForm = z.infer<typeof RiskResponseHazopMultipleSchema>
export type RiskResponseSevertyExpectMultipleSchemaForm = z.infer<
	typeof RiskResponseSevertyExpectMultipleSchema
>
export type RiskResponseSevertyExpectSchemaForm = z.infer<typeof RiskResponseSevertyExpectSchema>
