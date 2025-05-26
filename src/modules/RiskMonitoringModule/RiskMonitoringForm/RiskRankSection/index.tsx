import InputSelectController from "@/components/inputs/InputSelectController"
import { FormField } from "@/components/ui/form"
import { fieldsInputSeverity, zeroValueOptionSeverity } from "@/data/severity"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { SelectDataType } from "@/types/common"
import { RiskMonitoringSchemaForm } from "@/types/riskMonitoring"
import React from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
	form: UseFormReturn<RiskMonitoringSchemaForm>
}

const RiskRankSection: React.FC<IProps> = ({ isDetail, isEdit, form }) => {
	const { severity_map_options } = useSettingMatrixStore()

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
							const opts: SelectDataType[] = [
								zeroValueOptionSeverity,
								...severity_map_options.filter(
									(x) =>
										x.saverity_row_id?.toString() ===
										fieldInput.col_id?.toString()
								),
							]
							return (
								<FormField
									key={fieldInput.field2}
									control={form.control}
									name={
										fieldInput.field2 as keyof RiskMonitoringSchemaForm
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
													fieldInput.field2 as keyof RiskMonitoringSchemaForm,
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
							const opts: SelectDataType[] = [
								zeroValueOptionSeverity,
								...severity_map_options.filter(
									(x) =>
										x.saverity_row_id?.toString() ===
										fieldInput.col_id?.toString()
								),
							]

							return (
								<FormField
									key={fieldInput.field2}
									control={form.control}
									name={
										fieldInput.field2 as keyof RiskMonitoringSchemaForm
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
													fieldInput.field2 as keyof RiskMonitoringSchemaForm,
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
