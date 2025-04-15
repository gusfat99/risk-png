import { z } from "zod"
import { Node } from "./node"
import { Cause, Deviations } from "./riskDataBank"
import {
	RiskMonitoringSchema,
	RiskMonitoringSeverityMultpleSchema,
} from "@/schemas/RiskMonitoringSchema"
import { CommonState } from "./common"
import { ResponseApiType } from "@/helpers/ApiHelper"
import { PaginationState, Updater } from "@tanstack/react-table"
import { Deviation } from "./deviation"

export type RiskMonitoring = {
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
	deviations: Deviations
	causes: Cause | null
}

export type ReportRiskMonitoring = {
	node_id: any
	node: number
	deviation_id: any
	deviation_name: number
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
		deviation: {
			deviationItems: Deviations[]
			isFetching: boolean
		}
		cause: {
			causeItems: Cause[]
			isFetching: boolean
		}
	}
	actions: {
		fetchAllData(): Promise<ResponseApiType<RiskMonitoring[]>>
		fetchReportRiskMonitoringData(): Promise<
			ResponseApiType<ReportRiskMonitoring[]>
		>
		fetchDetailReportRiskMonitoring(): Promise<
			ResponseApiType<DetailReportRiskMonitoring[]>
		>
		fetchSingleData?(id: any): Promise<ResponseApiType<RiskMonitoring>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		fetchDeviationData(): Promise<ResponseApiType<Deviations[]>>
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
		fetchDetailReportRiskMonitoring(): Promise<
			ResponseApiType<DetailReportRiskMonitoring[]>
		>
		setPagination?: (updater: Updater<PaginationState>) => void
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		setNodeSelected: (nodeId: number) => void
	}
}

export type RiskMonitoringSchemaForm = z.infer<typeof RiskMonitoringSchema>
export type RiskMonitoringSevertyMultipleForm = z.infer<
	typeof RiskMonitoringSeverityMultpleSchema
>
