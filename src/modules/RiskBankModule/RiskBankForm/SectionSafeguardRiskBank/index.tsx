import AddButton from "@/components/buttons/AddButton"
import RemoveButton from "@/components/buttons/RemoveButton"
import InputComboboxController from "@/components/inputs/InputComboBoxController"
import InputController from "@/components/inputs/InputController"
import InputFileContoller from "@/components/inputs/InputFileController"
import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RiskBankSchema } from "@/schemas/RiskBankSchema"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import React from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface IProps {
	form: UseFormReturn<z.infer<typeof RiskBankSchema>>
	isDetail?: boolean
	isEdit?: boolean
}

const SectionSafeguardRiskBank: React.FC<IProps> = ({
	form,
	isDetail,
	isEdit,
}) => {
	const consequences = form.watch("consequences")
	const fieldArrayConsequences = useFieldArray({
		control: form.control,
		name: "consequences",
		keyName: "idx",
	})
	const { remove: removeConsequence, update: updateConsequence } =
		fieldArrayConsequences
	const {
		supportData: { isFetchingSupportData, safeguardItems },
	} = useRiskDataBankStore()

	const handleAddSafeguard = (idxConsequences: number) => {
		const consequencesCopy = [...consequences]
		let safeguard = consequencesCopy[idxConsequences].safeguards || []
		safeguard = [
			...safeguard,
			{
				safeguard: "",
				safeguard_title: "",
			},
		]
		updateConsequence(idxConsequences, {
			...consequencesCopy[idxConsequences],
			safeguards: safeguard,
		})
	}

	const handleRemoveSafeguard = (
		idxConsequences: number,
		idxSafeguard: number
	) => {
		const consequencesCopy = [...consequences]
		let safeguard = consequencesCopy[idxConsequences].safeguards || []

		safeguard = safeguard.filter((_, i) => i !== idxSafeguard)
		updateConsequence(idxConsequences, {
			...consequencesCopy[idxConsequences],
			safeguards: safeguard,
		})
	}

	const handleChangeSafeguard = (
		value: any,
		name: any,
		idxConsequence: number,
		idxsafeguard: number
	) => {
		const regex = /^-?\d+$/
		//check is number/id
		if (regex.test(value)) {
			const safeguardSelected = safeguardItems?.find(
				(x) => x.id?.toString() === value
			)

			if (safeguardSelected) {
				form.setValue(
					`consequences.${idxConsequence}.safeguards.${idxsafeguard}.safeguard`,
					value?.toString()
				)
				form.setValue(
					`consequences.${idxConsequence}.safeguards.${idxsafeguard}.safeguard_title`,
					safeguardSelected.safeguard_title
				)
				form.setValue(
					`consequences.${idxConsequence}.safeguards.${idxsafeguard}.file_path`,
					safeguardSelected.file_path
				)
			}
		} else {
			form.setValue(name, value)
		}
	}
	console.log({values : form.getValues('consequences')})

	return (
		<div className="border rounded-lg border-gray-200 p-3">
			<Label className="font-semibold">Safeguards :</Label>
			<div className="mt-2 space-y-4">
				{(consequences || []).map((consequence, idxConsequence) => {
		
					return (
						<div
							key={idxConsequence}
							className="border rounded-lg border-gray-200 p-4 space-y-4 relative"
						>
							<FormField
								control={form.control}
								name={`consequences.${idxConsequence}.consequence`}
								render={({ field }) => (
									<InputController
										{...field}
										readOnly={true}
										label="Consequence"
										placeholder="Enter Consequence"
									/>
								)}
							/>
							<div className="flex flex-row justify-between items-center">
								<Label className="font-semibold">
									Safeguards Data
								</Label>
								{!isDetail && (
									<AddButton
										label="Add Safeguards"
										onClick={() =>
											handleAddSafeguard(idxConsequence)
										}
									/>
								)}
							</div>
							{(consequence?.safeguards || []).map(
								(safeguard, idxsafeguard) => {
									return (
										<div
											key={idxsafeguard}
											className="border flex flex-col border-gray-300 rounded-md p-2"
										>
											{!isDetail && (
												<RemoveButton
													className="w-fit self-end"
													onClick={() => {
														handleRemoveSafeguard(
															idxConsequence,
															idxsafeguard
														)
													}}
												/>
											)}
											<div className="grid md:grid-cols-3 grid-cols-1 gap-2">
												<FormField
													control={form.control}
													name={`consequences.${idxConsequence}.safeguards.${idxsafeguard}.safeguard`}
													render={({ field }) => (
														<InputComboboxController
															selectConfig={{
																items: (
																	safeguardItems ||
																	[]
																).map((x) => ({
																	label: x.safeguard,
																	value: x.id?.toString(),
																})),
															}}
															field={field}
															readOnly={isDetail}
															disabled={
																isFetchingSupportData ||
																isDetail
															}
															label="Safeguard"
															placeholder="Select Safeguard"
															handleChange={(
																value,
																name
															) => {
																handleChangeSafeguard(
																	value,
																	name,
																	idxConsequence,
																	idxsafeguard
																)
															}}
															placeholderCheckbox={
																"Create New Safeguard"
															}
														/>
													)}
												/>
											
												<FormField
													control={form.control}
													name={`consequences.${idxConsequence}.safeguards.${idxsafeguard}.safeguard_title`}
													render={({ field }) => (
														<InputController
															defaultValue={field.value}
															readOnly={isDetail}
															label="Safeguard Doucument Title"
															placeholder="Enter Safeguard Document Title"
															onChange={(e) => {
																form.setValue(
																	`consequences.${idxConsequence}.safeguards.${idxsafeguard}.safeguard_title`,
																	e.target
																		.value
																)
															}}
														/>
													)}
												/>
												<FormField
													control={form.control}
													name={`consequences.${idxConsequence}.safeguards.${idxsafeguard}.file_path`}
													render={({ field }) => (
														<InputFileContoller
															label="Safeguard Document"
															isRequired
															readOnly={isDetail}
															fileUrl={
																field.value as any
															}
															fileValidations={{
																maxSizeMb: 5,
															}}
															sizeInput="sm"
															onChangeHandler={(
																file
															) => {
																if (file) {
																	form.setValue(
																		`consequences.${idxConsequence}.safeguards.${idxsafeguard}.file_path`,
																		file
																	)
																} else {
																	form.setValue(
																		`consequences.${idxConsequence}.safeguards.${idxsafeguard}.file_path`,
																		undefined as any
																	)
																}
															}}
														/>
													)}
												/>
											</div>
										</div>
									)
								}
							)}
							{!isDetail && (
								<RemoveButton
									size={"sm"}
									className="absolute -top-4 right-0"
									disabled={consequences.length === 1}
									onClick={() => {
										removeConsequence(idxConsequence)
									}}
								/>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SectionSafeguardRiskBank
