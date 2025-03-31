"use client"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { useEffect } from "react"
import RiskMonitoringForm from "../RiskMonitoringForm"

const RiskAnalystAdd = () => {
   const {
      actions: { fetchDeviationData },
   } = useRiskMonitoringStore()

   useEffect(() => {
      fetchDeviationData()
   }, [fetchDeviationData])

   return (
      <div className="w-full">
         <RiskMonitoringForm />
      </div>
   )
}

export default RiskAnalystAdd
