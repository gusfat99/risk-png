// types/risk-matrix.ts
export type RiskLevel = {
   id: number;
   name: string;
   color: string;
 };
 
 export type FrequencyLevel = {
   id: number;
   name: string;
   color: string;
 };
 
 export type RiskData = {
   frequencyId: number;
   riskId: number;
   value: number;
   color?: string;
 };
 
 export type RiskMatrixProps = {
   riskLevels: RiskLevel[];
   frequencyLevels: FrequencyLevel[];
   data: RiskData[];
 };