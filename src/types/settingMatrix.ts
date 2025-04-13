import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState, SelectDataType } from "./common"
import { z } from "zod"
import { MatrixSchema } from "@/schemas/SettingMatrixSchemat"

export type RowLikelyhoodFrequency = {
	id: any
	explanation_name: string | null
	cells: Array<{
		column_id: any
		column_name: string
		value: string
	}>
}

export type LikelyhoodFrequency = {
	column: Array<{
		frequency_name: string
		id: any
	}>
	row: Array<RowLikelyhoodFrequency>
	[x: string]: any
}

export type SeverityMap = {
	column_value: any
	column_deviation: string
	severity_map_value: string
	row_value: string
	row_severity: string
	[x: string]: any
}

export type RiskMap = {
	id: any
	frequency: any
	deviation: any
	value: any
	color: string
	[x: string]: any
}

export type MatrixSelectedRowCol = {
	inputLabel: string
	col_id?: any
	row_id?: any
	field: string
	value?: string
}

export interface SettingMatrixState extends CommonState {
	likelyhood_frequency: {
		isFetching: boolean
		item: LikelyhoodFrequency | null
	}
	severity_map_options: SelectDataType[]
	likelyhood_options: SelectDataType[]
	severity_map: {
		isFetching: boolean
		item: SeverityMap[] | null
	}
	isSubmitMatrixCell: boolean
	isProcessAddRowLikelyhood: boolean
	actions: {
		fetchLikelyhood(): Promise<ResponseApiType<LikelyhoodFrequency>>
		fetchSeverityMap(): Promise<ResponseApiType<SeverityMap[]>>
		fetchOptionsSeverityMap(): void
		fetchOptionsLikelyhood(): void
		updateColumnCell(
			columnId: any,
			columnName: string,
			columnValue: string
		): Promise<ResponseApiType<any>>
		updateRowCell(
			rowId: any,
			rowCellName: string,
			rowCellValue: string
		): Promise<ResponseApiType<any>>
		updateRowColCell(
			columnId: any,
			rowId: any,
			value: string,
			matrixType: "likelyhood" | "severity"
		): Promise<ResponseApiType<any>>
		addRowLikelyhoodFrequency?(): Promise<
			ResponseApiType<RowLikelyhoodFrequency>
		>
		deleteLastRowLikelyhoodFrequency?(): Promise<ResponseApiType<any>>
	}
}

export type MatrixSchemaForm = z.infer<typeof MatrixSchema>
