import InputSelectController from "@/components/inputs/InputSelectController"
import { FormField } from "@/components/ui/form"
import { fieldsInputSeverity } from "@/data/severity"
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
	col_id?: any
}

const RiskRankSection: React.FC<IProps> = ({ isDetail, isEdit, form }) => {
	const { severity_map_options } = useSettingMatrixStore()

	const valuesRank = [
		Number(form.watch("sa_affected")),
		Number(form.watch("se_affected")),
		Number(form.watch("spn_affected")),
		Number(form.watch("sp_affected")),
		Number(form.watch("srl_affected")),
		Number(form.watch("spn_affected")),
	]

	return (
		<div className="border-2 border-gray-200  rounded-lg p-4 space-y-4">
			<div className="text-center">
				<h5 className="text-secondary">Risk Ranking (Affected)</h5>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-4">
					{fieldsInputSeverity
						.filter((f) => f.group === 1)
						.map((fieldInput) => {
							const opts = severity_map_options.filter(
								(x) =>
									x.saverity_row_id?.toString() ===
									fieldInput.col_id?.toString()
							)

							return (
								<FormField
									key={fieldInput.field}
									control={form.control}
									name={
										fieldInput.field as keyof RiskMonitoringSchemaForm
									}
									render={({ field }) => (
										<InputSelectController
											field={field}
											items={opts}
											disabled={isDetail}
											label={fieldInput.label}
											placeholder={
												"Enter " + fieldInput.label
											}
											onChange={(value) => {
												form.setValue(
													fieldInput.field as keyof RiskMonitoringSchemaForm,
													value
												)
											}}
										/>
									)}
								/>
							)
						})}
				</div>
				<div className="space-y-4">
					{fieldsInputSeverity
						.filter((f) => f.group === 2)
						.map((fieldInput) => {
							const opts = severity_map_options.filter(
								(x) =>
									x.saverity_row_id?.toString() ===
									fieldInput.col_id?.toString()
							)
							return (
								<FormField
									key={fieldInput.field}
									control={form.control}
									name={
										fieldInput.field as keyof RiskMonitoringSchemaForm
									}
									render={({ field }) => (
										<InputSelectController
											field={field}
											items={opts}
											disabled={isDetail}
											label={fieldInput.label}
											placeholder={
												"Enter " + fieldInput.label
											}
											onChange={(value) => {
												form.setValue(
													fieldInput.field as keyof RiskMonitoringSchemaForm,
													value
												)
											}}
										/>
									)}
								/>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default RiskRankSection
