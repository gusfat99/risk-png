"use client"
import { RiskAnalystListTableSkeleton } from "@/components/skeletons/RiskAnalystListTableSkeleton"
import useAuthStore from "@/store/authStore"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import RiskMonitoringFormMultiple from "./RiskMonitoringFormMultiple"

const RiskAnalystModule = () => {
	const {
		actions: { fetchNodeData, fetchAllData },
		isFetching,
		nodeSelected,
		supportData: {
			node: { nodeItems },
		},
		pagination_tanstack
	} = useRiskMonitoringStore()
	const { year_selected } = useAuthStore()
	const router = useRouter()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")
	const {
		pageSize,
		pageIndex
	} = pagination_tanstack;

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
		pageIndex,
		pageSize,
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
