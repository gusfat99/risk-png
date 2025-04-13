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
		);

		(consequence.safeguards || []).forEach((safeguard, idxSafeguard) => {
			const indexSafeguard = `consequences[${idx}][safeguards][${idxSafeguard}]`
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
					String(safeguard.safeguard ?? "")
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
	let no = 0;
	const flattenedData: RiskBankFlat[] = (datas || []).flatMap(
		(mainEntry, mainIndex) => {
			const consequences = mainEntry.consequences || []
			  // If no safeguards, we still want one row for the consequence
			const totalSafeguards = consequences.reduce(
            (sum, cons) => sum + Math.max(1, cons.safeguards?.length || 0),
            0
			);
			no++;
			
			// Increment nomor hanya untuk entri utama pertama
			const currentNo = no;

			return consequences.flatMap((consequence, consIndex) => {
				const safeguards = consequence.safeguards || []
				const consequenceRowspan = safeguards.length

				 // If no safeguards, create one "empty" entry
				 if (safeguards.length === 0) {
					return [{
						 // Main Data
						 id: mainEntry.id,
						 no : currentNo,
						 uniqueKey: `${mainEntry.id}_${consequence.id}_0`,
						 parameter: mainEntry.parameter,
						 cause: mainEntry.cause,
						 deviation_id: mainEntry.deviation_id,
						 deviations: mainEntry.deviations,
						 deviation: mainEntry.deviations.name || mainEntry.deviations.deviation || "",

						 // Consequence Data
						 consequences,
						 consequence: consequence.consequence,

						 // Safeguard Data (empty)
						 safeguards,
						 safeguard: "",
						 safeguard_link: "",
						 safeguard_title: "",

						 // Metadata for Rowspan
						 mainRowspan: totalSafeguards,
						 consequenceRowspan: 1,
						 isFirstMain: consIndex === 0, // First row in main group
						 isFirstConsequence: true, // Only row for this consequence
					}];
			  }

				return safeguards.map((safeguard, sgIndex) => ({
					// Data Utama
					id: mainEntry.id,
					no : currentNo,
					uniqueKey: `${mainEntry.id}_${consequence.id}_${safeguard.id}`,
					parameter: mainEntry.parameter,
					cause: mainEntry.cause,
					deviation_id: mainEntry.deviation_id,
					deviations: mainEntry.deviations,
					deviation: mainEntry.deviations.name || mainEntry.deviations.deviation || "",

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
