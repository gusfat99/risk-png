"use client"
import InputController from "@/components/inputs/InputController"
import InputSelectController from "@/components/inputs/InputSelectController"
import { FormField } from "@/components/ui/form"
import { useDebounce } from "@/hooks/use-debounce"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { RiskMonitoringSchemaForm } from "@/types/riskMonitoring"
import React from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	form: UseFormReturn<RiskMonitoringSchemaForm>
	isDetail?: boolean
	isEdit?: boolean
}

const RiskDataBankSection: React.FC<IProps> = ({ form, isEdit, isDetail }) => {
	const {
		supportData: {
			node: { nodeItems, isFetching: isFetchingNode },
			deviation: { deviationItems, isFetching: isFetchingDeviation },
			parameter: { parameterItems, isFetching: isFetchingParameter },
			cause: { causeItems, isFetching: isFetchingCause },
		},
		actions: { handleChangeRiskMonitoringData },
	} = useRiskMonitoringStore()
	const nodeOptions = nodeItems.map((node) => ({
		label: node.node || "", // Provide a fallback value
		value: node.id?.toString(),
	}))

	const parameterOptions = parameterItems.map((parameter) => ({
		label: parameter.name || "", // Provide a fallback value
		value: parameter.id?.toString(),
	}))
	const deviationOptions = deviationItems.map((deviation) => ({
		label: deviation.name || "", // Provide a fallback value
		value: deviation.id?.toString(),
	}))
	const causeOptions = causeItems.map((cause) => ({
		label: cause.cause,
		value: cause.id?.toString(),
	}))

	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})

	return (
		<div className="border-2 border-gray-200  rounded-lg p-4 space-y-4">
			<div className="text-center">
				<h5 className="text-secondary">Risk Data Bank</h5>
			</div>
			<div className="grid grid-cols-1 gap-4">
				<div className="space-y-4">
					<FormField
						control={form.control}
						name={"node_id"}
						render={({ field }) => (
							<InputSelectController
								field={field}
								disabled={isDetail}
								loading={isFetchingNode}
								label="Node"
								items={nodeOptions}
								placeholder="Select Node"
								onChange={(value) => {
									form.setValue("node_id", value)
								}}
							/>
						)}
					/>
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
									handleChangeRiskMonitoringData(
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
									handleChangeRiskMonitoringData(
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
									handleChangeRiskMonitoringData(
										"risk_bank_id",
										value
									)
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"incident_name"}
						render={({ field }) => (
							<InputController
								defaultValue={field.value}
								readOnly={isDetail}
								label="Incident Name"
								placeholder="Enter Incident Name"
								onChange={(e) => {
									const value = e.target.value
									handleChange(value, "incident_name")
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"incident_location"}
						render={({ field }) => (
							<InputController
								defaultValue={field.value}
								readOnly={isDetail}
								label="Incident Location"
								placeholder="Enter Incident Location"
								onChange={(e) => {
									const value = e.target.value
									handleChange(value, "incident_location")
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"incident_trigger"}
						render={({ field }) => (
							<InputController
								defaultValue={field.value}
								readOnly={isDetail}
								label="Incident Trigger"
								placeholder="Enter Incident Trigger"
								onChange={(e) => {
									const value = e.target.value
									handleChange(value, "incident_trigger")
								}}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	)
}

export default RiskDataBankSection
