"use client"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { useEffect } from "react"
import RiskMonitoringForm from "../RiskMonitoringForm"
import { useParams } from "next/navigation"
import Spinner from "@/components/ui/spinner"
import LoadingIndicator from "@/components/LoadingIndicator"

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
