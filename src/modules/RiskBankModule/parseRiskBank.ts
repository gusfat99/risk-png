import { RiskBankSchema } from "@/schemas/RiskBankSchema"
import { RiskBank, RiskBankFlat } from "@/types/riskDataBank"
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
						safeguard: safeguard.id?.toString() as unknown as string,
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

export const parseRiskBankToFlatted = (datas: RiskBank[]): RiskBankFlat[] => {
	let no = -1
	const flattenedData: RiskBankFlat[] = (datas || []).flatMap(
		(mainEntry) => {
			const consequences = mainEntry.consequences || []
			const totalSafeguards = consequences.reduce(
				(sum, cons) => sum + (cons.safeguards?.length || 0),
				0
			)
			
			no++

			return consequences.flatMap((consequence, consIndex) => {
				const safeguards = consequence.safeguards || []
				const consequenceRowspan = safeguards.length

				return safeguards.map((safeguard, sgIndex) => ({
					// Data Utama
					id: mainEntry.id,
					no,
					uniqueKey: `${mainEntry.id}_${consequence.id}_${safeguard.id}`,
					parameter: mainEntry.parameter,
					cause: mainEntry.cause,
					deviation_id: mainEntry.deviation_id,
					deviations: mainEntry.deviations,
					deviation: mainEntry.deviations.name,

					// Data Konsekuensi
					consequences,
					consequence: consequence.consequence,

					// Data Safeguard
					safeguards,
					safeguard: safeguard.safeguard,
					safeguard_link: safeguard.file_path,
					safeguard_title: safeguard.safeguard_title,

					// Metadata untuk Rowspan
					mainRowspan: totalSafeguards,
					consequenceRowspan: consequenceRowspan,
					isFirstMain: sgIndex === 0 && consIndex === 0, // Baris pertama di grup utama
					isFirstConsequence: sgIndex === 0, // Baris pertama di grup konsekuensi
				}))
			})
		}
	)
	return flattenedData
}
