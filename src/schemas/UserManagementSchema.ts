import { z } from "zod"

export const UserManagementSchema = z.object({
	name: z
		.string({
			message: "Name is required",
		})
		.min(1, { message: "Name is required" }),
	email: z
		.string({
			message: "Email  is required",
		})
		.min(1, { message: "Email is required" }),
	password: z
		.string({
			message: "Password is required",
		})
		.min(1, { message: "Password is required" }),
	password_confirmation: z
		.string({
			message: "Password Confirmation is required",
		})
		.min(1, { message: "Password Confirmation is required" }),
	role_id: z
		.string({
			message: "User Role is required",
		})
		.min(1, { message: "User Role is required" }),
})

export const initialValueUserManagement: z.infer<typeof UserManagementSchema> = {
   name: "",
   email: "",
   password: "",
   password_confirmation: "",
   role_id: "",
}
