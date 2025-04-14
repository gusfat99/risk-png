
export type fieldInputSeverityType = {
   label: string
   field: string
   name_code : string
   group: number
   col_id?: any
}

export const fieldsInputSeverity: fieldInputSeverityType[] = [
   {
      label: "Severity to Personnel (SP)",
      field: "sp_current",
      name_code : "sp",
      col_id: 1,
      group: 1,
   },

   {
      label: "Severity to Finance (SF)",
      field: "sf_current",
      name_code : "sf",
      col_id: 2,
      group: 1,
   },
   {
      label: "Severity to Asset (SA)",
      field: "sa_current",
      name_code : "sa",
      col_id: 3,
      group: 1,
   },
   {
      label: "Severity to Environment (SE)",
      field: "se_current",
      name_code : "se",
      col_id: 4,
      group: 2,
   },
   {
      label: "Severity to Reputation & Legal (SRL)",
      field: "srl_current",
      name_code : "srl",
      col_id: 5,
      group: 2,
   },
   {
      label: "Severity to Public Notification (SPN)",
      field: "spn_current",
      name_code : "spn",
      col_id: 6,
      group: 2,
   },
]