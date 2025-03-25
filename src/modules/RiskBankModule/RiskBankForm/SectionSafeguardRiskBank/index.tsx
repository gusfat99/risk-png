import AddButton from "@/components/buttons/AddButton"
import RemoveButton from "@/components/buttons/RemoveButton"
import InputController from "@/components/inputs/InputController"
import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RiskBankSchema } from "@/schemas/RiskBankSchema"
import React from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface IProps {
	form: UseFormReturn<z.infer<typeof RiskBankSchema>>
	isDetail?: boolean
	isEdit?: boolean
}

const SectionSafeguardRiskBank: React.FC<IProps> = ({ form }) => {
	const consequences = form.watch("consequences")
	const fieldArrayConsequences = useFieldArray({
		control: form.control,
		name: "consequences",
		keyName: "idx",
	})
  const { remove: removeConsequence, update : updateConsequence } = fieldArrayConsequences
  
  const handleAddSafeguard = (idxConsequences: number) => {
		const consequencesCopy = [...consequences];
		let safeguard = consequencesCopy[idxConsequences].safeguards;
		safeguard = [
			...safeguard,
			{
				safeguard: "",
				safeguard_title: "",
			},
		]
		updateConsequence(idxConsequences, {
			...consequencesCopy[idxConsequences],
			safeguards : safeguard
		});
		
	}
	return (
		<div className="border rounded-lg border-gray-200 p-3">
			<Label className="font-semibold">Safeguards :</Label>
			<div className="mt-2 space-y-4">
				{consequences.map((consequence, idxConsequence) => {
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
								<AddButton label="Add Safeguards" onClick={() => handleAddSafeguard(idxConsequence)} />
							</div>
							<RemoveButton
								size={"sm"}
								className="absolute -top-4 right-0"
								disabled={consequences.length === 1}
								onClick={() => {
									removeConsequence(idxConsequence)
								}}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SectionSafeguardRiskBank
