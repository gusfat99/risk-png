"use client"
import { RiskAnalystListTableSkeleton } from "@/components/skeletons/RiskAnalystListTableSkeleton"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import RiskMonitoringFormMultiple from "./RiskMonitoringFormMultiple"
import useAuthStore from "@/store/authStore"

const RiskAnalystModule = () => {
	const {
		actions: { fetchNodeData, fetchAllData },
		isFetching,
		nodeSelected,
		supportData: {
			node: { nodeItems, isFetching: isFetchingNode },
		},
	} = useRiskMonitoringStore()
	const { year_selected } = useAuthStore()
	const router = useRouter()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])

	useEffect(() => {
		if (nodeItems.length === 0) {
			fetchNodeData()
		}
		fetchAllData()
	}, [
		fetchNodeData,
		fetchAllData,
		nodeItems.length,
		nodeSelected,
		year_selected,
	])

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
