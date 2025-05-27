"use client"
import InputController from "@/components/inputs/InputController"
import InputFileOriginController from "@/components/inputs/InputFileOriginController"
import { FormField } from "@/components/ui/form"
import { useDebounce } from "@/hooks/use-debounce"
import { RiskMonitoringSchemaForm } from "@/types/riskMonitoring"
import React from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
	form: UseFormReturn<RiskMonitoringSchemaForm>
	isDetail?: boolean
	isEdit?: boolean
}

const RiskIncidentSection: React.FC<IProps> = ({ form, isEdit, isDetail }) => {
	const handleChange = useDebounce((value: any, name: any) => {
		form.setValue(name, value)
	})

	return (
		<div className="border-2 border-gray-200  rounded-lg p-4 space-y-4">
			<div className="text-center">
				<h5 className="text-secondary">Risk Incident</h5>
			</div>
			<div className="grid grid-cols-1 gap-4">
				<div className="space-y-4">
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name={"incident_date"}
						render={({ field }) => (
							<InputController
								defaultValue={field.value}
								readOnly={isDetail}
								type="date"
								label="Incident Date"
								placeholder="Select Incident Date"
								onChange={(e) => {
									const value = e.target.value
									handleChange(value, "incident_date")
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"incident_time"}
						render={({ field }) => (
							<InputController
								type="time"
								defaultValue={field.value}
								readOnly={isDetail}
								label="Incident Time"
								placeholder="Select Incident Time"
								onChange={(e) => {
									const value = e.target.value
									handleChange(value, "incident_time")
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"name"}
						render={({ field }) => (
							<InputController
								defaultValue={field.value}
								readOnly={isDetail}
								label="Reported By"
								placeholder="Enter Name of Reporter"
								onChange={(e) => {
									const value = e.target.value
									handleChange(value, "name")
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"nip"}
						render={({ field }) => (
							<InputController
								defaultValue={field.value}
								readOnly={isDetail}
								label="NIP Reporter"
								placeholder="Enter Reporter’s NIP"
								onChange={(e) => {
									const value = e.target.value
									handleChange(value, "nip")
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"action_taken"}
						render={({ field }) => (
							<InputController
								defaultValue={field.value}
								readOnly={isDetail}
								label="Action Taken"
								placeholder="Enter Action Taken"
								onChange={(e) => {
									const value = e.target.value
									handleChange(value, "action_taken")
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"evidence"}
						render={({ field }) => (
							<InputFileOriginController
								label="Evidence"
								description="Only pdf, jpeg, png, Max. 5 Mb"
								placeholder="Document Report"
								accept=".pdf, .jpeg, .jpg, .png"
								file={field.value}
								isShowPreview={true}
								onChange={(e) => {
									if (e.target.files) {
										form.setValue(
											"evidence",
											e.target.files[0]
										)
									}
								}}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	)
}

export default RiskIncidentSection
