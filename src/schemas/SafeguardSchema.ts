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
				if (file) {
					const allowedMimeTypes = [
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
						"application/vnd.ms-excel", // .xls
					]
					const maxSizeInBytes = 5 * 1024 * 1024 // 5MB

					// Check file type
					if (!allowedMimeTypes.includes(file.type)) {
						return false
					}

					// Check file size
					if (file.size > maxSizeInBytes) {
						return false
					}

					return true
				}
				return false
			},
			{
				message: "The File must be excel and cannot more than 5 Mb",
			}
		),
})

export const initialSafeguard = {
   safeguard: "",
   safeguard_title: "",
   file_path : ""
}
