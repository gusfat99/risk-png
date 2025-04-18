"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import DataTable from "@/components/DataTable"
import InputSelect from "@/components/inputs/InputSelect"
import useRiskResponseStore from "@/store/riskResponseStore"
import { HazopStatusDialog, RiskResponse } from "@/types/riskResponse"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useColumnsReportRiskBySeverity } from "./columns"
import { SelectDataType } from "@/types/common"
import DialogMain from "@/components/dialogs/DialogMain"
import HazopRecommendationList from "@/components/Items/HazopRecommedationList"

const RiskReportSeverityModule = () => {
	const pathname = usePathname()
	const [hazopOpen, setHazopOpen] = useState<HazopStatusDialog>({
		hazop_id: null,
		risk_analyst_id: null,
		open: false,
	})
	const {
		nodeSelected,
		isFetching,
		isFetchingSeverity,
		riskSeveritySelected,

		actions: {
			setNodeSelected,
			fetchNodeData,
			fetchAllData,
			setHazopByRiskAnalyst,
			setPagination,
			fetchSeverity,
			setRiskSeveritySelected,
		},
		pagination_tanstack,
		riskResponseItems,
		severityItems,
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
		if (severityItems?.length === 0) {
			fetchSeverity()
		}
		if (nodeSelected?.id) {
			fetchAllData(nodeSelected.id, true) //true for report endpoint
		}
		return () => {
			setHazopByRiskAnalyst && setHazopByRiskAnalyst(null)
		}
	}, [
		fetchNodeData,
		fetchAllData,
		fetchSeverity,
		setHazopByRiskAnalyst,
		nodeSelected?.id,
		nodeItems.length,
	])

	// let severityOptions: SelectDataType[] = severityItems?.map(x => ({
	// 	label : x.label
	// }))
	const severityOptions: SelectDataType[] = (severityItems || []).map(
		(x) => ({
			label: x.label,
			value: x.key,
		})
	)

	const { column } = useColumnsReportRiskBySeverity({
		onAction: (actionName, row) => {
			handleAction(actionName, row)
		},
		riskSeveritySelected,
		severityOptions,
	})

	const handleAction = useCallback(
		(actionName: string, row: RiskResponse) => {
			if (actionName === "hazop") {
			
				setHazopOpen((prev) => ({
					...prev,
					hazop_id: row.id,
					risk_analyst_id: row.id,
					open: true,
					hazop: row.hazops,
				}))
			}
		},
		[]
	)

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
							label="Select severity"
							placeholder="select severity"
							items={severityOptions}
							loading={isFetchingNode}
							className="w-full"
							value={riskSeveritySelected}
							onValueChange={(value) => {
								setRiskSeveritySelected(value)
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
			<DialogMain
				open={hazopOpen.open}
				onOpenChange={(value) => {
					setHazopOpen((prev) => ({
						...prev,
						open: value,
					}))
					setHazopByRiskAnalyst && setHazopByRiskAnalyst(null)
				}}
				title="Hazop Recommendation"
				size="7xl"
			>
				{hazopOpen.open && hazopOpen.hazop && (
					<HazopRecommendationList data={hazopOpen.hazop} />
				)}
			</DialogMain>
		</div>
	)
}

export default RiskReportSeverityModule
