"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import RiskBankCard from "@/components/cards/RiskBankCard"
import SeverityRiskCard from "@/components/cards/SeverityRiskCard"
import useRiskAnalystStore from "@/store/risksAnalystStore"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"

interface IProps {}

const RiskAnalystDetail: React.FC<IProps> = () => {
	const { nodeId, riskId } = useParams()

	const {
		actions: { fetchDetailData },
		riskAnalysSelected,
		isFetching,
	} = useRiskAnalystStore()

	useEffect(() => {
		fetchDetailData && fetchDetailData(nodeId, riskId)
	}, [nodeId, riskId])

	return (
		<div className="space-y-4">
			{isFetching && <NodeDataCard.Skeleton />}
			{!isFetching && riskAnalysSelected?.nodes && (
				<NodeDataCard nodeSelected={riskAnalysSelected?.nodes} />
			)}
			{isFetching && <RiskBankCard.Skeleton />}
			{!isFetching && riskAnalysSelected && (
				<RiskBankCard
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
		</div>
	)
}

export default RiskAnalystDetail
