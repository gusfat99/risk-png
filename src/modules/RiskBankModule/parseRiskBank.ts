import { RiskBank } from "@/types/riskDataBank"

export const parseRiskBanktoView = (data: RiskBank) => {
	return {
		id: data.id,
		deviation_id: data.deviation_id,
		parameter: data.parameter,
		cause: data.cause,
		deviations: data.deviations,
		consequences: data.consequences.map((consequence) => {
			return {
				id: consequence.id,
				risk_bank_id: consequence.risk_bank_id,
				consequence: consequence.consequence,
				safeguards: consequence.safeguards.map((safeguard) => {
					return {
						id: safeguard.id,
						consequence_id: safeguard.consequence_id,
						safeguard: safeguard.safeguard,
						safeguard_title: safeguard.safeguard_title,
						file_path: safeguard.file_path,
					}
				}),
			}
		}),
	}
}
