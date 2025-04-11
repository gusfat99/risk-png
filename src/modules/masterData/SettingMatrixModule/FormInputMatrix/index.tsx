import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { MatrixSchema } from "@/schemas/SettingMatrixSchemat"
import { MatrixSchemaForm } from "@/types/settingMatrix"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"

interface FormInputMatrixProps {
	label: string
	defaultValue?: string
	onCancel(): void
	onSubmit(value: MatrixSchemaForm): void
	isSubmitProcess : boolean
}

const FormInputMatrix: React.FC<FormInputMatrixProps> = ({
	defaultValue,
	label,
	onCancel,
	onSubmit,
	isSubmitProcess
}) => {
	
	const form = useForm<MatrixSchemaForm>({
		resolver: zodResolver(MatrixSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			value: defaultValue || "",
		},
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name={"value"}
					render={({ field }) => (
						<InputController
							defaultValue={field.value}
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
						disabled={isSubmitProcess}
						onClick={() => {
							onCancel()
						}}
						className="w-full"
					>
						Cancel
					</Button>
					<Button
						disabled={isSubmitProcess}
						className="w-full"
						variant={"secondary"}
					>
						{isSubmitProcess && <Spinner className="w-4 h-4" />}
						<Save /> Save Data
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormInputMatrix
