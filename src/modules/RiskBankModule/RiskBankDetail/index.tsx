"use client"
import RiskBankMasterCard from "@/components/cards/RiskBankMasterCard"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const RiskBankDetail = () => {
	const params = useParams()
	const {
		riskDataBankSelected,
		isFetching,
		actions: { fetchSingleData },
	} = useRiskDataBankStore()

	useEffect(() => {
		if (params.id) {
			fetchSingleData && fetchSingleData(params.id)
		}
	}, [params.id, fetchSingleData])

	return (
		<div className="w-full h-fit">
			{isFetching && (
				<RiskBankMasterCard.Skeleton />
			)}
			{riskDataBankSelected && !isFetching && (
				<RiskBankMasterCard data={riskDataBankSelected} />
			)}
		</div>
	)
}

export default RiskBankDetail
