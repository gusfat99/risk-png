import { RiskAnalysisForm } from "@/types/riksAnalys"
import { z } from "zod"

// Schema yang telah didefinisikan
export const RiskAnalysisSchema = z.object({
	deviation_id: z
		.string({ required_error: "Deviation is required" })
		.refine(
			(val) => !isNaN(parseInt(val)),
			"Deviation must be a number"
		),
	risk_bank_id: z
		.string({ required_error: "Risk Bank Data is required" })
		.refine(
			(val) => !isNaN(parseInt(val)),
			"Risk Bank Data must be a number"
		),
	consequence_id: z
		.string({ required_error: "Consequence is required" })
		.refine(
			(val) => !isNaN(parseInt(val)),
			"Consequence must be a number"
		),
	sp_current: z
		.string({ required_error: "SP is required" })
		.refine((val) => !isNaN(parseInt(val)), "SP must be a number"),
	sf_current: z
		.string({ required_error: "SF is required" })
		.refine((val) => !isNaN(parseInt(val)), "SF must be a number"),
	se_current: z
		.string({ required_error: "SE is required" })
		.refine((val) => !isNaN(parseInt(val)), "SE must be a number"),
	srl_current: z
		.string({ required_error: "SRL is required" })
		.refine((val) => !isNaN(parseInt(val)), "SRL must be a number"),
	sa_current: z
		.string({ required_error: "SA is required" })
		.refine((val) => !isNaN(parseInt(val)), "SA must be a number"),
	spn_current: z
		.string({ required_error: "SPN is required" })
		.refine((val) => !isNaN(parseInt(val)), "SPN must be a number"),
	l_frequency_current: z
		.string({ required_error: "Likelihood Frequency Kejadian (L) is required" })
		.refine(
			(val) => !isNaN(parseInt(val)),
			"Likelihood Frequency Kejadian (L) must be a number"
		),
	remark_analyst: z.string({ required_error: "Notes Special Condition / Remarks is required" }),
	risk_rank: z.string().optional(),
})

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
	l_frequency_current : ""
}
