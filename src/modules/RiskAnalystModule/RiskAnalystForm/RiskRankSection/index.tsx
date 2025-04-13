import InputController from "@/components/inputs/InputController"
import InputSelectController from "@/components/inputs/InputSelectController"
import { FormField } from "@/components/ui/form"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { RiskAnalysisForm } from "@/types/riksAnalyst"
import { Separator } from "@radix-ui/react-select"
import React, { useMemo } from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
	form: UseFormReturn<RiskAnalysisForm>
}

type fieldInputType = {
	label: string
	field: keyof RiskAnalysisForm
	group: number
	col_id?: any
}

const RiskRankSection: React.FC<IProps> = ({ isDetail, isEdit, form }) => {
	const { likelyhood_options, severity_map_options } = useSettingMatrixStore()

	const fieldsInput: fieldInputType[] = [
		{
			label: "Severity to Personnel (SP)",
			field: "sp_current",
			col_id: 1,
			group: 1,
		},

		{
			label: "Severity to Finance (SF)",
			field: "sf_current",
			col_id: 2,
			group: 1,
		},
		{
			label: "Severity to Asset (SA)",
			field: "sa_current",
			col_id: 3,
			group: 1,
		},
		{
			label: "Severity to Environment (SE)",
			field: "se_current",
			col_id: 4,
			group: 2,
		},
		{
			label: "Severity to Reputation & Legal (SRL)",
			field: "srl_current",
			col_id: 5,
			group: 2,
		},
		{
			label: "Severity to Public Notification (SPN)",
			field: "spn_current",
			col_id: 6,
			group: 2,
		},
	]

	const valuesRank = [
		Number(form.watch("sa_current")),
		Number(form.watch("se_current")),
		Number(form.watch("spn_current")),
		Number(form.watch("sp_current")),
		Number(form.watch("srl_current")),
		Number(form.watch("l_frequency_current")),
	]

	const riskRankValue = useMemo(() => {
		// Konversi semua nilai ke number
		const valuesRankCopy = [...valuesRank]
		valuesRankCopy.splice(valuesRank.length - 1, 1) //remove l_frequency_current

		// Cari nilai tertinggi
		const maxValue = Math.max(...valuesRankCopy)
		// Kalikan dengan l_frequency_current
		const riskRankValue =
			maxValue * Number(form.getValues("l_frequency_current"))
		// form.setValue('risk_rank', riskRankValue?.toString());
		return riskRankValue
	}, [form])

	return (
		<div className="border-2 border-gray-200  rounded-lg p-4 space-y-4">
			<div className="text-center">
				<h5 className="text-secondary">Initial Risk Ranking</h5>
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
							{...field}
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
