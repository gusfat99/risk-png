import { z } from "zod"
import { toValidatedNumber, toValidatedNumberActual } from "./RiskAnalystSchema"

export const RiskMonitoringSchema = z.object({
	node_id: z
		.string({ message: "Node is required" })
		.min(1, "Node Data is required"),
	deviation_id: z
		.string({ message: "Deviation is required" })
		.min(1, "Deviation Data is required"),
	parameter_id: z
		.string({ message: "Parameter is required" })
		.min(1, "Parameter is required"),
	risk_bank_id: z
		.string({ message: "Cause is required" })
		.min(1, "Cause is required"),
	consequence_id: z
		.string({ message: "Consequence is required" })
		.min(1, "Consequence is required"),
	incident_name: z
		.string({ message: "Incident is required" })
		.min(1, "Incident is required"),
	incident_date: z
		.string({ message: "Incident Date is required" })
		.min(1, "Incident Date is required"),
	incident_time: z
		.string({ message: "Incident Time is required" })
		.min(1, "Incident Time is required"),
	incident_location: z
		.string({ message: "Incident Location is required" })
		.min(1, "Incident Location is required"),
	incident_trigger: z
		.string({ message: "Incident Trigger is required" })
		.min(1, "Incident Trigger is required"),
	name: z
		.string({ message: "Name of Reporter is required" })
		.min(1, "Name of Reporter is required"),
	nip: z
		.string({ message: "Reporter’s NIP is required" })
		.min(1, "Reporter’s NIP is required"),
	action_taken: z
		.string({ message: "Action Taken is required" })
		.min(1, "Action Taken is required"),
	evidence:
		z
			.instanceof(File, {
				message: "Please upload evidence",
			})
			.refine(
				(file) => {
					if (!file) {
						return false
					}
					return true
				},
				{
					message: "Please upload evidence",
				}
			),
	safeguard_failure: z.array(z.object({
		label: z.string(),
		value : z.any(),
	})).min(1, "Safeguard Failure min 1 filled"),
	sp_affected: toValidatedNumber("SP"),
	sf_affected: toValidatedNumber("SF"),
	se_affected: toValidatedNumber("SE"),
	srl_affected: toValidatedNumber("SRL"),
	sa_affected: toValidatedNumber("SA"),
	spn_affected: toValidatedNumber("SPN"),

})

export const RiskMonitoringSeveritySchema = z.object({
	id: z.string().optional(),
	sp_affected: toValidatedNumberActual("SP"),
	sf_affected: toValidatedNumberActual("SF"),
	se_affected: toValidatedNumberActual("SE"),
	srl_affected: toValidatedNumberActual("SRL"),
	sa_affected: toValidatedNumberActual("SA"),
	spn_affected: toValidatedNumberActual("SPN"),
})

export const RiskMonitoringSeverityMultpleSchema = z.object({
	risks: z.array(RiskMonitoringSeveritySchema)
})