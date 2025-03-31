"use client"
import { RiskAnalystListTableSkeleton } from "@/components/skeletons/RiskAnalystListTableSkeleton"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import RiskMonitoringFormMultiple from "./RiskMonitoringFormMultiple"

const RiskAnalystModule = () => {
	const {
		actions: { fetchNodeData, fetchAllData },
		isFetching,
		supportData: {
			node: { nodeItems, isFetching: isFetchingNode },
		},
	} = useRiskMonitoringStore()

	const router = useRouter()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])


	useEffect(() => {
		if (nodeItems.length === 0) {
			fetchNodeData()
		}
		
	}, [fetchNodeData, fetchAllData])

	return (
		<div className=" space-y-4">
			{isFetching && <RiskAnalystListTableSkeleton />}
			{!isFetching && (
				<RiskMonitoringFormMultiple basePathname={basePathname} />
			)}
		</div>
	)
}

export default RiskAnalystModule
