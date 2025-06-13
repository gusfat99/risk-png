"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import RiskBankCard from "@/components/cards/RiskBankCard"
import SeverityRiskCard from "@/components/cards/SeverityRiskCard"
import useRiskResponseStore from "@/store/riskResponseStore"
import useRiskAnalystStore from "@/store/risksAnalystStore"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"

interface IProps {}

const RiskResponseDetail: React.FC<IProps> = () => {
	const { nodeId,riskId } = useParams()

	const {
		actions: { fetchSingleData },
		riskResponseSelected,
		nodeSelected,
		isFetching,
	} = useRiskResponseStore()

	useEffect(() => {
		fetchSingleData && fetchSingleData(nodeId, riskId)
	}, [nodeId, riskId])

	const riskRankItem = {
		sp: riskResponseSelected?.sp_current || "",
		se: riskResponseSelected?.se_current || "",
		srl: riskResponseSelected?.srl_current || "",
		spn: riskResponseSelected?.spn_current || "",
		sf: riskResponseSelected?.sf_current || "",
		sa: riskResponseSelected?.sa_current || "",
		risk_ranking: riskResponseSelected?.risk_ranking_current || "",
		l_frequency: riskResponseSelected?.l_frequency_current || "",
		remark: riskResponseSelected?.remark_analyst || "",
	}
	const riskRankExpectedItem = {
		sp: riskResponseSelected?.sp_expected || "",
		se: riskResponseSelected?.se_expected || "",
		srl: riskResponseSelected?.srl_expected || "",
		spn: riskResponseSelected?.spn_expected || "",
		sf: riskResponseSelected?.sf_expected || "",
		sa: riskResponseSelected?.sa_expected || "",
		risk_ranking: riskResponseSelected?.risk_ranking_expected || "",
		l_frequency: riskResponseSelected?.l_frequency_expected || "",
		remark: riskResponseSelected?.remark_analyst || "",
	}

	return (
		<div className="space-y-4">
			{isFetching && <NodeDataCard.Skeleton />}
			{!isFetching && nodeSelected && (
				<NodeDataCard nodeSelected={nodeSelected} />
			)}
			{isFetching && <RiskBankCard.Skeleton />}
			{!isFetching && riskResponseSelected && (
				<RiskBankCard
					cause={riskResponseSelected.causes}
					existing_safeguard={
						riskResponseSelected.existing_safeguard || []
					}
					parameter={riskResponseSelected.parameters}
					consequence={riskResponseSelected.consequence}
					deviation={riskResponseSelected.deviations}
				/>
			)}
			{isFetching && <SeverityRiskCard.Skeleton />}
			{!isFetching && riskResponseSelected && (
				<SeverityRiskCard item={riskRankItem} />
			)}
			{isFetching && <SeverityRiskCard.Skeleton />}
			{!isFetching && riskResponseSelected && (
				<SeverityRiskCard title="Risk Rank Expected" item={riskRankExpectedItem} />
			)}
		</div>
	)
}

export default RiskResponseDetail
