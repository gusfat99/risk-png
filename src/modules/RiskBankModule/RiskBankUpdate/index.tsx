"use client"
import LoadingIndicator from "@/components/LoadingIndicator"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import RiskBankForm from "../RiskBankForm"

const RiskBankUpdate = () => {
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
				<LoadingIndicator/>
			)}
			{riskDataBankSelected && !isFetching && <RiskBankForm isEdit />}
		</div>
	)
}

export default RiskBankUpdate
