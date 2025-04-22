"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import InputSearch from "@/components/inputs/InputSearch"
import InputSelect from "@/components/inputs/InputSelect"
import LoadingIndicator from "@/components/LoadingIndicator"
import NotFoundData from "@/components/NotFoundData"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/ui/spinner"
import useRiskResponseStore from "@/store/riskResponseStore"
import { FormRefType } from "@/types/common"
import { Save } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import RiskResponseFormMultiple from "./RiskResponseFormMultiple"

const RiskResponseModule = () => {
	const pathname = usePathname()
	const formRef = useRef<FormRefType>(null)
	const {
		nodeSelected,
		isFetching,
		isSubmit,
		riskResponseItems,
		querySearch,
		actions: {
			setNodeSelected,
			fetchNodeData,
			fetchAllData,
			setHazopByRiskAnalyst,
		},
		supportData: {
			node: { isFetching: isFetchingNode, nodeItems },
		},
	} = useRiskResponseStore()
	const splitPathname = pathname.split("/")
	const basePathname = "/".concat(splitPathname[1])

	const nodeOptions = nodeItems.map((node) => ({
		label: node.node,
		value: node.id?.toString() ?? "",
	}))

	const handleSubmit = () => {
		formRef.current?.submit()
	}

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
				<div className="flex flex-row justify-between items-end">
					<div className="flex flex-row gap-2 items-end">
						<InputSearch
							label="Filter Data"
							isRequired={false}
							placeholder="Search..."
							// className="max-w-sm"
						/>
					</div>
					<Button
						onClick={handleSubmit}
						disabled={isSubmit || riskResponseItems.length === 0}
						variant={"secondary"}
					>
						{isSubmit && <Spinner className="w-4 h-4" />}
						{!isSubmit && <Save />}
						Save Severity Changes
					</Button>
				</div>
			)}
			{!isFetching && nodeSelected && (
				<RiskResponseFormMultiple ref={formRef} basePathname={basePathname} />
			)}

			{riskResponseItems.length === 0 && nodeSelected && !isFetching && (
				<NotFoundData
					description={"Data not found for key " + querySearch}
				/>
			)}
			{nodeSelected && isFetching && <LoadingIndicator />}
		</div>
	)
}

export default RiskResponseModule
