"use client"
import InputController from "@/components/inputs/InputController"
import InputSelectController from "@/components/inputs/InputSelectController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useDebounce } from "@/hooks/use-debounce"
import { useToast } from "@/hooks/use-toast"
import {
	initialValueUserManagement,
	UserManagementSchema,
} from "@/schemas/UserManagementSchema"
import useUserManagementStore from "@/store/userManagementStore"
import { UserManagementForm } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

interface IProps {
	isEdit?: boolean
	isDetail?: boolean
}

const ManagementUserForm: React.FC<IProps> = ({ isEdit, isDetail }) => {
	const {
		isSubmit,
		userRoleItems,
		actions: { createData, updateData },
	} = useUserManagementStore()
	const [visibilityPwd, setVisibilityPwd] = useState<{
		password: "show" | "off"
		confirm_password: "show" | "off"
	}>({
		password: "off",
		confirm_password: "off",
	})
	const { toast } = useToast()
	const route = useRouter()
	const pathname = usePathname()
	const params = useParams<{ id: any }>()
	const splitPathname = pathname.split("/")
	const basePathname = "/".concat(splitPathname[1])

	const userRolesOptions = userRoleItems.map((role) => ({
		label: role.name,
		value: role.id,
	}))

	const form = useForm<UserManagementForm>({
		resolver: zodResolver(UserManagementSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: initialValueUserManagement,
	})

	const handleSubmit = async (values: UserManagementForm) => {
		try {
			if (createData && !params?.id && !isEdit) {
				const result = await createData(values)

				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset(initialValueUserManagement)
					route.replace(basePathname)
				} else {
					throw new Error("Failed")
				}
			} else if (updateData && params.id && isEdit) {
				const result = await updateData(params?.id, values)

				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset(initialValueUserManagement)
					route.replace(basePathname)
				} else {
					throw new Error("Failed")
				}
			}
		} catch (error) {
			toast({
				title:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
				variant: "destructive",
			})
		}
	}

	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<FormField
						control={form.control}
						name={"name"}
						render={({ field }) => (
							<InputController
								defaultValue={field.value}
								readOnly={isDetail}
								label="Name"
								placeholder="Enter Name"
								onChange={(e) => {
									handleChange(e.target.value, "name")
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"email"}
						render={({ field }) => (
							<InputController
								readOnly={isDetail}
								defaultValue={field.value}
								label="Email"
								placeholder="Enter Email"
								onChange={(e) => {
									handleChange(e.target.value, "email")
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
								readOnly={isDetail}
								label="Enter Password"
								placeholder="Enter Password"
								type={
									visibilityPwd.password === "show"
										? "text"
										: "password"
								}
								passwordVisible={
									visibilityPwd.password === "show"
								}
								onClickShuffix={() => {
									if (visibilityPwd.password === "show")
										setVisibilityPwd((prev) => ({
											...prev,
											password: "off",
										}))
									else
										setVisibilityPwd((prev) => ({
											...prev,
											password: "show",
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
								readOnly={isDetail}
								label="Confirm Password"
								placeholder="Enter Confirm Password"
								type={
									visibilityPwd.confirm_password === "show"
										? "text"
										: "password"
								}
								passwordVisible={
									visibilityPwd.confirm_password === "show"
								}
								onClickShuffix={() => {
									if (
										visibilityPwd.confirm_password ===
										"show"
									)
										setVisibilityPwd((prev) => ({
											...prev,
											confirm_password: "off",
										}))
									else
										setVisibilityPwd((prev) => ({
											...prev,
											confirm_password: "show",
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
				</div>
				<FormField
					control={form.control}
					name={"role_id"}
					render={({ field }) => (
						<InputSelectController
							field={field}
							disabled={isDetail}
							loading={false}
							label="Role"
							items={userRolesOptions}
							placeholder="Select Role"
							onChange={(value) => {
								form.setValue("role_id", value)
							}}
						/>
					)}
				/>
				{!isDetail && (
					<div className="flex justify-end gap-4">
						<Link href={basePathname}>
							{" "}
							<Button variant={"outline"} disabled={isSubmit}>
								Cancel
							</Button>
						</Link>
						<Button disabled={isSubmit} variant={"secondary"}>
							{isSubmit && <Spinner className="w-4 h-4" />}
							<Save /> Save Data
						</Button>
					</div>
				)}
			</form>
		</Form>
	)
}

export default ManagementUserForm
