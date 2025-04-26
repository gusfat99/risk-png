import RemoveButton from "@/components/buttons/RemoveButton"
import InputComboboxController from "@/components/inputs/InputComboBoxController"
import InputController from "@/components/inputs/InputController"
import InputFileContoller from "@/components/inputs/InputFileController"
import { FormField } from "@/components/ui/form"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { RiskBankSchemaForm } from "@/types/riskDataBank"
import React, { useState } from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	form: UseFormReturn<RiskBankSchemaForm>
	isEdit?: boolean
	idxsafeguard: number
	idxConsequence: number
	handleRemoveSafeguard(idxConsequence: number, idxSafeguard: number): void
	handleChangeSafeguard(
		value: any,
		name: any,
		idxConsequence: number,
		idxsafeguard: number
	): void
}

const SafeguardFormItem: React.FC<IProps> = ({
	form,
	isEdit,
	idxsafeguard,
	idxConsequence,
	handleRemoveSafeguard,
	handleChangeSafeguard,
}) => {
	const {
		supportData: { isFetchingSupportData, safeguardItems },
   } = useRiskDataBankStore()
   const [readOnly, setReadOnly] = useState(isEdit ? true : false);

	return (
		<div
			key={idxsafeguard}
			className="border flex flex-col border-gray-300 rounded-md p-2 w-full"
		>
			<RemoveButton
				className="w-fit self-end"
				onClick={() => {
					handleRemoveSafeguard(idxConsequence, idxsafeguard)
				}}
			/>
			<div className="grid md:grid-cols-3 grid-cols-1 gap-2">
				<FormField
					control={form.control}
					name={`consequences.${idxConsequence}.safeguards.${idxsafeguard}.safeguard`}
					render={({ field }) => (
						<InputComboboxController
							selectConfig={{
								items: (safeguardItems || []).map((x) => ({
									label: x.safeguard,
									value: x.id?.toString(),
								})),
							}}
							field={field}
							disabled={isFetchingSupportData}
							label="Safeguard"
							placeholder="Select Safeguard"
							handleChange={(value, name) => {
								
								handleChangeSafeguard(
									value,
									name,
									idxConsequence,
									idxsafeguard
								)
                     }}
                     onCheckedChange={value => {
                        if (value === "select") {
                           setReadOnly(true);
                        } else {
                           setReadOnly(false);

                        }
                     }}
							placeholderCheckbox={"Create New Safeguard"}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name={`consequences.${idxConsequence}.safeguards.${idxsafeguard}.safeguard_title`}
					render={({ field }) => (
						<InputController
							{...field}
                     label="Safeguard Doucument Title"
                     readOnly={readOnly}
							placeholder="Enter Safeguard Document Title"
							onChange={(e) => {
								form.setValue(
									`consequences.${idxConsequence}.safeguards.${idxsafeguard}.safeguard_title`,
									e.target.value
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
							fileUrl={field.value as any}
							fileValidations={{
								maxSizeMb: 5,
                     }}
                     readOnly={readOnly}
							sizeInput="sm"
							onChangeHandler={(file) => {
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

export default SafeguardFormItem
