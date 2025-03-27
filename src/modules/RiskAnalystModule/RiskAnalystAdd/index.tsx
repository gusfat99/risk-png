"use client"
import React, { useEffect } from "react"
import RiskAnalystForm from "../RiskAnalystForm"
import useRiskAnalysStore from "@/store/riksAnalysStore"

const RiskAnalystAdd = () => {
	const {
		actions: { fetchDeviationData },
	} = useRiskAnalysStore()

	useEffect(() => {
		fetchDeviationData()
	}, [fetchDeviationData])

	return (
		<div className="w-full">
			<RiskAnalystForm />
		</div>
	)
}

export default RiskAnalystAdd
