"use client"
import LoadingIndicator from "@/components/LoadingIndicator"
import { useToast } from "@/hooks/use-toast"
import useRiskAnalysStore from "@/store/risksAnalystStore"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import RiskAnalystForm from "../RiskAnalystForm"

const RiskAnalystUpdate = () => {
	const params = useParams()
	const { toast } = useToast()
	const {
		isFetching,
		riskAnalysSelected,
		nodeSelected,
		actions: { fetchSingleData },
	} = useRiskAnalysStore()

	useEffect(() => {
		if (nodeSelected?.id && params.id) {
			fetchSingleData && fetchSingleData(nodeSelected?.id, params.id)
		}
	}, [fetchSingleData, params.id, nodeSelected?.id])

	return (
		<div className="w-full">
			{isFetching && <LoadingIndicator />}
			{riskAnalysSelected && !isFetching && <RiskAnalystForm isEdit />}
		</div>
	)
}

export default RiskAnalystUpdate
