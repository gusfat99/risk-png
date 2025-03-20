"use client"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { columnNode } from "../columns"
import type { Node } from "@/types/node"
import { useEffect } from "react"
import useNodeStore from "@/store/nodeStore"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

const NodeDataModule = () => {
	const {
		nodeItems,
		actions: { fetchAllData },
	} = useNodeStore()

	useEffect(() => {
		fetchAllData()
	}, [fetchAllData])

	return (
		<div className="w-full">
			<div className="flex flex-row justify-between items-end">
				<InputSearch
					label="Filter Data"
					isRequired={false}
					placeholder="Search..."
				/>
				<Link href={"/data-master-node-data/add"} >
					<Button variant="success">
						<Plus /> Add Node
					</Button>
				</Link>
			</div>
			<div className="mt-4">
				<DataTable<Node>
					columns={columnNode(() => {})}
					data={nodeItems}
					loading={false}
					rowCount={0}
					manualPagination={false}
				/>
			</div>
		</div>
	)
}

export default NodeDataModule
