import {
	RiskAnalysisForm,
	RiskAnalysisSevertyMultipleForm,
} from "@/types/riksAnalyst"
import { z } from "zod"

// Schema yang telah didefinisikan
export const RiskAnalysisSchema = z.object({
	deviation_id: z
		.string({ message: "Deviation is required" })
		.min(1, "Deviation Data is required"),
	risk_bank_id: z
		.string({ message: "Cause is required" })
		.min(1, "Cause is required"),
	consequence_id: z
		.string({ message: "Consequence is required" })
		.min(1, "Consequence is required"),
	sp_current: toValidatedNumber("SP"),
	sf_current: toValidatedNumber("SF"),
	se_current: toValidatedNumber("SE"),
	srl_current: toValidatedNumber("SRL"),
	sa_current: toValidatedNumber("SA"),
	spn_current: toValidatedNumber("SPN"),
	l_frequency_current: toValidatedNumber("Likelihood Frequency kejadian"),
	remark_analyst: z
		.string({
			message: "Likelihood Frequency kejadian is required",
		})
		.min(1, "Notes Special Condition / Remarks is required"),
	risk_rank: z.string().optional(),
})

export const RiskAnalysisSeveritySchema = z.object({
	risk_analyst_id: z.string(),
	sp_current: toValidatedNumberActual("SP"),
	sf_current: toValidatedNumberActual("SF"),
	se_current: toValidatedNumberActual("SE"),
	srl_current: toValidatedNumberActual("SRL"),
	sa_current: toValidatedNumberActual("SA"),
	spn_current: toValidatedNumberActual("SPN"),
	l_frequency_current: toValidatedNumberActual("Likelihood Frequency kejadian"),
})

export const RiskAnalysisSeverityMultpleSchema = z.object({
	risks : z.array(RiskAnalysisSeveritySchema)
})

export function toValidatedNumber(name: string) {
	const numberSchema = z
		.string()
		.min(0, name + " is required")
		.refine((val) => !isNaN(Number(val)), {
			message: name + " Must be a number",
		}) // Pastikan angka valid
		.refine((val) => Number(val) > -1, {
			message: name + " must be more than -1",
		}) // Harus positif

		.refine((val) => Number(val) <= 5, {
			message: name + " must be less than or equal 5",
		}) // Maksimum 5
	return numberSchema
}

export function toValidatedNumberActual(name: string) {
	const numberSchema = z
		.number()
		.min(0, name + " is required")
		.refine((val) => !isNaN(Number(val)), {
			message: name + " Must be a number",
		}) // Pastikan angka valid
		.refine((val) => Number(val) > -1, {
			message: name + " must be more than -1",
		}) // Harus positif

		.refine((val) => Number(val) <= 5, {
			message: name + " must be less than or equal 5",
		}) // Maksimum 5
	return numberSchema
}

export const initialRiskAnalyst: RiskAnalysisForm = {
	consequence_id: "",
	deviation_id: "",
	risk_rank: "",
	srl_current: "",
	spn_current: "",
	sp_current: "",
	sf_current: "",
	se_current: "",
	sa_current: "",
	risk_bank_id: "",
	remark_analyst: "",
	l_frequency_current: "",
}

export const intitalRiskAnalystSavertyMultiple: RiskAnalysisSevertyMultipleForm = {
	risks : []
}