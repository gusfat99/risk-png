import InputSelectController from "@/components/inputs/InputSelectController"
import { FormField } from "@/components/ui/form"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { RiskMonitoringSchemaForm } from "@/types/riskMonitoring"
import React from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
	form: UseFormReturn<RiskMonitoringSchemaForm>
}

type fieldInputType = {
	label: string
	field: keyof RiskMonitoringSchemaForm
	group: number
	col_id?:any
}

const RiskRankSection: React.FC<IProps> = ({ isDetail, isEdit, form }) => {
	const {  severity_map_options } = useSettingMatrixStore()
	
	const fieldsInput: fieldInputType[] = [
		{
			label: "Severity to Personnel (SP)",
			field: "sp_affected",
			col_id: 1,
			group: 1,
		},

		{
			label: "Severity to Finance (SF)",
			field: "sf_affected",
			col_id: 2,
			group: 1,
		},
		{
			label: "Severity to Asset (SA)",
			field: "sa_affected",
			col_id: 3,
			group: 1,
		},
		{
			label: "Severity to Environment (SE)",
			field: "se_affected",
			col_id: 4,
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
									<InputSelectController
										field={field}
										items={severity_map_options.filter(x => x.saverity_row_id?.toString() === fieldInput.col_id?.toString() )}
										disabled={isDetail}
										label={fieldInput.label}
										placeholder={
											"Enter " + fieldInput.label
										}
										onChange={(value) => {
											form.setValue(
												fieldInput.field,
												value
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
									<InputSelectController
										field={field}
										items={severity_map_options.filter(x => x.saverity_row_id?.toString() === fieldInput.col_id?.toString() )}
										disabled={isDetail}
										label={fieldInput.label}
										placeholder={
											"Enter " + fieldInput.label
										}
										onChange={(value) => {
											form.setValue(
												fieldInput.field,
												value
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
