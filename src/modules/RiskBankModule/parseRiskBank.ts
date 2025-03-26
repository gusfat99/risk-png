import { RiskBankSchema } from "@/schemas/RiskBankSchema"
import { RiskBank } from "@/types/riskDataBank"
import { z } from "zod"

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

export const parseRiskBankToPayload = (
	value: z.infer<typeof RiskBankSchema>
): FormData => {
	const formData = new FormData()
	const regex = /^-?\d+$/
	//check is number/id

	formData.append("parameter", value.parameter)
	formData.append("cause", value.cause)
	if (value.deviation_id) {
		formData.append("deviation_id", value.deviation_id)
	} else if (value.deviation) {
		formData.append("deviation", value.deviation)
	}
	value.consequences.forEach((consequence, idx) => {
		formData.append(
			`consequences[${idx}][consequence]`,
			consequence.consequence
		)
		consequence.safeguards.forEach((safeguard, idxSafeguard) => {
			let indexSafeguard = `consequences[${idx}][safeguards][${idxSafeguard}]`
			//check jika safeguard isinya berupa id maka payload yg di kirim safeguard_id saja
			if (regex.test(safeguard.safeguard || "")) {
				formData.append(
					`${indexSafeguard}[safeguard_id]`,
					String(safeguard.safeguard ?? "")
				)
			} else {
				formData.append(
					`${indexSafeguard}[safeguard]`,
					String(safeguard.safeguard ?? "")
				)
				formData.append(
					`${indexSafeguard}[safeguard_title]`,
					String(safeguard.safeguard_title ?? "")
				)
				formData.append(
					`${indexSafeguard}[file_path]`,
					safeguard.file_path ? safeguard.file_path : ""
				)
			}
		})
	})
	return formData
}
