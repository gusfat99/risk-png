import { z } from "zod"

export const RiskBankSchema = z.object({
	parameter_id: z
		.string({ message: "Parameter is required" })
		.min(1, { message: "Parameter is required", }),
	parameter: z
		.string({ message: "Parameter is required" }).optional(),
	deviation: z.string().optional(),
	deviation_id: z.string().min(1, { message: "deviation is required", }),
	cause: z.string({
		message: "Cause is required",
	}).min(1, { message: "Cause is required", }),
	consequences: z
		.array(
			z.object({
				id: z.string().optional(), //only for edit
				consequence: z.string({
					message: "Consequence is required",
				}).min(1, { message: "Consequence is required", }),
				safeguards: z.array(
					z.object({
						// safeguard_id: z.number().optional(),
						safeguard: z.string().min(1, { message: "safeguard is required", }),
						safeguard_title: z.string().min(1, { message: "safeguard title is required", }),
						file_path: z.any(),
					})
				).optional(),
			})
		)
		.min(1, {
			message: "Conesequence min 1 available",
		}),
})

export const initialRiskBank = {
	deviation_id: "",
	parameter_id: "",
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
