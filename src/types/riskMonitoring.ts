import { z } from "zod"
import { Node } from "./node"
import { Cause, Consequences, Deviations, Parameter } from "./riskDataBank"
import {
	RiskMonitoringSchema,
	RiskMonitoringSeverityMultpleSchema,
} from "@/schemas/RiskMonitoringSchema"
import { CommonState } from "./common"
import { ResponseApiType } from "@/helpers/ApiHelper"
import { PaginationState, Updater } from "@tanstack/react-table"
import { Deviation } from "./deviation"
import { Safeguard } from "./safeguard"

export type RiskMonitoring = {
	id: number
	node_id: number
	deviation_id: number
	parameter_id: number
	parameters: Parameter
	consequence_id: any
	risk_bank_id: number
	incident_name: string
	incident_location: string
	incident_trigger: string
	incident_date: string
	incident_time: string
	sp_affected: number
	se_affected: number
	sf_affected: number
	srl_affected: number
	sa_affected: number
	spn_affected: number
	nodes: Node
	deviations: Deviations
	causes: Cause | null
	consequences: Consequences
	failed_safeguards: Safeguard[]
	name: string
	action_taken: string
	nip: string
	evidence: any
	reported_on: string
	status: "pending" | "verified"
}

export type ReportRiskMonitoring = {
	node_id: any
	node: number
	deviation_id: any
	parameter_id: any
	parameter_name: string
	deviation_name: number
	consequence: string
	consequence_id: number
	risk_bank_id: string
	cause: string
	incident_count: number
	incident_severity: number
}

export type DetailReportRiskMonitoring = {
	id: number
	node_id: number
	deviation_id: number
	risk_bank_id: number
	incident_name: string
	incident_location: string
	incident_trigger: string
	sp_affected: number
	se_affected: number
	sf_affected: number
	srl_affected: number
	sa_affected: number
	spn_affected: number
	nodes: Node
	deviations: Deviation
	causes: Cause
}

export interface RiskMonitoringState extends CommonState {
	riskMonitoringItems: RiskMonitoring[]
	riskMonitoringSelected: RiskMonitoring | null
	nodeSelected: Node | null
	isFetchingReport: boolean
	reportRiskMonitoring: ReportRiskMonitoring[]
	reportRiskMonitoringDetail: DetailReportRiskMonitoring[]
	supportData: {
		node: {
			nodeItems: Node[]
			isFetching: boolean
		}
		parameter: {
			parameterItems: Parameter[]
			isFetching: boolean
		}
		deviation: {
			deviationItems: Deviations[]
			isFetching: boolean
		}
		cause: {
			causeItems: Cause[]
			isFetching: boolean
		},
		consequence: {
			consequenceItems: Consequences[]
			isFetching: boolean
		},
		safeguard: {
			safeguardItems: Array<{
				id: any
				safeguard: string
			}>
			isFetching: boolean
		},
	}
	actions: {
		fetchAllData(): Promise<ResponseApiType<RiskMonitoring[]>>
		fetchSingleData?(id: any): Promise<ResponseApiType<RiskMonitoring>>
		fetchDetailData?(id: any): Promise<ResponseApiType<RiskMonitoring>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		fetchDeviationData(): Promise<ResponseApiType<Deviations[]>>
		fetchParameterData(): Promise<ResponseApiType<Parameter[]>>
		createData?(
			payload: RiskMonitoringSchemaForm
		): Promise<ResponseApiType<RiskMonitoring>>
		updateData?(
			id: any,
			paylaod: any
		): Promise<ResponseApiType<RiskMonitoring>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
		handleChangeRiskMonitoringData: (
			name: keyof RiskMonitoringSchemaForm,
			id: any
		) => void
		setNodeSelected: (nodeId: number) => void
		setStatus: (monitoringId: any, status: "pending" | "verified") => Promise<ResponseApiType<any>>
		updateSavertyMultiple: (
			nodeId: any,
			payload: RiskMonitoringSevertyMultipleForm
		) => Promise<ResponseApiType<RiskMonitoring[]>>
	}
}
export interface ReportRiskMonitoringState extends CommonState {
	nodeSelected: Node | null
	isFetchingReport: boolean
	reportRiskMonitoring: ReportRiskMonitoring[]
	reportRiskMonitoringDetail: DetailReportRiskMonitoring[]
	supportData: {
		node: {
			nodeItems: Node[]
			isFetching: boolean
		}
	}
	actions: {
		fetchReportRiskMonitoring(): Promise<
			ResponseApiType<ReportRiskMonitoring[]>
		>
		fetchDetailReportRiskMonitoring(params: {
			nodeId: any
			deviationId: any
			riskBankId: any
			parameterId: any
			consequenceId: any
		}): Promise<ResponseApiType<DetailReportRiskMonitoring[]>>
		setPagination?: (updater: Updater<PaginationState>) => void
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		setNodeSelected: (nodeId: number) => void
		
		downloadFileReportDetail: (params: {
			nodeId: any
			deviationId: any
			riskBankId: any,
			parameterId: any
			consequenceId: any
		}) => void
	}
}

export type RiskMonitoringSchemaForm = z.infer<typeof RiskMonitoringSchema>
export type RiskMonitoringSevertyMultipleForm = z.infer<
	typeof RiskMonitoringSeverityMultpleSchema
>
