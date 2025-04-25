export type fieldInputSeverityType = {
	label: string
	field: string
	field2: string
	name_code: string
	group: number
	col_id?: any
}

export const fieldsInputSeverity: fieldInputSeverityType[] = [
	{
		label: "Severity to Personnel (SP)",
		field: "sp_current",
		field2: "sp_affected",
		col_id: 1,
		group: 1,
		name_code: "sp",
	},
	{
		label: "Severity to Environment (SE)",
		field: "se_current",
		field2: "se_affected",
		col_id: 2,
		group: 2,
		name_code: "se",
	},
	{
		label: "Severity to Finance (SF)",
		field: "sf_current",
		field2: "sf_affected",
		col_id: 3,
		group: 1,
		name_code: "sf",
	},
	{
		label: "Severity to Reputation & Legal (SRL)",
		field: "srl_current",
		field2: "srl_affected",
		col_id: 4,
		group: 2,
		name_code: "srl",
	},
	{
		label: "Severity to Asset (SA)",
		field: "sa_current",
		field2: "sa_affected",
		col_id: 5,
		group: 1,
		name_code: "sa",
	},
	{
		label: "Severity to (SPN)",
		field: "spn_current",
		field2: "spn_affected",
		col_id: 6,
		group: 2,
		name_code: "spn",
	},
]

