import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form"
import { MatrixSchema } from "@/schemas/SettingMatrixSchemat"
import { MatrixSchemaForm } from "@/types/settingMatrix"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React from "react"
import { Form, useForm } from "react-hook-form"

interface FormInputMatrixProps {
	label: string
	onCancel(): void
}

const FormInputMatrix: React.FC<FormInputMatrixProps> = ({
	label,
	onCancel,
}) => {
	const form = useForm({
		resolver: zodResolver(MatrixSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			value: "",
		},
	})

	const handleSubmit = (value: MatrixSchemaForm) => {}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name={"value"}
					render={() => (
						<InputController
							label={label}
							placeholder={label}
							onChange={(e) => {
								const value = e.target.value
								form.setValue("value", value)
							}}
						/>
					)}
				/>
				<div className="flex flex-row gap-2">
					<Button
						type="button"
						variant={"outline"}
						onClick={() => {
							onCancel()
						}}
					>
						Cancel
					</Button>
					<Button variant={"secondary"}>
						<Save /> Save Data
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormInputMatrix
