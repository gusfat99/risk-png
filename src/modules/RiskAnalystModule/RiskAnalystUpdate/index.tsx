"use client"
import React, { useEffect } from "react"
import RiskAnalystForm from "../RiskAnalystForm"
import useRiskAnalysStore from "@/store/risksAnalystStore"
import { useParams } from "next/navigation"
import Spinner from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"

const RiskAnalystUpdate = () => {
	const params = useParams()
	const { toast } = useToast();
	const {
		isFetching,
		riskAnalysSelected,
		nodeSelected,
		actions: {  fetchSingleData },
	} = useRiskAnalysStore()

	useEffect(() => {
		
		if (nodeSelected?.id && params.id) {
			fetchSingleData && fetchSingleData(nodeSelected?.id, params.id)
		}
	}, [ fetchSingleData, params.id, nodeSelected?.id])

	return (
		<div className="w-full">
			{isFetching && (
				<div className="flex-1 flex-col flex justify-center items-center">
					<Spinner className="w-4 h-4" />
				</div>
			)}
			{riskAnalysSelected && !isFetching && <RiskAnalystForm isEdit />}
		</div>
	)
}

export default RiskAnalystUpdate
