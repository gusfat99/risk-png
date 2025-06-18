import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useDebounce } from "@/hooks/use-debounce"
import { useToast } from "@/hooks/use-toast"
import { ParameterSchema } from "@/schemas/ParameterSchema"
import useParameterStore from "@/store/parameterStore"
import { ParameterSchemaForm } from "@/types/parameter"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"

interface IProps {
	parameterName?: string
	id?: any
	isEdit?: boolean
	afterSaveSuccesfull?: () => void
}

const ParameterForm: React.FC<IProps> = ({
	parameterName = "",
	id,
	isEdit = false,
	afterSaveSuccesfull,
}) => {
	const { toast } = useToast()
	const {
		actions: { createData, updateData },
		isSubmit,
	} = useParameterStore()

	const form = useForm<ParameterSchemaForm>({
		resolver: zodResolver(ParameterSchema),
		progressive: false,
		mode: "onChange",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			name: parameterName,
		},
	})

	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})

	const handleSubmit = async (data: ParameterSchemaForm) => {
		try {
			if (createData && updateData) {
				if (isEdit && id) {
					const result = await updateData(id, data)
					if (result) {
						toast({
							title: result.message ?? "",
							variant: "success",
						})
						afterSaveSuccesfull && afterSaveSuccesfull()
               }
				} else {
					const result = await createData(data)
					if (result) {
						toast({
							title: result.message ?? "",
							variant: "success",
						})
						afterSaveSuccesfull && afterSaveSuccesfull()
					}
				}
			} else {
				throw new Error("Function not founded")
			}
		} catch (error) {}
	}

	return (
		<Form {...form}>
			<form
				className="space-y-4 max-w-full  "
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<Card className="md:max-h-[620px]  max-h-[410px] overflow-y-auto">
					<CardContent className="!p-2">
						<FormField
							control={form.control}
							name={`name`}
							render={({ field }) => (
								<InputController
									label="Parameter Name"
									placeholder="Enter Parameter"
									onChange={(e) => {
										handleChange(e.target.value, `name`)
									}}
									defaultValue={field.value}
								/>
							)}
						/>
					</CardContent>
				</Card>
				<div className="col-span-5 flex justify-end">
					<Button disabled={isSubmit} variant={"secondary"}>
						{isSubmit ? (
							<Spinner className="w-4 h-4" />
						) : (
							<Save />
						)}
						Save
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default ParameterForm
