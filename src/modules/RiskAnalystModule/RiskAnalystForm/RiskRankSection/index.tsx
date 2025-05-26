import InputController from "@/components/inputs/InputController"
import InputSelectController from "@/components/inputs/InputSelectController"
import { FormField } from "@/components/ui/form"
import { fieldsInputSeverity, zeroValueOptionSeverity } from "@/data/severity"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { SelectDataType } from "@/types/common"
import { RiskAnalysisForm } from "@/types/riksAnalyst"
import { Separator } from "@radix-ui/react-select"
import React from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
	form: UseFormReturn<RiskAnalysisForm>
}

const RiskRankSection: React.FC<IProps> = ({ isDetail, isEdit, form }) => {
	const { likelyhood_options, severity_map_options } = useSettingMatrixStore()

	const valuesRank = [
		Number(form.watch("sa_current")),
		Number(form.watch("se_current")),
		Number(form.watch("spn_current")),
		Number(form.watch("sp_current")),
		Number(form.watch("srl_current")),
		Number(form.watch("l_frequency_current")),
	]

	// Konversi semua nilai ke number
	const valuesRankCopy = [...valuesRank]
	valuesRankCopy.splice(valuesRank.length - 1, 1) //remove l_frequency_current

	// Cari nilai tertinggi
	const maxValue = Math.max(...valuesRankCopy)
	// Kalikan dengan l_frequency_current
	const riskRankValue =
		maxValue * Number(form.getValues("l_frequency_current"))

	return (
		<div className="border-2 border-gray-200  rounded-lg p-4 space-y-4">
			<div className="text-center">
				<h5 className="text-secondary">Initial Risk Ranking</h5>
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
									key={fieldInput.field}
									control={form.control}
									name={
										fieldInput.field as keyof RiskAnalysisForm
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
													fieldInput.field as keyof RiskAnalysisForm,
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
									key={fieldInput.field}
									control={form.control}
									name={
										fieldInput.field as keyof RiskAnalysisForm
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
													fieldInput.field as keyof RiskAnalysisForm,
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
			<Separator
				hidden={false}
				className="h-[2px] border border-gray-200"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					control={form.control}
					name={"l_frequency_current"}
					render={({ field }) => (
						<InputSelectController
							field={field}
							items={likelyhood_options}
							disabled={isDetail}
							label={"Likelyhood Frequency Kejadian (L)"}
							placeholder={
								"Enter Likelyhood Frequency Kejadian (L)"
							}
							onChange={(value) => {
								form.setValue("l_frequency_current", value)
							}}
						/>
					)}
				/>

				<FormField
					key={"risk"}
					control={form.control}
					name={"risk_rank"}
					render={({ field }) => (
						<InputController
							value={riskRankValue}
							label="Risk Rank"
							readOnly
							placeholder={"Risk Rank"}
						/>
					)}
				/>
			</div>
		</div>
	)
}

export default RiskRankSection
