"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import InputSelect from "@/components/inputs/InputSelect"
import useRiskAnalysStore from "@/store/risksAnalystStore"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import RiskAnalystFormMultiple from "./RiskAnalystFormMultiple"
import { RiskAnalystListTableSkeleton } from "@/components/skeletons/RiskAnalystListTableSkeleton"

const RiskAnalystModule = () => {
	const {
		actions: { fetchNodeData, setNodeSelected, fetchAllData },
		nodeSelected,
		isFetching,
		riskAnalysItems,
		supportData: {
			node: { nodeItems, isFetching: isFetchingNode },
		},
	} = useRiskAnalysStore()

	const router = useRouter()
	const pathname = usePathname()
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
		if (nodeSelected) {
			fetchAllData(nodeSelected.id)
		}
	}, [fetchNodeData, fetchAllData, nodeSelected?.id, nodeItems])

	return (
		<div className=" space-y-4">
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
				<RiskAnalystFormMultiple basePathname={basePathname} />
			)}
		</div>
	)
}

export default RiskAnalystModule
