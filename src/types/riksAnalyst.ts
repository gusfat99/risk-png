import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import { PaginationState, Updater } from "@tanstack/react-table"
import { Node } from "./node"
import { Cause, Consequences, Deviations } from "./riskDataBank"
import { z } from "zod"
import {
	RiskAnalysisSchema,
	RiskAnalysisSeverityMultpleSchema,
	RiskAnalysisSeveritySchema,
} from "@/schemas/RiskAnalystSchema"
import { Safeguard } from "./safeguard"

export type RiskAnalysis = {
	node_id: string
	deviation_id: string
	risk_bank_id: string
	consequence_id: string
	existing_safeguard: Safeguard[]
	sp_current: any
	sf_current: any
	se_current: any
	srl_current: any
	sa_current: any
	spn_current: any
	l_frequency_current: any
	risk_ranking_current: number
	remark_analyst: string
	id: number
	nodes: Node
	deviations: Deviations
	consequence: Consequences | null
	causes: Cause
}

export interface RiskAnalystState extends CommonState {
	riskAnalysItems: RiskAnalysis[]
	riskAnalysSelected: RiskAnalysis | null
	nodeSelected: Node | null
	supportData: {
		node: {
			nodeItems: Node[]
			isFetching: boolean
		}
		deviation: {
			deviationItems: Deviations[]
			isFetching: boolean
		}
		cause: {
			causeItems: Cause[]
			isFetching: boolean
		}
		consiquence: {
			consiquenceItems: Consequences[]
			isFetching: boolean
		}
		safeguard: {
			safeguardItems: Safeguard[]
			isFetching: boolean
		}
	}
	actions: {
		fetchAllData(
			nodeId: any
		): Promise<ResponseApiType<{ risk_analyst: RiskAnalysis[] }>>
		fetchSingleData?(nodeId : any, id: any): Promise<ResponseApiType<RiskAnalysis>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		fetchDeviationData(): Promise<ResponseApiType<Deviations[]>>
		createData?(
			payload: RiskAnalysisForm,
			nodeId: any
		): Promise<ResponseApiType<{risk_analyst : RiskAnalysis}>>
		updateData?(
			id: any,
			nodeId: any,
			paylaod: any
		): Promise<ResponseApiType<{risk_analyst :RiskAnalysis}>>
		updateSavertyMultiple?(
			nodeId : any,
			payload: RiskAnalysisSevertyMultipleForm
		): Promise<ResponseApiType<RiskAnalysis[]>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
		setNodeSelected: (nodeId: number) => void
		handleChangeRiskBankData: (
			name: keyof z.infer<typeof RiskAnalysisSchema>,
			id: any
		) => void
	}
}

export type RiskAnalysisForm = z.infer<typeof RiskAnalysisSchema>
export type RiskAnalysisSevertyMultipleForm = z.infer<
	typeof RiskAnalysisSeverityMultpleSchema
>
export type RiskAnalysisSevertyForm = z.infer<typeof RiskAnalysisSeveritySchema>
