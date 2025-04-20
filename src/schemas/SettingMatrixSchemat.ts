import { z } from "zod"

// Schema yang telah didefinisikan
export const MatrixSchema = z.object({
	value: z.string({ message: "required" }).min(1, "required"),
})
export const MatrixRiskMapSchema = z.object({
	value: z.string({ message: "value of matrix required" }).min(1, "required"),
	color: z.string({ message: "color required" }).min(1, "required"),
})

export const AppetiteSchema = z.object({
	risk_apetite: z
		.string()
		.min(1, "Requried")
		.refine((val) => !isNaN(Number(val)), {
			message: name + " Must be a number",
		}) // Pastikan angka valid
		.refine((val) => Number(val) > 0, {
			message: name + " must be more than 0",
		})
		.default("15"), // Harus positif
})
