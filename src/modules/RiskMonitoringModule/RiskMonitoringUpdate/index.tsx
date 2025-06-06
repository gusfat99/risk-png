"use client"
import LoadingIndicator from "@/components/LoadingIndicator"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import RiskMonitoringForm from "../RiskMonitoringForm"

const RiskAnalystUpdate = () => {
	const params = useParams()
	const {
		isFetching,
		riskMonitoringSelected,
		supportData: {
			node: { nodeItems },
		},
		actions: { fetchDeviationData,  fetchSingleData, fetchNodeData },
	} = useRiskMonitoringStore()

	useEffect(() => {
		fetchDeviationData()
		if (nodeItems.length === 0) {
			fetchNodeData()
		}
		if (params.id) {
			fetchSingleData && fetchSingleData(params.id)
		}
	}, [fetchDeviationData, fetchSingleData, params?.id, nodeItems.length])

	return (
		<div className="w-full">
			{isFetching && (
				<LoadingIndicator/>
			)}
			{riskMonitoringSelected && !isFetching && (
				<RiskMonitoringForm isEdit />
			)}
		</div>
	)
}

export default RiskAnalystUpdate
