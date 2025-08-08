"use client"
import ExportExcelButton from "@/components/buttons/ExportExcelButton"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import InputSelect from "@/components/inputs/InputSelect"
import useAuthStore from "@/store/authStore"
import useRiskResponseStore from "@/store/riskResponseStore"
import { HazopReport, RiskResponse } from "@/types/riskResponse"
import { usePathname } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useColumnsReportHazopResponseModule } from "./columns"

const ReportHazopResponseModule = () => {
	const pathname = usePathname()

	const {
		nodeSelected,
		isFetching,
		isFetchingExportData,
		hazopResponseReportItems,
		pagination_tanstack,
		actions: {
			fetchNodeData,
			fetchHazopResponseReport,
			setNodeSelected,
			setPagination,
			exportHazopResponseReport,
		},
		supportData: {
			node: { isFetching: isFetchingNode, nodeItems },
		},
		meta,
	} = useRiskResponseStore()
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
			fetchNodeData()
		}

		if (nodeSelected?.id) {
			fetchHazopResponseReport &&
				fetchHazopResponseReport(nodeSelected.id) //true for report endpoint
		}
	}, [
		fetchHazopResponseReport,
		fetchNodeData,
		nodeSelected?.id,
		nodeItems.length,
      year_selected,
      pagination_tanstack.pageIndex,
      pagination_tanstack.pageSize,
	])

	const { column } = useColumnsReportHazopResponseModule({
		onAction: (actionName, row) => {},
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
						setNodeSelected(parseInt(value))
					}}
				/>
				<div>
					<ExportExcelButton
						label="Export Excel"
						loading={isFetchingExportData}
						disabled={!nodeSelected?.id}
						onClick={() => {
							nodeSelected &&
								exportHazopResponseReport &&
								exportHazopResponseReport(nodeSelected.id)
						}}
					/>
				</div>
			</div>
			{/* {nodeSelected && <NodeDataCard nodeSelected={nodeSelected} />} */}

			{/* {isFetching && <RiskAnalystListTableSkeleton />} */}
			{nodeSelected && (
				<>
					<DataTable<HazopReport>
						columns={column}
						data={hazopResponseReportItems}
						loading={isFetching}
						rowCount={total}
						manualPagination={true}
						onPaginationChange={setPagination}
						pagination={pagination_tanstack}
					/>
				</>
			)}
		</div>
	)
}

export default ReportHazopResponseModule
