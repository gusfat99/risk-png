"use client"
import InputSelectController from "@/components/inputs/InputSelectController"
import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import useRiskAnalysStore from "@/store/risksAnalystStore"
import { RiskAnalysisForm } from "@/types/riksAnalyst"
import React from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	form: UseFormReturn<RiskAnalysisForm>
	isDetail?: boolean
	isEdit?: boolean
}

export const RiskDataBankSection: React.FC<IProps> = ({
	form,
	isEdit,
	isDetail,
}) => {
	const {
		supportData: {
			parameter : { parameterItems, isFetching: isFetchingParameter },
			deviation: { deviationItems, isFetching: isFetchingDeviation },
			cause: { causeItems, isFetching: isFetchingCause },
			consiquence: {
				consiquenceItems,
				isFetching: isFetchingConsiqeunce,
			},
			safeguard: { safeguardItems, isFetching: isFetchingSafeguard },
		},
		actions: { handleChangeRiskBankData },
	} = useRiskAnalysStore()


	const deviationOptions = deviationItems.map((deviation) => ({
		label: deviation.name || "", // Provide a fallback value
		value: deviation.id?.toString(),
	}))
	const causeOptions = causeItems.map((cause) => ({
		label: cause.cause,
		value: cause.id?.toString(),
	}))
	const consequenceOptions = consiquenceItems.map((consequence) => ({
		label: consequence.consequence,
		value: consequence.id?.toString(),
	}))
	const parameterOptions = parameterItems.map((parameter) => ({
		label: parameter.name || "",
		value: parameter.id?.toString(),
	}))

	return (
		<div className="border-2 border-gray-200  rounded-lg p-4 space-y-4">
			<div className="text-center">
				<h5 className="text-secondary">Risk Data Bank</h5>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-4">
					<FormField
						control={form.control}
						name={"parameter_id"}
						render={({ field }) => (
							<InputSelectController
								field={field}
								disabled={isDetail}
								loading={isFetchingParameter}
								label="Parameter"
								items={parameterOptions}
								placeholder="Select Parameter"
								onChange={(value) => {
									form.setValue("parameter_id", value)
									handleChangeRiskBankData(
										"parameter_id",
										value
									)
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"deviation_id"}
						render={({ field }) => (
							<InputSelectController
								field={field}
								disabled={isDetail}
								loading={isFetchingDeviation}
								label="Deviation"
								items={deviationOptions}
								placeholder="Select Deviation"
								onChange={(value) => {
									form.setValue("deviation_id", value)
									handleChangeRiskBankData(
										"deviation_id",
										value
									)
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"risk_bank_id"}
						render={({ field }) => (
							<InputSelectController
								field={field}
								disabled={isDetail}
								loading={isFetchingCause}
								label="Cause"
								items={causeOptions}
								placeholder="Select Cause"
								onChange={(value) => {
									form.setValue("risk_bank_id", value)
									handleChangeRiskBankData(
										"risk_bank_id",
										value
									)
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"consequence_id"}
						render={({ field }) => (
							<InputSelectController
								field={field}
								disabled={isDetail}
								loading={isFetchingConsiqeunce}
								label="Consequence"
								items={consequenceOptions}
								placeholder="Select Consequence"
								onChange={(value) => {
                           form.setValue("consequence_id", value)
                           handleChangeRiskBankData(
										"consequence_id",
										value
									)
								}}
							/>
						)}
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-sm">Existing Safeguars</Label>
					{isFetchingSafeguard && <Skeleton className="w-full h-28" />}
					{!isFetchingSafeguard && (
						<div className="border-2 border-gray-200 rounded-md p-3">
							<ul>
                        {safeguardItems.map((safeguard) => (
                           <React.Fragment key={safeguard.id}>

									<li className="text-sm" key={safeguard.id}>
										{safeguard.safeguard}
                              </li>
                              <Separator className="my-1" />
                           </React.Fragment>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
