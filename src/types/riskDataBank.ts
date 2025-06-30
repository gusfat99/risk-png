import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import { Safeguard } from "@/types/safeguard"
import { PaginationState, Updater } from "@tanstack/react-table"
import { z } from "zod"
import { RiskBankSchema } from "@/schemas/RiskBankSchema"

// Type untuk Deviations
export interface Deviations {
	id: number
	name?: string //sama dengan deviation
	deviation?: string //sama dengan name
	is_default: number
}
export interface Parameter {
	id: number
	name: string
}

// Type untuk Consequences
export interface Consequences {
	id: number
	risk_bank_id: number
	consequence: string
	safeguards: Safeguard[]
}

export interface Cause {
	id: number
	deviation_id: number
	parameter: string
	cause: string
}

// Type untuk Objek Utama
export interface RiskBank {
	id: number
	deviation_id: number
	cause: string
	deviations: Deviations
	parameter_deviations: Array<{
		deviation_id: number;
		id: number;
		parameter: Parameter;
		parameter_id: number;
		risk_bank_id: number;
	}>;
	consequences: Consequences[]
}

export interface RiskBankFlat {
	id: number
	no: number
	uniqueKey: string
	deviation_id: number
	parameter: string
	cause: string
	deviations: Deviations
	deviation: string
	mainRowspan: number
	consequenceRowspan: number
	consequences: Consequences[]
	consequence: string
	safeguard: string
	safeguard_link: string
	isFirstMain: boolean
	isFirstConsequence: boolean
}
export interface RiskBankFlatByConsequence {
    id: number
    no: number
    uniqueKey: string
    deviation_id: number
    parameter: string
    cause: string
    deviations: Deviations
    deviation: string
    mainRowspan: number
    consequenceRowspan: number
    consequence: string  // Langsung string, tidak perlu array consequences
    safeguards: Safeguard[]
    isFirstMain: boolean
    isFirstConsequence: boolean

}

export interface RiskDataBankState extends CommonState {
	riskDataBankItems: RiskBank[]
	riskDataBankFlat: RiskBankFlat[]
	riskDataBankFlatByConsequences: RiskBankFlatByConsequence[]
	riskDataBankSelected: RiskBank | null
	supportData: {
		isFetchingSupportData: boolean
		parameterItems: Parameter[] | null
		deviationItems: Deviations[] | null
		safeguardItems: Safeguard[] | null
	}
	actions: {
		fetchAllData(): Promise<ResponseApiType<RiskBank[]>>
		fetchAllSupportData(): Promise<{
			deviation: Deviations[] | null
			safeguard: Safeguard[] | null
		}>
		fetchSingleData?(id: any): Promise<ResponseApiType<RiskBank>>
		createData?(payload: any): Promise<ResponseApiType<RiskBank>>
		updateData?(id: any, payload: RiskBankSchemaForm): Promise<ResponseApiType<RiskBank>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
		setQuerySearch?: (serachValue: string) => void
		exportExcel?: () => void
	}
}

export type RiskBankSchemaForm = z.infer<typeof RiskBankSchema>
