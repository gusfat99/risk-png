import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import { PaginationState, Updater } from "@tanstack/react-table"
import { Node } from "./node"
import { Cause, Consequences, Deviations, Parameter } from "./riskDataBank"
import { z } from "zod"
import {
	RiskAnalysisSchema,
	RiskAnalysisSeverityMultpleSchema,
	RiskAnalysisSeveritySchema,
} from "@/schemas/RiskAnalystSchema"
import { Safeguard } from "./safeguard"

export type RiskAnalysis = {
	node_id: string
	parameter_id: string
	parameters: Parameter
	deviation_id: string
	risk_bank_id: string
	consequence_id: string
	existing_safeguard: string[]
	sp_current: any
	sf_current: any
	se_current: any
	srl_current: any
	sa_current: any
	spn_current: any
	l_frequency_current: any
	sp_expected: any | null
	se_expected: any | null
	sf_expected: any | null
	srl_expected: any | null
	sa_expected: any | null
	spn_expected: any | null
	l_frequency_expected: any | null
	risk_ranking_expected: number
	risk_ranking_current: number
	remark_analyst: string
	id: number
	nodes: Node
	deviations: Deviations
	consequence: Consequences | null
	causes: Cause
}

export type RiskAnalysReport = {
	risk_analyst_id: number;
	node: string;
	parameter_name: string;
	deviation_name: string;
	cause_name: string;
	consequence_name: string;
	existing_safeguard: string[];
	risk_ranking_current: number;
};


export interface RiskAnalystState extends CommonState {
	riskAnalysItems: RiskAnalysis[]
	riskAnalysSelected: RiskAnalysis | null
	nodeSelected: Node | null
	riskAnalystReportItems : RiskAnalysReport[]
	supportData: {
		node: {
			nodeItems: Node[]
			isFetching: boolean
		}
		deviation: {
			deviationItems: Deviations[]
			isFetching: boolean
		}
		parameter: {
			parameterItems: Parameter[]
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
		fetchReport?(
			nodeId: any
		): Promise<ResponseApiType<RiskAnalysReport[]>>
		fetchSingleData?(nodeId: any, id: any): Promise<ResponseApiType<RiskAnalysis>>
		fetchDetailData?(nodeId: any, id: any): Promise<ResponseApiType<RiskAnalysis>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		fetchParameterData?(): Promise<ResponseApiType<Parameter[]>>
		fetchDeviationData?(): Promise<ResponseApiType<Deviations[]>>
		createData?(
			payload: RiskAnalysisForm,
			nodeId: any
		): Promise<ResponseApiType<{ risk_analyst: RiskAnalysis }>>
		updateData?(
			id: any,
			nodeId: any,
			paylaod: any
		): Promise<ResponseApiType<{ risk_analyst: RiskAnalysis }>>
		updateSavertyMultiple?(
			nodeId: any,
			payload: RiskAnalysisSevertyMultipleForm
		): Promise<ResponseApiType<RiskAnalysis[]>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
		setNodeSelected: (nodeId: number) => void
		setQuerySearch: (value: string) => void
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
