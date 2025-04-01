import { profile } from "console"
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

export const ChangePasswordSchema = z.object({
	current_password: z
		.string({
			message: "Current Password is required",
		})
		.min(1, { message: "Current Password is required" }),
	password: z
		.string({
			message: "Password is required",
		})
		.min(8, { message: "Password must be at least 8 characters long" }),
	password_confirmation: z
		.string({
			message: "Password Confirmation is required",
		})
		.min(8, { message: "Password must be at least 8 characters long" }),
})

export const PersonalInfoSchema = z.object({
	name: z
		.string({
			message: "Name is required",
		})
		.min(1, { message: "Name is required" }),
	email: z
		.string({
			message: "Email  is required",
		})
		.email("Email is not valid")
		.min(1, { message: "Email is required" }),
	profile_picture: z.any().optional(),
})

export const initialValueUserManagement: z.infer<typeof UserManagementSchema> =
	{
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		role_id: "",
	}
