import { z } from "zod"
import { Node } from "./node"
import { Cause, Deviations } from "./riskDataBank"
import { RiskMonitoringSchema, RiskMonitoringSeverityMultpleSchema } from "@/schemas/RiskMonitoringSchema"
import { CommonState } from "./common"
import { ResponseApiType } from "@/helpers/ApiHelper"
import { PaginationState, Updater } from "@tanstack/react-table"

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
	causes: Cause
}

export interface RiskMonitoringState extends CommonState {
	riskMonitoringItems: RiskMonitoring[]
	riskMonitoringSelected: RiskMonitoring | null
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
		fetchAllData(nodeId: any): Promise<ResponseApiType<RiskMonitoring[]>>
		fetchSingleData?(id: any): Promise<ResponseApiType<RiskMonitoring>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		fetchDeviationData(): Promise<ResponseApiType<Deviations[]>>
		createData?(
			payload: RiskMonitoringForm
		): Promise<ResponseApiType<RiskMonitoring>>
		updateData?(
			id: any,
			paylaod: any
		): Promise<ResponseApiType<RiskMonitoring>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
		handleChangeRiskMonitoringData: (
			name: keyof RiskMonitoringForm,
			id: any
		) => void
	}
}

export type RiskMonitoringForm = z.infer<typeof RiskMonitoringSchema>
export type RiskMonitoringSevertyMultipleForm = z.infer<typeof RiskMonitoringSeverityMultpleSchema>
