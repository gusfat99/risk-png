import InputWithLabel from "@/components/inputs/Input"
import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { useDebounce } from "@/hooks/use-debounce"
import { PersonalInfoSchema } from "@/schemas/UserManagementSchema"
import { PersonalInfoForm as PersonalInfoFormProps } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import AvatarDummy from "@/assets/images/dummy-avatar.png"
import React from "react"
import { useForm } from "react-hook-form"
import Spinner from "@/components/ui/spinner"
import { Save } from "lucide-react"
import useUserManagementStore from "@/store/userManagementStore"

const PersonalInfoForm = () => {
	const { isSubmit } = useUserManagementStore()
	const form = useForm<PersonalInfoFormProps>({
		resolver: zodResolver(PersonalInfoSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			email: "",
			name: "",
			profile_picture: null,
		},
	})

	const handleSubmit = (payload: PersonalInfoFormProps) => {}

	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<div className="flex flex-row gap-4 items-center">
					<div className="overflow-hidden rounded-full max-w-[110px] max-h-[110px] w-full h-full">
						<Image
							src={AvatarDummy}
							alt="avatar-pertamina-gas"
							className="overflow-hidden"
							width={110}
							height={110}
						/>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<div className="space-x-2">
							<Button variant={"secondary"}>Upload</Button>
							<Button variant={"outline"}>Reset</Button>
						</div>
						<span className="text-muted text-sm">
							Allowed .jpg or .png Max. size 800Kb
						</span>
					</div>
				</div>
				<InputWithLabel
					label="Role"
					placeholder="Role"
					value={"Super Admin"}
					readOnly
				/>
				<FormField
					control={form.control}
					name={"name"}
					render={({ field }) => (
						<InputController
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
							label="Email"
							placeholder="Enter Email"
							onChange={(e) => {
								handleChange(e.target.value, "email")
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

export default PersonalInfoForm
