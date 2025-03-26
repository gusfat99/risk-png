"use client"
import React, { useEffect } from "react"
import RiskBankForm from "../RiskBankForm"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { useParams } from "next/navigation"
import Spinner from "@/components/ui/spinner"

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
				<div className="flex-1 flex-col flex justify-center items-center">
					<Spinner className="w-4 h-4" />
				</div>
			)}
			{riskDataBankSelected && !isFetching && <RiskBankForm isEdit />}
		</div>
	)
}

export default RiskBankUpdate
