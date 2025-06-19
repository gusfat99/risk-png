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

	const riskRankItem = {
		sp: riskAnalysSelected?.sp_current || "",
		se: riskAnalysSelected?.se_current || "",
		srl: riskAnalysSelected?.srl_current || "",
		spn: riskAnalysSelected?.spn_current || "",
		sf: riskAnalysSelected?.sf_current || "",
		sa: riskAnalysSelected?.sa_current || "",
		risk_ranking: riskAnalysSelected?.risk_ranking_current || "",
		l_frequency: riskAnalysSelected?.l_frequency_current || "",
		remark: riskAnalysSelected?.remark_analyst || "",
	}

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
					parameter={riskAnalysSelected.parameters}
					consequence={riskAnalysSelected.consequence}
					deviation={riskAnalysSelected.deviations}
				/>
			)}
			{isFetching && <SeverityRiskCard.Skeleton />}
			{!isFetching && riskAnalysSelected && (
				<SeverityRiskCard item={riskRankItem} />
			)}
		</div>
	)
}

export default RiskAnalystDetail
