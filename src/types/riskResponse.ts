import { ResponseApiType } from "@/helpers/ApiHelper"
import {
	RiskResponseHazopMultipleSchema,
	RiskResponseHazopSchema,
	RiskResponseSevertyExpectMultipleSchema,
	RiskResponseSevertyExpectSchema,
} from "@/schemas/RiskResponseSchema"
import { PaginationState, Updater } from "@tanstack/react-table"
import { z } from "zod"
import { CommonState } from "./common"
import { Node } from "./node"
import { Cause, Consequences, Deviations } from "./riskDataBank"
import { Severity } from "./severity"

export type RiskResponse = {
	id: number
	sp_expected: number
	se_expected: number
	sf_expected: number
	srl_expected: number
	sa_expected: number
	spn_expected: number
	l_frequency_expected: number
	risk_ranking_expected: number
	date_finished: string
	hazop_completed : "pending" | "in_progress" | "done"
	node_id: number
	deviation_id: number
	risk_bank_id: number
	consequence_id: number
	existing_safeguard: Array<string>
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
	consequence: Consequences | null
	tahun : string
}


export type Hazop = {
	id?: number
	hazop_recom: string
	responsibility: string
	due_date: string
	document_report: any | null
}

export type HazopStatus = {
	risk_analyst_id: number
	hazop_completed: HazopStatusValue
	date_finished: string | null
}

export type HazopStatusValue = "pending" | "in_progress" | "done"

export type RiskAnalystResponse = {
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
	consequence: Consequences
}

export interface RiskResponseState extends CommonState {
	riskResponseItems: RiskResponse[]
	riskResponseSelected: RiskResponse | null
	nodeSelected: Node | null
	riskSeveritySelected: string;
	hazopItemsSelected: Hazop[] | null
	severityItems : Severity[] | null
	isFetchingHazopItems: boolean
	isFetchingSeverity: boolean
	supportData: {
		node: {
			nodeItems: Node[]
			isFetching: boolean
		}
		isSubmitHazop?: boolean
	}
	actions: {
		fetchAllData(
			nodeId: any
		): Promise<ResponseApiType<{ risk_items: RiskResponse[] }>>
		fetchSingleData?(id: any): Promise<ResponseApiType<RiskResponse>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		fetchSeverity(): Promise<ResponseApiType<Severity[]>>
		fetchHazopByRiskAnalyst?(
			nodeId: any,
			riskAnalystId: any
		): Promise<ResponseApiType<Hazop[]>>
		setHazopByRiskAnalyst?(data: Hazop[] | null): void
		createHazop?(
			nodeId: any,
			riskId: any,
			payload: FormData
		): Promise<ResponseApiType<any>>
		updateHazop?(
			nodeId: any,
			riskId: any,
			payload: FormData
		): Promise<ResponseApiType<any>>
		setHazopStatus?(prams: {
			nodeId: any
			riskId: any
			status: any
		}): Promise<ResponseApiType<any>>
		updateSavertyExpectMultiple?(
			nodeId: any,
			payload: RiskResponseSevertyExpectMultipleSchemaForm
		): Promise<ResponseApiType<RiskResponse[]>>
		createData?(
			payload: any,
			nodeId: any
		): Promise<ResponseApiType<RiskResponse>>
		updateData?(
			id: any,
			paylaod: any
		): Promise<ResponseApiType<RiskResponse>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
		setNodeSelected: (nodeId: number) => void
		setRiskSeveritySelected
		: (severity: string) => void
	}
}

export type RiskResponseHazopSchemaForm = z.infer<
	typeof RiskResponseHazopSchema
>
export type RiskResponseHazopMultipleSchemaForm = z.infer<
	typeof RiskResponseHazopMultipleSchema
>
export type RiskResponseSevertyExpectMultipleSchemaForm = z.infer<
	typeof RiskResponseSevertyExpectMultipleSchema
>
export type RiskResponseSevertyExpectSchemaForm = z.infer<
	typeof RiskResponseSevertyExpectSchema
>
