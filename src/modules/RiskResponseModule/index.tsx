"use client"
import AddButton from "@/components/buttons/AddButton"
import NodeDataCard from "@/components/cards/NodeDataCard"
import InputSearch from "@/components/inputs/InputSearch"
import InputSelect from "@/components/inputs/InputSelect"
import useRiskResponseStore from "@/store/riskResponseStore"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const RiskResponseModule = () => {
	const pathname = usePathname()
	const {
		nodeSelected,
		riskResponseItems,
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
			{nodeSelected && (
				<div className="flex flex-row justify-between items-end">
					<InputSearch
						label="Filter Data"
						isRequired={false}
						placeholder="Search..."
						// className="max-w-sm"
					/>
					{/* <Link href={basePathnam e + "/add"}>
						<AddButton label="Add Risk Analysis" />
					</Link> */}
				</div>
			)}
		</div>
	)
}

export default RiskResponseModule
