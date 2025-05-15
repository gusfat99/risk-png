"use client"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { useEffect } from "react"
import RiskMonitoringForm from "../RiskMonitoringForm"

const RiskAnalystAdd = () => {
	const {
		actions: { fetchParameterData, fetchNodeData },
	} = useRiskMonitoringStore()

	useEffect(() => {
      fetchParameterData()
      fetchNodeData()
	}, [fetchParameterData, fetchNodeData])

	return (
		<div className="w-full">
			<RiskMonitoringForm />
		</div>
	)
}

export default RiskAnalystAdd
