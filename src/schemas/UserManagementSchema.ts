import { profile } from "console"
import { z } from "zod"

export const getUserManagementSchema = (isEdit: boolean) => {
  const baseSchema = {
    name: z.string({ message: "Name is required" }).min(1, { message: "Name is required" }),
    email: z
      .string({ message: "Email is required" })
      .email("Email is not valid")
      .min(1, { message: "Email is required" }),
    role_id: z
      .string({ message: "User Role is required" })
      .min(1, { message: "User Role is required" }),
  };

  const passwordSchema = isEdit
    ? z.string().optional().or(z.literal(""))
    : z.string({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" });

  const confirmPasswordSchema = isEdit
    ? z.string().optional().or(z.literal(""))
    : z.string({ message: "Password Confirmation is required" }).min(1, { message: "Password Confirmation is required" });

  return z
    .object({
      ...baseSchema,
      password: passwordSchema,
      password_confirmation: confirmPasswordSchema,
    })
    .refine((data) => {
      if (data.password || data.password_confirmation) {
        return data.password === data.password_confirmation;
      }
      return true;
    }, {
      message: "Passwords do not match",
      path: ["password_confirmation"],
    });
};


export const UserManagementSchema = z.object({
	name: z
		.string({
			message: "Name is required",
		})
		.min(1, { message: "Name is required" }),
	email: z
		.string({
			message: "Email  is required",
		}).email("Email is not valid")
		.min(1, { message: "Email is required" }),
	password: z
		.string({
			message: "Password is required",
		})
		.min(8, { message: "Password must be at least 8 characters long" }),
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
}).refine((data) => data.password === data.password_confirmation, {
	message: "Passwords does not match",
		// Menandai error pada password_confirmation
	path: ["password_confirmation"], // Menandai error pada confirm_password
 });

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
}).refine((data) => data.password === data.password_confirmation, {
	message: "Passwords does not match",
		// Menandai error pada password_confirmation
	path: ["password_confirmation"], // Menandai error pada confirm_password
 });

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

export const initialValueUserManagement: z.infer<ReturnType<typeof getUserManagementSchema>> =
	{
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		role_id: "",
	}
