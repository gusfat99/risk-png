"use client"
import ExportExcelButton from "@/components/buttons/ExportExcelButton"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import InputSelect from "@/components/inputs/InputSelect"
import useAuthStore from "@/store/authStore"
import useSafeguardStore from "@/store/safeguradStore"
import { RiskResponse } from "@/types/riskResponse"
import { SafeguardReport } from "@/types/safeguard"
import { usePathname } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useColumnsReportSafeguardRegister } from "./columns"

const ReportSafeguardRegusterModule = () => {
	const pathname = usePathname()

	const {
		isFetching,
		isFetchingExportData,
		nodeSelected,
		actions: {
			setPagination,
			fetchNodeData,
			fetchReportSafeguardRegistered,
			setNodeSelected,
			exportExcel
		},
		pagination_tanstack,
		safeguardReportItems,
		supportData: {
			node: { isFetching: isFetchingNode, nodeItems },
		},
		meta,
	} = useSafeguardStore()
	const { year_selected } = useAuthStore()
	const total = meta?.total || 0
	const splitPathname = pathname.split("/")
	const basePathname = "/".concat(splitPathname[1])

	const nodeOptions = nodeItems.map((node) => ({
		label: node.node,
		value: node.id?.toString() ?? "",
	}))

	useEffect(() => {
		if (nodeItems.length === 0) {
			fetchNodeData && fetchNodeData()
		}

		fetchReportSafeguardRegistered && fetchReportSafeguardRegistered()
	}, [
		fetchNodeData,
		fetchReportSafeguardRegistered,
		nodeItems.length,
		year_selected,
		nodeSelected,
		pagination_tanstack.pageIndex,
		pagination_tanstack.pageSize,
	])

	const { column } = useColumnsReportSafeguardRegister({
		onAction: (actionName, row) => {
			handleAction(actionName, row)
		},
	})

	const handleAction = useCallback(
		(actionName: string, row: RiskResponse) => {},
		[]
	)

	return (
		<div className="w-full space-y-4">
			<div className="grid grid-cols-6 gap-2 items-end">
				<InputSearch
					label="Filter Data"
					isRequired={false}
					placeholder="Search..."
					onChange={(e) => {
						// handleSearch(e.target.value, "filter")
					}}
				/>
				<InputSelect
					label="Node"
					placeholder="Select Node"
					items={nodeOptions}
					loading={isFetchingNode}
					className="w-full"
					value={nodeSelected?.id?.toString() ?? ""}
					onValueChange={(value) => {
						setNodeSelected && setNodeSelected(parseInt(value))
					}}
				/>
				<div>
					<ExportExcelButton
						label="Export Excel"
						loading={isFetchingExportData}
						onClick={() => {
							// exportExcel(nodeSelected.id)
							exportExcel && exportExcel()
						}}
					/>
				</div>
			</div>
			{nodeSelected && (
				<DataTable<SafeguardReport>
					columns={column}
					data={safeguardReportItems}
					loading={isFetching}
					rowCount={total}
					manualPagination={true}
					onPaginationChange={setPagination}
					pagination={pagination_tanstack}
				/>
			)}
		</div>
	)
}

export default ReportSafeguardRegusterModule
