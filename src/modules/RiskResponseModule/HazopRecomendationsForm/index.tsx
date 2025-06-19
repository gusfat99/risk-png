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
import React, { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { parseViewToPayload } from "../parsingRiskResponse"
import { useToast } from "@/hooks/use-toast"
import RemoveButton from "@/components/buttons/RemoveButton"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"

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
	const { toast } = useToast()
	const {
		actions: { createHazop, updateHazop, deleteHazop },
		nodeSelected,
		hazopItemsSelected,
		hazopDelete: { id, isFetching: isFetchingDelete },
		supportData: { isSubmitHazop },
	} = useRiskResponseStore()
	const [shownAlertDel, setShownAlertDel] = useState<{
		shown: boolean
		id: any | null
		index: any | null
	}>({ shown: false, id: null, index: null })
	const form = useForm<RiskResponseHazopMultipleSchemaForm>({
		resolver: zodResolver(RiskResponseHazopMultipleSchema),
		progressive: false,
		mode: "onChange",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			items: hazopItemsSelected
				? hazopItemsSelected.map((hazop) => ({
						...hazop,
						id: hazop.id ? String(hazop.id) : undefined,
						document_report:
							hazop.document_report ||
							(null as unknown as File | null),
				  }))
				: [],
		},
	})

	const fieldArray = useFieldArray({
		control: form.control,
		name: "items",
		keyName: "idx",
	})
	const { append, remove } = fieldArray

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

	// const handleDeleteHazopAction = () => {
	// 	deleteHazop({
	// 		nodeId,
	// 		riskId,
	// 		hazopId
	// 	})
	// }

	const onClickDeleteHazop = (
		params: {
			hazop_recom: string
			responsibility: string
			due_date: string
			document_report: File | null
			id?: string | undefined
		},
		index: any
	) => {
		setShownAlertDel({
			shown: true,
			id: params.id,
			index,
		})
	}

	const handleRemoveHazop = () => {
		if (shownAlertDel.shown && !shownAlertDel.id) {
			remove(shownAlertDel.index)
			setShownAlertDel({
				shown: false,
				id: null,
				index: null,
			})
		} else if (shownAlertDel.shown && shownAlertDel.id) {
			deleteHazop &&
				deleteHazop({
					hazopId: shownAlertDel.id || "",
					riskId: risk_analyst_id || "",
					nodeId: nodeSelected?.id || "",
					id: shownAlertDel.id,
				}).then((result) => {
					if (result) {
						remove(shownAlertDel.index)
						setShownAlertDel({
							shown: false,
							id: null,
							index: null,
						})
					}
				})
		}
	}

	const handleSubmit = async (data: RiskResponseHazopMultipleSchemaForm) => {
		try {
			if (createHazop && updateHazop) {
				if (nodeSelected?.id) {
					const payload = parseViewToPayload(data)
					let result
					if ((hazopItemsSelected?.length ?? 0) > 0) {
						result = await updateHazop(
							nodeSelected?.id,
							risk_analyst_id,
							payload
						)
					} else {
						result = await createHazop(
							nodeSelected?.id,
							risk_analyst_id,
							payload
						)
					}
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
				className="space-y-4 max-w-full  "
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<Card className="md:max-h-[620px]  max-h-[410px] overflow-y-auto">
					<CardContent className="!p-2">
						{(hazopRecomendationsWatch || []).map(
							(hazop, index) => {
								return (
									<div
										key={index}
										className="border-b mb-2 border-gray-300"
									>
										<div
											className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center"
											key={index}
										>
											<div className="col-span-2">
												<FormField
													control={form.control}
													name={`items.${index}.id`}
													render={({ field }) => (
														<input
															type="hidden"
															value={field.value}
														/>
													)}
												/>
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
																	e.target
																		.value,
																	`items.${index}.hazop_recom`
																)
															}}
															defaultValue={
																field.value
															}
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
														defaultValue={
															field.value
														}
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
														defaultValue={
															field.value
														}
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
														file={field.value}
														isShowPreview={true}
														onChange={(e) => {
															if (
																e.target.files
															) {
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
										</div>
										<div className="w-10 self-end">
											<RemoveButton
												onClick={() =>
													onClickDeleteHazop(
														hazop,
														index
													)
												}
												title="Delete"
												type="button"
											/>
										</div>
									</div>
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
			<AlertConfirmDialog
				open={shownAlertDel.shown ? true : false}
				title="Are you sure want to delete data hazop ?"
				description="deleted data cannot be revert!"
				onAction={handleRemoveHazop}
				loading={isFetchingDelete}
			/>
		</Form>
	)
}

export default HazopRecomendationsForm
