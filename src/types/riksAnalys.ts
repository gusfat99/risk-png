import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import { PaginationState, Updater } from "@tanstack/react-table"
import { Node } from "./node"
import { Cause, Consequences, Deviations } from "./riskDataBank"
import { z } from "zod"
import { RiskAnalysisSchema } from "@/schemas/RiskAnalystSchema"
import { Safeguard } from "./safeguard"

export type RiskAnalysis = {
	node_id: string
	deviation_id: string
	risk_bank_id: string
	consequence_id: string
	existing_safeguard: string
	sp_current: string
	sf_current: string
	se_current: string
	srl_current: string
	sa_current: string
	spn_current: string
	l_frequency_current: string
	risk_ranking_current: number
	remark_analyst: string
	id: number
	nodes: Node
	deviations: Deviations
	consequences: Consequences
}

export interface RiskAnalysState extends CommonState {
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
      },
      safeguard: {
         safeguardItems : Safeguard[]
         isFetching: boolean
      }
	}
	actions: {
		fetchAllData(nodeId: any): Promise<ResponseApiType<RiskAnalysis[]>>
		fetchSingleData?(id: any): Promise<ResponseApiType<RiskAnalysis>>
		fetchNodeData(): Promise<ResponseApiType<Node[]>>
		fetchDeviationData(): Promise<ResponseApiType<Deviations[]>>
		createData?(payload: any): Promise<ResponseApiType<RiskAnalysis>>
		updateData?(
			id: any,
			paylaod: any
		): Promise<ResponseApiType<RiskAnalysis>>
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