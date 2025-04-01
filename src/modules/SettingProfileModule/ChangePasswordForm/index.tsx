import InputWithLabel from "@/components/inputs/Input"
import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { useDebounce } from "@/hooks/use-debounce"
import {
	ChangePasswordSchema,
	PersonalInfoSchema,
} from "@/schemas/UserManagementSchema"
import {
	ChangePasswordForm as ChangePasswordProps,
	PersonalInfoForm as PersonalInfoFormProps,
} from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import AvatarDummy from "@/assets/images/dummy-avatar.png"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Spinner from "@/components/ui/spinner"
import { Save } from "lucide-react"
import useUserManagementStore from "@/store/userManagementStore"

const ChangePasswordForm = () => {
	const { isSubmit } = useUserManagementStore()
	const [visibilityPwd, setVisibilityPwd] = useState<{
		current_password: "show" | "off"
		new_password: "show" | "off"
		confirm_new_password: "show" | "off"
	}>({
		current_password: "off",
		new_password: "off",
		confirm_new_password: "off",
	})
	const form = useForm<ChangePasswordProps>({
		resolver: zodResolver(ChangePasswordSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			password: "",
			password_confirmation: "",
			current_password: "",
		},
	})

	const handleSubmit = (payload: ChangePasswordProps) => {}

	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name={"current_password"}
					render={({ field }) => (
						<InputController
							defaultValue={field.value}
							label="Old Password"
							placeholder="Enter Password"
							type={
								visibilityPwd.current_password === "show"
									? "text"
									: "password"
							}
							passwordVisible={
								visibilityPwd.current_password === "show"
							}
							onClickShuffix={() => {
								if (visibilityPwd.current_password === "show")
									setVisibilityPwd((prev) => ({
										...prev,
										current_password: "off",
									}))
								else
									setVisibilityPwd((prev) => ({
										...prev,
										current_password: "show",
									}))
							}}
							secure
							onChange={(e) => {
								handleChange(e.target.value, "current_password")
							}}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name={"password"}
					render={({ field }) => (
						<InputController
							defaultValue={field.value}
							label="New Password"
							placeholder="Enter Password"
							type={
								visibilityPwd.new_password === "show"
									? "text"
									: "password"
							}
							passwordVisible={
								visibilityPwd.new_password === "show"
							}
							onClickShuffix={() => {
								if (visibilityPwd.new_password === "show")
									setVisibilityPwd((prev) => ({
										...prev,
										new_password: "off",
									}))
								else
									setVisibilityPwd((prev) => ({
										...prev,
										new_password: "show",
									}))
							}}
							secure
							onChange={(e) => {
								handleChange(e.target.value, "password")
							}}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name={"password_confirmation"}
					render={({ field }) => (
						<InputController
							defaultValue={field.value}
							label="Confirm New Password"
							placeholder="Enter Password"
							type={
								visibilityPwd.confirm_new_password === "show"
									? "text"
									: "password"
							}
							passwordVisible={
								visibilityPwd.confirm_new_password === "show"
							}
							onClickShuffix={() => {
								if (
									visibilityPwd.confirm_new_password ===
									"show"
								)
									setVisibilityPwd((prev) => ({
										...prev,
										confirm_new_password: "off",
									}))
								else
									setVisibilityPwd((prev) => ({
										...prev,
										confirm_new_password: "show",
									}))
							}}
							secure
							onChange={(e) => {
								handleChange(
									e.target.value,
									"password_confirmation"
								)
							}}
						/>
					)}
				/>

				<div className="flex justify-end gap-4">
					<Button disabled={isSubmit} variant={"secondary"}>
						{isSubmit && <Spinner className="w-4 h-4" />}
						<Save /> Save Changes
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default ChangePasswordForm
