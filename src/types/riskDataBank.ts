import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import { Safeguard } from "./safeguard"
import { PaginationState, Updater } from "@tanstack/react-table"

// Type untuk Deviations
export interface Deviations {
	id: number
	name: string
	is_default: number
}

// Type untuk Consequences
export interface Consequences {
	id: number
	risk_bank_id: number
	consequence: string
	safeguards: Safeguard[]
}

// Type untuk Objek Utama
export interface RiskBank {
	id: number
	deviation_id: number
	parameter: string
	cause: string
	deviations: Deviations
	consequences: Consequences[]
}

export interface RiskBankFlat {
	id: number
	uniqueKey: string
	deviation_id: number
	parameter: string
	cause: string
	deviations: Deviations
	deviation: string
	mainRowspan: number;
	consequenceRowspan: number;
	consequences: Consequences[]
	consequence: string
	safeguard: string
	safeguard_link: string
	isFirstMain: boolean
	isFirstConsequence : boolean
}

export interface RiskDataBankState extends CommonState {
	riskDataBankItems: RiskBank[]
	riskDataBankFlat: RiskBankFlat[]
	riskDataBankSelected: RiskBank | null
	supportData: {
		isFetchingSupportData: boolean;
		deviationItems: Deviations[] | null;
		safeguardItems : Safeguard[] | null,
	},
	actions: {
		fetchAllData(): Promise<ResponseApiType<RiskBank[]>>
		fetchAllSupportData(): Promise<{
			deviation: Deviations[] | null,
			safeguard : Safeguard[] | null
		}>
		fetchSingleData?(): Promise<ResponseApiType<RiskBank>>
		createData?(payload: any): Promise<ResponseApiType<RiskBank>>
		updateData?(id: any, paylaod: any): Promise<ResponseApiType<RiskBank>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
	}
}
