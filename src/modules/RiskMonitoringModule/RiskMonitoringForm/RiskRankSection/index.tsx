import InputController from "@/components/inputs/InputController"
import { FormField } from "@/components/ui/form"
import { useDebounce } from "@/hooks/use-debounce"
import { RiskMonitoringForm } from "@/types/riskMonitoring"
import React from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
	form: UseFormReturn<RiskMonitoringForm>
}

type fieldInputType = {
	label: string
	field: keyof RiskMonitoringForm
	group: number
}

const RiskRankSection: React.FC<IProps> = ({ isDetail, isEdit, form }) => {
	const fieldsInput: fieldInputType[] = [
		{
			label: "Severity to Personnel (SP)",
			field: "sp_affected",
			group: 1,
		},

		{
			label: "Severity to Finance (SF)",
			field: "sf_affected",
			group: 1,
		},
		{
			label: "Severity to Asset (SA)",
			field: "sa_affected",
			group: 1,
		},
		{
			label: "Severity to Environment (SE)",
			field: "se_affected",
			group: 2,
		},
		{
			label: "Severity to Reputation & Legal (SRL)",
			field: "srl_affected",
			group: 2,
		},
		{
			label: "Severity to Public Notification (SPN)",
			field: "spn_affected",
			group: 2,
		},
	]

	const valuesRank = [
		Number(form.watch("sa_affected")),
		Number(form.watch("se_affected")),
		Number(form.watch("spn_affected")),
		Number(form.watch("sp_affected")),
		Number(form.watch("srl_affected")),
	]

	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})

	return (
		<div className="border-2 border-gray-200  rounded-lg p-4 space-y-4">
			<div className="text-center">
				<h5 className="text-secondary">Risk Ranking (Affected)</h5>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-4">
					{fieldsInput
						.filter((f) => f.group === 1)
						.map((fieldInput) => (
							<FormField
								key={fieldInput.field}
								control={form.control}
								name={fieldInput.field}
								render={({ field }) => (
									<InputController
										{...field}
										type="number"
										disabled={isDetail}
										label={fieldInput.label}
										placeholder={
											"Enter " + fieldInput.label
										}
										onChange={(e) => {
											const value = e.target.value
											handleChange(
												value,
												fieldInput.field
											)
										}}
									/>
								)}
							/>
						))}
				</div>
				<div className="space-y-4">
					{fieldsInput
						.filter((f) => f.group === 2)
						.map((fieldInput) => (
							<FormField
								key={fieldInput.field}
								control={form.control}
								name={fieldInput.field}
								render={({ field }) => (
									<InputController
										{...field}
										type="number"
										disabled={isDetail}
										label={fieldInput.label}
										placeholder={
											"Enter " + fieldInput.label
										}
										onChange={(e) => {
											const value = e.target.value
											handleChange(
												value,
												fieldInput.field
											)
										}}
									/>
								)}
							/>
						))}
				</div>
			</div>
		</div>
	)
}

export default RiskRankSection
