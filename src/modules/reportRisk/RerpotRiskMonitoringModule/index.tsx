"use client"
import DataTable from "@/components/DataTable"
import InputSelect from "@/components/inputs/InputSelect"
import useReportRiskMonitoringStore from "@/store/reportRiskMonitoringStore"
import { ReportRiskMonitoring } from "@/types/riskMonitoring"
import { usePathname } from "next/navigation"
import { columnReportRiskMonitoring } from "./columns"
import { useEffect } from "react"

const ReportRiskMonitoringModule = () => {
	const pathname = usePathname()
	const {
		isFetchingReport,
		reportRiskMonitoring,
		nodeSelected,
		supportData: {
			node: { isFetching: isFetchingNode, nodeItems },
		},
		pagination_tanstack,
		meta,
		actions: {
			fetchNodeData,
			fetchReportRiskMonitoring,
			setPagination,
			setNodeSelected,
		},
	} = useReportRiskMonitoringStore()
	const total = meta?.total || 0

	const splitPathname = pathname.split("/")
	const basePathname = "/".concat(splitPathname[1])

	const nodeOptions = nodeItems.map((node) => ({
		label: node.node,
		value: node.id?.toString() ?? "",
	}))

	const handleActionTable = (
		actionName: string,
		row: ReportRiskMonitoring
	) => {}

	useEffect(() => {
		if (nodeItems.length === 0) {
			fetchNodeData()
		}
		fetchReportRiskMonitoring()
	}, [fetchReportRiskMonitoring, fetchNodeData, nodeSelected])

	return (
		<div className="w-full">
			<div className="flex flex-row justify-between items-end">
				<InputSelect
					label="Node"
					placeholder="Select Node"
					items={nodeOptions}
					loading={isFetchingNode}
					className="w-full"
					value={nodeSelected?.id?.toString() ?? ""}
					onValueChange={(value) => {
						setNodeSelected(parseInt(value))
					}}
				/>
			</div>
			<div className="mt-4">
				<DataTable<ReportRiskMonitoring>
					columns={columnReportRiskMonitoring(handleActionTable)}
					data={reportRiskMonitoring}
					loading={isFetchingReport}
					rowCount={total}
					manualPagination={true}
					onPaginationChange={setPagination}
					pagination={pagination_tanstack}
				/>
			</div>
		</div>
	)
}

export default ReportRiskMonitoringModule
