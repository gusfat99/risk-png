import { z } from "zod"

export const   RiskBankSchema = z.object({
	parameter: z.string({
		message: "Parameter is required",
	}),
	deviation: z.string().optional(),
	deviation_id: z.string().optional(),
	cause: z.string({
		message: "Cause is required",
	}),
	consequences: z
		.array(
			z.object({
				consequence: z.string({
					message: "Consequence is required",
				}),
				safeguards: z.array(
					z.object({
						safeguard_id: z.number().optional(),
						safeguard: z.string().optional(),
						safeguard_title: z.string().optional(),
						file_path: z.instanceof(File).refine(
							(file) => {
								return true
							},
							{
								message: "Please upload file",
							}
						).optional(),
					})
				),
			})
		)
		.min(1, {
			message: "Conesequence min 1 available",
		}),
})

export const initialRiskBank = {
	deviation_id: "",
	parameter: "",
	cause: "",
	deviation: "",
	consequences: [
		{
			consequence: "",
			safeguards: [],
		},
	],
}
