import { z } from "zod"
import { toValidatedNumberActual } from "./RiskAnalystSchema";

// Schema yang telah didefinisikan
export const RiskResponseHazopSchema = z.object({
   id: z
      .string({ message: "ID is required" })
      .min(1, "id Data is required").optional(),
      hazop_recom: z
      .string({ message: "Hazop Recomendation is required" })
      .min(1, "Hazop Recomendation  is required"),
      responsibility: z
      .string({ message: "Responsibility is required" })
      .min(1, "Responsibility is required"),
      due_date: z
      .string({ message: "Due Date is required" })
      .min(1, "Due Date is required"),
      document_report: z.instanceof(File, {
			message: "Please upload file",
		})
		.refine(
			(file) => {
				if (!file) {
					return false
				}
				return true
			},
			{
				message: "Please upload file",
			}
		),
})

export const RiskResponseHazopMultipleSchema = z.array(RiskResponseHazopSchema);

export const RiskResponseSevertyExpectSchema = z.object({
   risk_analyst_id: z.string(),
   sp_expect: toValidatedNumberActual("SP"),
   sf_expect: toValidatedNumberActual("SF"),
   se_expect: toValidatedNumberActual("SE"),
   srl_expect: toValidatedNumberActual("SRL"),
   sa_expect: toValidatedNumberActual("SA"),
   spn_expect: toValidatedNumberActual("SPN"),
   l_frequency_expect: toValidatedNumberActual("Likelihood Frequency kejadian"),
})

export const RiskResponseSevertyExpectMultipleSchema = z.object({
   risks : z.array(RiskResponseSevertyExpectSchema)
})

