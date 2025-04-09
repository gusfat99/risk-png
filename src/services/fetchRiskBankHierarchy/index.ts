import {
	CAUSE_EP,
	CONSEQUENCE_EP,
	DEVIATION_EP,
	SAFEGUARD_EXIST_EP,
} from "@/constants/endpoints"
import { getDataApi } from "@/helpers/ApiHelper"
import { RiskAnalysis } from "@/types/riksAnalyst"
import { Cause, Consequences, Deviations } from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"

export type RiskBankHierarchyType = {
	deviations: Deviations[] | null
	causes: Cause[] | null
	consequences: Consequences[] | null
	safeguards: Safeguard[] | null
}

const fetchRiskBankHierarchy = (
	riskAnalysItem: RiskAnalysis
): Promise<RiskBankHierarchyType> => {
	return new Promise<RiskBankHierarchyType>(async (resolve, reject) => {
		try {
			const result: RiskBankHierarchyType = {
				deviations: null,
				causes: null,
				consequences: null,
				safeguards: null,
			}

			const [
				deviationsResult,
				causesResult,
				consequencesResult,
				safeguardsResult,
			] = await Promise.all([
				getDataApi<Deviations[]>(DEVIATION_EP, {
					page: 1,
					per_page: 1000,
				}),
				getDataApi<Cause>(`/${riskAnalysItem.deviation_id}${CAUSE_EP}`),
				getDataApi<Consequences>(
					`/${riskAnalysItem.risk_bank_id}${CONSEQUENCE_EP}`
				),
				getDataApi<Safeguard>(
					`/${riskAnalysItem.consequence_id}${SAFEGUARD_EXIST_EP}`
				),
			])

			if (Array.isArray(deviationsResult.data)) {
				result.deviations = deviationsResult.data
			}
			if (Array.isArray(causesResult.data)) {
				result.causes = causesResult.data
			}
			if (Array.isArray(consequencesResult.data)) {
				result.consequences = consequencesResult.data
			}
			if (Array.isArray(safeguardsResult.data)) {
				result.safeguards = safeguardsResult.data
			}
			resolve(result)
		} catch (error) {
			reject(error)
		}
	})
}

export default fetchRiskBankHierarchy
