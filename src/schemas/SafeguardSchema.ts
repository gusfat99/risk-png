import { z } from "zod"

export const SafeguardSchema = z.object({
	safeguard: z
		.string({
			message: "Safeguard is required",
		})
		.min(1, { message: "Safeguard is required" }),
	safeguard_title: z
		.string({
			message: "Safeguard Title  is required",
		})
		.min(1, { message: "Safeguard Title  is required" }),
	file_path: z
		.instanceof(File, {
			message: "Please upload file",
		})
		.refine(
			(file) => {
				if (!file) {
					return false
				}
				return true
			},
			{
				message: "Please upload file",
			}
		),
})

export const initialSafeguard = {
	safeguard: "",
	safeguard_title: "",
	file_path: undefined,
}
