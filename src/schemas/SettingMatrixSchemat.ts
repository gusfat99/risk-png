import { z } from "zod"

// Schema yang telah didefinisikan
export const MatrixSchema = z.object({
	value: z
		.string({ message: "required" })
		.min(1, "required"),
})
export const MatrixRiskMapSchema = z.object({
	value: z
		.string({ message: "value of matrix required" })
		.min(1, "required"),
	color: z
		.string({ message: "color required" })
		.min(1, "required"),
})
