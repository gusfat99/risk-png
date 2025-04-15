"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import DataTable from "@/components/DataTable"
import InputSelect from "@/components/inputs/InputSelect"
import useRiskResponseStore from "@/store/riskResponseStore"
import { RiskResponse } from "@/types/riskResponse"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import {
	useColumnsReportRiskBySeverity,
} from "./columns"

const RiskReportSeverityModule = () => {
	const pathname = usePathname()
	const {
		nodeSelected,
		isFetching,
		actions: {
			setNodeSelected,
			fetchNodeData,
			fetchAllData,
			setHazopByRiskAnalyst,
			setPagination,
		},
		pagination_tanstack,
		riskResponseItems,
		supportData: {
			node: { isFetching: isFetchingNode, nodeItems },
		},
		meta,
	} = useRiskResponseStore()
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
			fetchAllData(nodeSelected.id)
		}
		return () => {
			setHazopByRiskAnalyst && setHazopByRiskAnalyst(null)
		}
	}, [
		fetchNodeData,
		fetchAllData,
		setHazopByRiskAnalyst,
		nodeSelected?.id,
		nodeItems.length,
	])

	const { column } = useColumnsReportRiskBySeverity({
		onAction: () => {},
	})

	return (
		<div className="w-full space-y-4">
			<div className="flex flex-row justify-between items-end w-full">
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
			{nodeSelected && <NodeDataCard nodeSelected={nodeSelected} />}

			{/* {isFetching && <RiskAnalystListTableSkeleton />} */}
			{nodeSelected && (
				<>
					<div className="grid grid-cols-2">
						<InputSelect
							label="Show Severity Column"
							placeholder="Select Severity Column"
							items={nodeOptions}
							loading={isFetchingNode}
							className="w-full"
							value={nodeSelected?.id?.toString() ?? ""}
							onValueChange={(value) => {
								setNodeSelected(parseInt(value))
							}}
						/>
					</div>
					<DataTable<RiskResponse>
						columns={column}
						data={riskResponseItems}
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

export default RiskReportSeverityModule
