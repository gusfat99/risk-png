'use client'
import NodeDataCard from "@/components/cards/NodeDataCard"
import RiskBankCard from "@/components/cards/RiskBankCard"
import SeverityRiskCard from "@/components/cards/SeverityRiskCard"
import LoadingIndicator from "@/components/LoadingIndicator"
import useRiskAnalystStore from "@/store/risksAnalystStore"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"
import RiskResponseSeverityExpectedForm from "../RiskResponseSeverityExpectedForm"
import useRiskResponseStore from "@/store/riskResponseStore"

const RiskResponseSeverityUpdate = () => {
	const { nodeId, riskId } = useParams()

	const {
		actions: { fetchDetailData },
		riskAnalysSelected,
		isFetching,
	} = useRiskAnalystStore()
	useRiskResponseStore();

	useEffect(() => {
		fetchDetailData && fetchDetailData(nodeId, riskId)
	}, [])

	return (
		<div className="space-y-4">
			{isFetching && <NodeDataCard.Skeleton />}
			{!isFetching && riskAnalysSelected?.nodes && (
				<NodeDataCard nodeSelected={riskAnalysSelected?.nodes} />
			)}
			{isFetching && <RiskBankCard.Skeleton />}
			{!isFetching && riskAnalysSelected && (
				<RiskBankCard
					parameter={riskAnalysSelected.parameters}
					cause={riskAnalysSelected.causes}
					existing_safeguard={
						riskAnalysSelected.existing_safeguard || []
					}
					consequence={riskAnalysSelected.consequence}
					deviation={riskAnalysSelected.deviations}
				/>
			)}
			{isFetching && <SeverityRiskCard.Skeleton />}
			{!isFetching && riskAnalysSelected && (
				<SeverityRiskCard item={riskAnalysSelected} />
			)}
			{isFetching && <LoadingIndicator />}
			{!isFetching && riskAnalysSelected && (
				<RiskResponseSeverityExpectedForm isEdit />
			)}
		</div>
	)
}

export default RiskResponseSeverityUpdate
