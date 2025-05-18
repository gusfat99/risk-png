import {
  CAUSE_EP,
  CONSEQUENCE_EP,
  DEVIATION_EP,
  PARAMETER_EP,
  SAFEGUARD_EXIST_EP,
} from "@/constants/endpoints"
import { getDataApi } from "@/helpers/ApiHelper"
import { RiskAnalysis } from "@/types/riksAnalyst"
import { Cause, Consequences, Deviations, Parameter } from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"

export type RiskBankHierarchyType = {
  parameters: Parameter[] | null
  deviations: Deviations[] | null
  causes: Cause[] | null
  consequences: Consequences[] | null
  safeguards: Safeguard[] | null
}

// const fetchRiskBankHierarchy = (
// 	riskAnalysItem: RiskAnalysis
// ): Promise<RiskBankHierarchyType> => {
// 	return new Promise<RiskBankHierarchyType>(async (resolve, reject) => {
// 		try {
// 			const result: RiskBankHierarchyType = {
// 				parameters: null,
// 				deviations: null,
// 				causes: null,
// 				consequences: null,
// 				safeguards: null,
// 			}

// 			const [
// 				parameterResult,
// 				deviationsResult,
// 				causesResult,
// 				consequencesResult,
// 				safeguardsResult,

// 			] = await Promise.all([
// 				getDataApi<Parameter[]>(`${PARAMETER_EP}`, {
// 					page: 1,
// 					per_page: 1000,
// 				}),
// 				getDataApi<Deviations[]>(`${riskAnalysItem.parameter_id}${DEVIATION_EP}`, {
// 					page: 1,
// 					per_page: 1000,
// 				}),
// 				getDataApi<Cause>(`/${riskAnalysItem.deviation_id}${CAUSE_EP}`),
// 				getDataApi<Consequences>(
// 					`/${riskAnalysItem.risk_bank_id}${CONSEQUENCE_EP}`
// 				),
// 				getDataApi<Safeguard>(
// 					`/${riskAnalysItem.consequence_id}${SAFEGUARD_EXIST_EP}`
// 				),
// 			])

// 			if (Array.isArray(parameterResult.data)) {
// 				result.parameters = parameterResult.data
// 			}
// 			if (Array.isArray(deviationsResult.data)) {
// 				result.deviations = deviationsResult.data
// 			}
// 			if (Array.isArray(causesResult.data)) {
// 				result.causes = causesResult.data
// 			}
// 			if (Array.isArray(consequencesResult.data)) {
// 				result.consequences = consequencesResult.data
// 			}
// 			if (Array.isArray(safeguardsResult.data)) {
// 				result.safeguards = safeguardsResult.data
// 			}
// 			resolve(result)
// 		} catch (error) {
// 			reject(error)
// 		}
// 	})
// }

type FetchableEndpoints =
  | 'parameters'
  | 'deviations'
  | 'causes'
  | 'consequences'
  | 'safeguards';

export const fetchRiskBankHierarchy = (
  riskAnalysItem: {
    deviation_id: any;
    parameter_id: any;
    consequence_id?: any;
    risk_bank_id: any;
  },
  fetchOnly?: FetchableEndpoints[] // Default empty array (fetch all)
): Promise<RiskBankHierarchyType> => {
  return new Promise<RiskBankHierarchyType>(async (resolve, reject) => {
    try {
      const defaultResult: RiskBankHierarchyType = {
        parameters: null,
        deviations: null,
        causes: null,
        consequences: null,
        safeguards: null,
      };

      // Tentukan endpoint mana yang akan di-fetch
      const shouldFetch = (endpoint: FetchableEndpoints) =>
        fetchOnly?.length === 0 || fetchOnly?.includes(endpoint) || fetchOnly === undefined;
      // Jika tidak ada endpoint yang ditentukan, ambil semua

      // Siapkan array promises berdasarkan kebutuhan
      const promises = [];

      if (shouldFetch('parameters')) {
        promises.push(
          getDataApi<Parameter[]>(`${PARAMETER_EP}`, {
            page: 1,
            per_page: 1000,
          })
        );
      } else {
        promises.push(Promise.resolve({ data: null }));
      }

      if (shouldFetch('deviations')) {
        promises.push(
          getDataApi<Deviations[]>(`${riskAnalysItem.parameter_id}${DEVIATION_EP}`, {
            page: 1,
            per_page: 1000,
          })
        );
      } else {
        promises.push(Promise.resolve({ data: null }));
      }

      if (shouldFetch('causes')) {
        promises.push(
          getDataApi<Cause[]>(`/${riskAnalysItem.deviation_id}${CAUSE_EP}`)
        );
      } else {
        promises.push(Promise.resolve({ data: null }));
      }

      if (shouldFetch('consequences')) {
        promises.push(
          getDataApi<Consequences[]>(`/${riskAnalysItem.risk_bank_id}${CONSEQUENCE_EP}`)
        );
      } else {
        promises.push(Promise.resolve({ data: null }));
      }

      if (shouldFetch('safeguards')) {
        promises.push(
          getDataApi<Safeguard[]>(`/${riskAnalysItem.consequence_id}${SAFEGUARD_EXIST_EP}`)
        );
      } else {
        promises.push(Promise.resolve({ data: null }));
      }

      // Eksekusi hanya promises yang dibutuhkan
      const [
        parameterResult,
        deviationsResult,
        causesResult,
        consequencesResult,
        safeguardsResult,
      ] = await Promise.all(promises);

      const result = {
        ...defaultResult,

      };

      // Assign hasil hanya untuk endpoint yang di-fetch
      if (
        shouldFetch('parameters') &&
        Array.isArray(parameterResult.data) &&
        parameterResult.data.every(
          (item) =>
            item &&
            typeof item === "object" &&
            "id" in item &&
            "name" in item &&
            typeof item.name === "string"
        )
      ) {
        result.parameters = parameterResult.data as Parameter[];
      }

      if (
        shouldFetch('deviations') &&
        Array.isArray(deviationsResult.data) &&
        deviationsResult.data.every(
          (item) =>
            item &&
            typeof item === "object"
        )
      ) {
        result.deviations = deviationsResult.data as Deviations[];
      }
      if (
        shouldFetch('causes') &&
        Array.isArray(causesResult.data) &&
        causesResult.data.every(
          (item) =>
            item &&
            typeof item === "object" &&
            "deviation_id" in item &&
            "cause" in item
        )
      ) {
        result.causes = causesResult.data as Cause[];
      }

      if (
        shouldFetch('consequences') &&
        Array.isArray(consequencesResult.data) &&
        consequencesResult.data.every(
          (item) =>
            item &&
            typeof item === "object" &&
            "risk_bank_id" in item &&
            "consequence" in item
        )
      ) {
        result.consequences = consequencesResult.data as Consequences[];
      }

      if (
        shouldFetch('safeguards') &&
        Array.isArray(safeguardsResult.data) &&
        safeguardsResult.data.every(
          (item) =>
            item &&
            typeof item === "object" &&
            "safeguard" in item

        )
      ) {
        result.safeguards = safeguardsResult.data as Safeguard[];
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export default fetchRiskBankHierarchy
