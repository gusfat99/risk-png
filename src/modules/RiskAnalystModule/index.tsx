"use client"
import AddButton from "@/components/buttons/AddButton"
import NodeDataCard from "@/components/cards/NodeDataCard"
import InputSearch from "@/components/inputs/InputSearch"
import InputSelect from "@/components/inputs/InputSelect"
import LoadingIndicator from "@/components/LoadingIndicator"
import NotFoundData from "@/components/NotFoundData"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/ui/spinner"
import { useDebounce } from "@/hooks/use-debounce"
import useRiskAnalysStore from "@/store/risksAnalystStore"
import { Save } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import RiskAnalystFormMultiple from "./RiskAnalystFormMultiple"
import { FormRefType } from "@/types/common"
import useAuthStore from "@/store/authStore"

const RiskAnalystModule = () => {
	const formRef = useRef<FormRefType>(null)

	const handleSubmit = () => {
		formRef.current?.submit()
	}

	const {
		actions: {
			fetchNodeData,
			setNodeSelected,
			fetchAllData,
			setQuerySearch,
		},
		querySearch,
		isFetching,
		riskAnalysItems,
		isSubmit,
		nodeSelected,
		supportData: {
			node: { nodeItems, isFetching: isFetchingNode },
		},
		pagination_tanstack,
	} = useRiskAnalysStore()
	const { pageIndex, pageSize } = pagination_tanstack
	const { year_selected } = useAuthStore()
	const router = useRouter()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])

	const nodeOptions = nodeItems.map((node) => ({
		label: node.node,
		value: node.id,
	}))

	const handleSearch = useDebounce((value: string) => {
		setQuerySearch(value)
	})

	useEffect(() => {
		if (nodeItems.length === 0) {
			fetchNodeData()
		}
		if (nodeSelected) {
			fetchAllData(nodeSelected.id)
		}
	}, [
		fetchNodeData,
		fetchAllData,
		nodeSelected?.id,
		nodeItems.length,
		querySearch,
		year_selected,
		pageIndex,
		pageSize,
	])

	return (
		<div className=" space-y-4 w-full max-w-full">
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
					<div className="flex flex-row gap-2 items-end">
						<InputSearch
							label="Filter Data"
							isRequired={false}
							placeholder="Search..."
							onChange={(e) =>
								handleSearch(e.target.value, "filter")
							}
							// className="max-w-sm"
						/>
						<Link href={basePathname + "/add"}>
							<AddButton label="Add Risk Analysis" />
						</Link>
					</div>
					<Button
						onClick={handleSubmit}
						disabled={isSubmit || riskAnalysItems.length === 0}
						variant={"secondary"}
					>
						{isSubmit && <Spinner className="w-4 h-4" />}
						{!isSubmit && <Save />}
						Save Severity Changes
					</Button>
				</div>
			)}
			{nodeSelected && !isFetching && riskAnalysItems && (
				<RiskAnalystFormMultiple
					ref={formRef}
					basePathname={basePathname}
				/>
			)}
			{riskAnalysItems.length === 0 && nodeSelected && !isFetching && (
				<NotFoundData
					description={"Data not found for key " + querySearch}
				/>
			)}
			{nodeSelected && isFetching && <LoadingIndicator />}
		</div>
	)
}

export default RiskAnalystModule
