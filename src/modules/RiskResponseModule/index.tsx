"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import InputSelect from "@/components/inputs/InputSelect"
import { RiskAnalystListTableSkeleton } from "@/components/skeletons/RiskAnalystListTableSkeleton"
import useRiskResponseStore from "@/store/riskResponseStore"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import RiskResponseFormMultiple from "./RiskResponseFormMultiple"

const RiskResponseModule = () => {
	const pathname = usePathname()
	const {
		nodeSelected,
		isFetching,
		actions: { setNodeSelected, fetchNodeData, fetchAllData },
		supportData: {
			node: { isFetching: isFetchingNode, nodeItems },
		},
	} = useRiskResponseStore()
	const splitPathname = pathname.split("/")
	const basePathname = "/".concat(splitPathname[1])

	const nodeOptions = nodeItems.map((node) => ({
		label: node.node,
		value: node.id,
	}))

	useEffect(() => {
		if (nodeItems.length === 0) {
			fetchNodeData()
		}
		if (nodeSelected?.id) {
			fetchAllData(nodeSelected.id)
		}
	}, [fetchNodeData, fetchAllData, nodeSelected?.id, nodeItems])

	return (
		<div className="w-full space-y-4">
			<div className="flex flex-row justify-between items-end w-full">
				<InputSelect
					label="Node"
					placeholder="Select Node"
					items={nodeOptions}
					loading={isFetchingNode}
					className="w-full"
					onValueChange={(value) => {
						setNodeSelected(parseInt(value))
					}}
				/>
			</div>
			{nodeSelected && <NodeDataCard nodeSelected={nodeSelected} />}
			{isFetching && <RiskAnalystListTableSkeleton />}
			{!isFetching && nodeSelected && (
				<RiskResponseFormMultiple basePathname={basePathname} />
			)}
		</div>
	)
}

export default RiskResponseModule
