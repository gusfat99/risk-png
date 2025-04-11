import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import { z } from "zod"
import { MatrixSchema } from "@/schemas/SettingMatrixSchemat"

export type LikelyhoodFrequency = {
	column: {
		id: any
		frequency_1: string | null
		frequency_2: string | null
		frequency_3: string | null
		frequency_4: string | null
		frequency_5: string | null
	}
	row: Array<{
		id: any
		explanation_1: string | null
		explanation_2: string | null
		explanation_3: string | null
		explanation_4: string | null
		explanation_5: string | null
		explanation_6: string | null
	}>
	[x: string]: any
}

export type SeverityMap = {
	column: {
		id: any
		deviation_1: string | null
		deviation_2: string | null
		deviation_3: string | null
		deviation_4: string | null
		deviation_5: string | null
	}
	row: Array<{
		id: any
		explanation_1: string | null
		explanation_2: string | null
		explanation_3: string | null
		explanation_4: string | null
		explanation_5: string | null
		explanation_6: string | null
	}>
}

export type RiskMap = {
	column: {
		id: any
		deviation_1: string | null
		deviation_2: string | null
		deviation_3: string | null
		deviation_4: string | null
		deviation_5: string | null
	}
	row: Array<{
		id: any
		explanation_1: string | null
		explanation_2: string | null
		explanation_3: string | null
		explanation_4: string | null
		explanation_5: string | null
		explanation_6: string | null
	}>
}

export type MatrixSelectedRowCol = {
	inputLabel: string
	row_id?: any
	isRow: boolean
	field: string
} 

export interface SettingMatrixState extends CommonState {
	likelyhood_frequency: {
		isFetching: boolean
		item: LikelyhoodFrequency | null
	}
	severity_map: {
		isFetching: boolean
		item: SeverityMap | null
	}

	actions: {
		fetchLikelyhood(): Promise<ResponseApiType<LikelyhoodFrequency>>
		fetchSeverityMap(): Promise<ResponseApiType<SeverityMap>>
	}
}

export type MatrixSchemaForm = z.infer<typeof MatrixSchema>
