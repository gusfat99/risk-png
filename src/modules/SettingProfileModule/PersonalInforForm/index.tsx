import InputWithLabel from "@/components/inputs/Input"
import InputController from "@/components/inputs/InputController"
import UploadAvatar from "@/components/inputs/UploadAvatar"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useDebounce } from "@/hooks/use-debounce"
import { PersonalInfoSchema } from "@/schemas/UserManagementSchema"
import useAuthStore from "@/store/authStore"
import useUserManagementStore from "@/store/userManagementStore"
import { PersonalInfoForm as PersonalInfoFormProps } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"

const PersonalInfoFormSkeleton = () => {
	return (
		<div className="space-y-4">
			<UploadAvatar.Skeleton />
			<InputWithLabel
				label="Role"
				placeholder="Role"
				readOnly
				isRequired={false}
				loading={true}
			/>
			<InputWithLabel
				label="Name"
				placeholder="Name"
				readOnly
				isRequired={false}
				loading={true}
			/>
			<InputWithLabel
				label="Email"
				placeholder="Email"
				readOnly
				isRequired={false}
				loading={true}
			/>
		</div>
	)
}

interface PersonalInfoFormComponent extends React.FC<{}> {
	Skeleton: typeof PersonalInfoFormSkeleton
}

const PersonalInfoForm: PersonalInfoFormComponent = () => {
	const {
		isSubmit,
		actions: { updateMyPersonalInfo },
	} = useUserManagementStore()
	const { user } = useAuthStore()
	const form = useForm<PersonalInfoFormProps>({
		resolver: zodResolver(PersonalInfoSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			email: user?.email || "",
			name: user?.name || "",
			profile_picture: user?.profile_picture,
		},
	})

	const handleSubmit = (payload: PersonalInfoFormProps) => {
		updateMyPersonalInfo && updateMyPersonalInfo(payload)
	}

	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})

	const handleAvatarChange = (file: File | null) => {
		if (file) {
			form.setValue("profile_picture", file)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<UploadAvatar
					defaultValue={form.getValues("profile_picture")}
					handleChange={handleAvatarChange}
				/>

				<InputWithLabel
					label="Role"
					placeholder="Role"
					value={user?.role}
					readOnly
					isRequired={false}
				/>
				<FormField
					control={form.control}
					name={"name"}
					render={({ field }) => (
						<InputController
							defaultValue={field.value}
							loading={!user}
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
							loading={!user}
							defaultValue={field.value}
							placeholder="Enter Email"
							onChange={(e) => {
								handleChange(e.target.value, "email")
							}}
						/>
					)}
				/>
				<div className="flex justify-end gap-4">
					<Button disabled={isSubmit || !user} variant={"secondary"}>
						{isSubmit && <Spinner className="w-4 h-4" />}
						{!isSubmit && <Save />}
						Save Changes
					</Button>
				</div>
			</form>
		</Form>
	)
}

PersonalInfoForm.Skeleton = PersonalInfoFormSkeleton

export default PersonalInfoForm
