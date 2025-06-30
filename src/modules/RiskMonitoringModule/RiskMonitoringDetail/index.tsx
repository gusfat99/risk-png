"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import RiskBankIncidentCard from "@/components/cards/RiskBankIncidentCard"
import RiskIncidentCard from "@/components/cards/RiskIncidentCard"
import SeverityAffectedRiskCard from "@/components/cards/SeverityAffectedRiskCard"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"

interface IProps {}

const RiskMonitoringDetail: React.FC<IProps> = () => {
	const { id } = useParams()

	const {
		actions: { fetchDetailData },
		riskMonitoringSelected,
		isFetching,
	} = useRiskMonitoringStore()

	useEffect(() => {
		fetchDetailData && fetchDetailData(id)
	}, [id])

	return (
		<div className="space-y-4">
			{isFetching && <NodeDataCard.Skeleton />}
			{!isFetching && riskMonitoringSelected?.nodes && (
				<NodeDataCard nodeSelected={riskMonitoringSelected?.nodes} />
			)}
			{isFetching && <RiskBankIncidentCard.Skeleton />}
			{!isFetching && riskMonitoringSelected && (
				<RiskBankIncidentCard
					deviation={riskMonitoringSelected?.deviations}
					parameter={riskMonitoringSelected?.parameters}
					failed_safeguards={riskMonitoringSelected.failed_safeguards}
					cause={riskMonitoringSelected.causes}
					consequence={riskMonitoringSelected.consequences}
				/>
			)}
			{isFetching && <RiskIncidentCard.Skeleton />}

			{!isFetching && riskMonitoringSelected && (
				<RiskIncidentCard
					data={{
						incident_location:
							riskMonitoringSelected.incident_location,
						incident_name: riskMonitoringSelected.incident_name,
						incident_trigger:
							riskMonitoringSelected.incident_trigger,
						nip: riskMonitoringSelected.nip,
						name: riskMonitoringSelected.name,
						evidence: riskMonitoringSelected.evidence,
						incident_date: riskMonitoringSelected.incident_date,
						incident_time: riskMonitoringSelected.incident_time,
						action_taken: riskMonitoringSelected.action_taken,
					}}
				/>
			)}
			{isFetching && <SeverityAffectedRiskCard.Skeleton />}
			{!isFetching && riskMonitoringSelected && (
				<SeverityAffectedRiskCard item={riskMonitoringSelected} />
			)}
		</div>
	)
}

export default RiskMonitoringDetail
