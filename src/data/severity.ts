export type fieldInputSeverityType = {
	label: string
	field: string
	field2: string
	field3: string
	name_code: string
	group: number
	col_id?: any
}

export const zeroValueOptionSeverity = {
	label: "(0) not taken into considered",
	value: "0",
}

export const fieldsInputSeverity: fieldInputSeverityType[] = [
	{
		label: "Severity to Personnel (SP)",
		field: "sp_current",
		field2: "sp_affected",
		field3: "sp_expected",
		col_id: 1,
		group: 1,
		name_code: "sp",
	},
	{
		label: "Severity to Environment (SE)",
		field: "se_current",
		field2: "se_affected",
		field3: "se_expected",
		col_id: 2,
		group: 2,
		name_code: "se",
	},
	{
		label: "Severity to Finance (SF)",
		field: "sf_current",
		field2: "sf_affected",
		field3: "sf_expected",
		col_id: 3,
		group: 1,
		name_code: "sf",
	},
	{
		label: "Severity to Reputation & Legal (SRL)",
		field: "srl_current",
		field2: "srl_affected",
		field3: "srl_expected",
		col_id: 4,
		group: 2,
		name_code: "srl",
	},
	{
		label: "Severity to Asset (SA)",
		field: "sa_current",
		field2: "sa_affected",
		field3: "sa_expected",
		col_id: 5,
		group: 1,
		name_code: "sa",
	},
	{
		label: "Severity to (SPN)",
		field: "spn_current",
		field2: "spn_affected",
		field3: "spn_expected",
		col_id: 6,
		group: 2,
		name_code: "spn",
	},
]

