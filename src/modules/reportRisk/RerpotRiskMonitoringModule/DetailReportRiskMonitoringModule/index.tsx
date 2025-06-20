"use client"
import ExportExcelButton from "@/components/buttons/ExportExcelButton"
import DataTable from "@/components/DataTable"
import useReportRiskMonitoringStore from "@/store/reportRiskMonitoringStore"
import {
	DetailReportRiskMonitoring,
	ReportRiskMonitoring,
} from "@/types/riskMonitoring"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { columnDetailReportRiskMonitoring } from "../columns"
import IncidentDataCard from "@/components/cards/IncidentDataCard"

const ReportRiskMonitoringModule = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const route = useRouter()
	const {
		isFetchingReport,
		reportRiskMonitoringDetail,
		pagination_tanstack,
		isFetchingExportData,
		meta,
		actions: {
			fetchDetailReportRiskMonitoring,
			setPagination,
			downloadFileReportDetail,
		},
	} = useReportRiskMonitoringStore()
	const total = meta?.total || 0
	const nodeId = searchParams.get("node")
	const deviationId = searchParams.get("deviation")
	const riskBankId = searchParams.get("risk_bank")
	const parameterId = searchParams.get("parameter")
	const consequenceId = searchParams.get("consequence")

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

	const onDownloadExcel = () => {
		downloadFileReportDetail({
			nodeId,
			deviationId,
			riskBankId,
			parameterId,
			consequenceId
		})
	}

	useEffect(() => {
		fetchDetailReportRiskMonitoring({
			nodeId,
			deviationId,
			riskBankId,
			parameterId,
			consequenceId
		})
	}, [fetchDetailReportRiskMonitoring, nodeId, deviationId, riskBankId])

	return (
		<div className="w-full space-y-4">
			{reportRiskMonitoringDetail.length > 0 && (
				<IncidentDataCard
					data={{
						cause: reportRiskMonitoringDetail[0].causes.cause,
						node: reportRiskMonitoringDetail[0].nodes.node,
						incident_count: total,
						deviation:
							reportRiskMonitoringDetail[0].deviations.name,
						parameter: reportRiskMonitoringDetail[0].parameters.name,
						
					}}
				/>
			)}
			<div className="flex flex-row justify-between items-end">
				<ExportExcelButton
					label="Export Excel"
					onClick={() => onDownloadExcel()}
					loading={isFetchingExportData}
				/>
			</div>
			<div className="mt-1">
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
