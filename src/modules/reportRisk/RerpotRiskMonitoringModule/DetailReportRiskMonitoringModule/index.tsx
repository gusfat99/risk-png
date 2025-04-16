"use client"
import ExportExcelButton from "@/components/buttons/ExportExcelButton"
import DataTable from "@/components/DataTable"
import useReportRiskMonitoringStore from "@/store/reportRiskMonitoringStore"
import {
   DetailReportRiskMonitoring,
   ReportRiskMonitoring,
} from "@/types/riskMonitoring"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import {
   columnDetailReportRiskMonitoring
} from "../columns"

const ReportRiskMonitoringModule = () => {
	const pathname = usePathname()
	const route = useRouter()
	const {
		isFetchingReport,
		reportRiskMonitoringDetail,
		pagination_tanstack,
		meta,
		actions: { fetchDetailReportRiskMonitoring, setPagination },
	} = useReportRiskMonitoringStore()
	const total = meta?.total || 0

	const splitPathname = pathname.split("/")
	const basePathname = "/".concat(splitPathname[1])

	const handleActionTable = useCallback(
		(actionName: string, row: ReportRiskMonitoring) => {
			if (actionName === "detail") {
				route.push(
					`${basePathname}/detail?node=${row.node_id}&deviation=${row.deviation_id}&risk_bank=${row.risk_bank_id}`
				)
			}
		},
		[]
	)

	useEffect(() => {
		fetchDetailReportRiskMonitoring()
	}, [fetchDetailReportRiskMonitoring])

	return (
		<div className="w-full">
			<div className="flex flex-row justify-between items-end">
				<ExportExcelButton label="Export Excel" />
			</div>
			<div className="mt-4">
				<DataTable<DetailReportRiskMonitoring>
					columns={columnDetailReportRiskMonitoring(
						handleActionTable
					)}
					data={reportRiskMonitoringDetail}
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
