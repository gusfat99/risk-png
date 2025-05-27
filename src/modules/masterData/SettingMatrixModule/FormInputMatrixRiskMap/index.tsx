import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { MatrixRiskMapSchema } from "@/schemas/SettingMatrixSchemat"
import { MatrixRiskMapSchemaForm } from "@/types/settingMatrix"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { Sketch } from "@uiw/react-color"

interface FormInputMatrixRiskMapProps {
	label: string
	defaultValue?: {
		value: string
		color: string
	}
	onCancel(): void
	onSubmit(value: MatrixRiskMapSchemaForm): void
	isSubmitProcess: boolean
}

const FormInputMatrixRiskMap: React.FC<FormInputMatrixRiskMapProps> = ({
	defaultValue,
	label,
	onCancel,
	onSubmit,
	isSubmitProcess,
}) => {
	const form = useForm<MatrixRiskMapSchemaForm>({
		resolver: zodResolver(MatrixRiskMapSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			value: defaultValue?.value?.toString() || "",
			color: defaultValue?.color,
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
							{...field}
							label={label}
							placeholder={label}
							onChange={(e) => {
								const value = e.target.value
								form.setValue("value", value)
							}}
						/>
					)}
				/>
				<Sketch
					color={form.getValues("color")}
					onChange={(color) => {
						form.setValue("color", color.hex)
					}}
				/>

				<FormField
					control={form.control}
					name={"color"}
					render={({ field }) => (
						<InputController
							{...field}
							label={"Color"}
							placeholder={"Ex. #FAFAFA"}
							onChange={(e) => {
								const value = e.target.value
								form.setValue("color", value)
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

export default FormInputMatrixRiskMap
