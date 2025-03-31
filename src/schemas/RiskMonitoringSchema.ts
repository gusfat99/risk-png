import { z } from "zod"
import { toValidatedNumber, toValidatedNumberActual } from "./RiskAnalystSchema"

export const RiskMonitoringSchema = z.object({
	node_id: z
		.string({ message: "Node is required" })
		.min(1, "Node Data is required"),
	deviation_id: z
		.string({ message: "Deviation is required" })
		.min(1, "Deviation Data is required"),
	risk_bank_id: z
		.string({ message: "Cause is required" })
		.min(1, "Cause is required"),
	incident_name: z
		.string({ message: "Incident is required" })
		.min(1, "Incident is required"),
	incident_location: z
		.string({ message: "Incident Location is required" })
		.min(1, "Incident Location is required"),
	incident_trigger: z
		.string({ message: "Incident Trigger is required" })
		.min(1, "Incident Trigger is required"),
	sp_affected: toValidatedNumber("SP"),
	sf_affected: toValidatedNumber("SF"),
	se_affected: toValidatedNumber("SE"),
	srl_affected: toValidatedNumber("SRL"),
	sa_affected: toValidatedNumber("SA"),
	spn_affected: toValidatedNumber("SPN"),
	l_frequency_affected: toValidatedNumber("k"),
	remark_analyst: z
		.string({
			message: "Likelihood Frequency kejadian is required",
		})
		.min(1, "Notes Special Condition / Remarks is required"),
	risk_rank: z.string().optional(),
})

export const RiskMonitoringSeveritySchema = z.object({
   risk_monitoring_id: z.string(),
   sp_affected: toValidatedNumberActual("SP"),
   sf_affected: toValidatedNumberActual("SF"),
   se_affected: toValidatedNumberActual("SE"),
   srl_affected: toValidatedNumberActual("SRL"),
   sa_affected: toValidatedNumberActual("SA"),
   spn_affected: toValidatedNumberActual("SPN"),
})

export const RiskMonitoringSeverityMultpleSchema = z.object({
   risks : z.array(RiskMonitoringSeveritySchema)
})