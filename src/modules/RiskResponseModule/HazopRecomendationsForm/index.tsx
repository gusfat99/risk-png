import AddButton from "@/components/buttons/AddButton"
import InputController from "@/components/inputs/InputController"
import InputFileOriginController from "@/components/inputs/InputFileOriginController"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useDebounce } from "@/hooks/use-debounce"
import { RiskResponseHazopMultipleSchema } from "@/schemas/RiskResponseSchema"
import useRiskResponseStore from "@/store/riskResponseStore"
import { RiskResponseHazopMultipleSchemaForm } from "@/types/riskResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { parseViewToPayload } from "../parsingRiskResponse"
import { useToast } from "@/hooks/use-toast"

interface IProps {
	params: {
		risk_analyst_id: any | null
		hazop_id?: any
	}
	afterSaveSuccesfull?: () => void
}

const HazopRecomendationsForm: React.FC<IProps> = ({
	params: { risk_analyst_id, hazop_id },
	afterSaveSuccesfull,
}) => {
	const { toast } = useToast();
	const {
		actions: { createHazop },
		nodeSelected,
		supportData: { isSubmitHazop },
	} = useRiskResponseStore()
	const form = useForm<RiskResponseHazopMultipleSchemaForm>({
		resolver: zodResolver(RiskResponseHazopMultipleSchema),
		progressive: false,
		mode: "onChange",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			items: [],
		},
	})

	const fieldArray = useFieldArray({
		control: form.control,
		name: "items",
		keyName: "idx",
	})
	const { append } = fieldArray

	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})

	const handleAddHazop = () => {
		append({
			responsibility: "",
			hazop_recom: "",
			due_date: "",
			document_report: null as unknown as File | null,
		})
	}

	const handleSubmit = async (data: RiskResponseHazopMultipleSchemaForm) => {
		try {
			if (createHazop) {
				if (nodeSelected?.id) {
					const payload = parseViewToPayload(data)
					const result = await createHazop(
						nodeSelected?.id,
						risk_analyst_id,
						payload,
						
					)
					if (result) {
						toast({
							title: result.message ?? "",
							variant: "success",
						})
						afterSaveSuccesfull && afterSaveSuccesfull()
					}
				} else {
					throw new Error("Node not Selected yet")
				}
			} else {
				throw new Error("Function not founded")
			}
		} catch (error) {}
	}

	const hazopRecomendationsWatch = form.watch("items")

	return (
		<Form {...form}>
			<form
				className="space-y-4 max-w-full "
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<Card>
					<CardContent className="!p-2 grid grid-cols-2 md:grid-cols-5 gap-4">
						{(hazopRecomendationsWatch || []).map(
							(hazop, index) => {
								return (
									<React.Fragment key={index}>
										<div className="col-span-2">
											<FormField
												control={form.control}
												name={`items.${index}.hazop_recom`}
												render={({ field }) => (
													<InputController
														className="col-span-2"
														label="Hazop Recomendation"
														placeholder="Enter Hazop Recomendation"
														onChange={(e) => {
															handleChange(
																e.target.value,
																`items.${index}.hazop_recom`
															)
														}}
													/>
												)}
											/>
										</div>
										<FormField
											control={form.control}
											name={`items.${index}.responsibility`}
											render={({ field }) => (
												<InputController
													label="Responsibility"
													placeholder="Enter Responsibility"
													onChange={(e) => {
														handleChange(
															e.target.value,
															`items.${index}.responsibility`
														)
													}}
												/>
											)}
										/>
										<FormField
											control={form.control}
											name={`items.${index}.due_date`}
											render={({ field }) => (
												<InputController
													label="Due Date"
													type="date"
													placeholder="Enter Due Date"
													onChange={(e) => {
														handleChange(
															e.target.value,
															`items.${index}.due_date`
														)
													}}
												/>
											)}
										/>
										<FormField
											control={form.control}
											name={`items.${index}.document_report`}
											render={({ field }) => (
												<InputFileOriginController
													label="Document Report"
													description="Only xlsx, pdf, doc files, Max. File size: 5 Mb"
													placeholder="Document Report"
													accept=".pdf, .xls, .xlsx, .doc, .docx"
													onChange={(e) => {
														if (e.target.files) {
															handleChange(
																e.target
																	.files[0],
																`items.${index}.document_report`
															)
														}
													}}
												/>
											)}
										/>
									</React.Fragment>
								)
							}
						)}

						<div className="col-span-5 flex justify-end">
							<AddButton
								label="Add Recomendation"
								onClick={() => {
									handleAddHazop()
								}}
							/>
						</div>
					</CardContent>
				</Card>
				<div className="col-span-5 flex justify-end">
					<Button disabled={isSubmitHazop} variant={"secondary"}>
						{isSubmitHazop ? (
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

export default HazopRecomendationsForm
