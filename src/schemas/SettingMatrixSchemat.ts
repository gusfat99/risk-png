import { z } from "zod"

// Schema yang telah didefinisikan
export const MatrixSchema = z.object({
	value: z
		.string({ message: "required" })
		.min(1, "required"),
})
