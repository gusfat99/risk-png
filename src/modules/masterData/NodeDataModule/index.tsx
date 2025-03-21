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
		actions: { fetchAllData, setPagination },
		isFetching,
		meta: { total },
		pagination_tanstack,
		
	} = useNodeStore()
	const { pageIndex, pageSize } = pagination_tanstack;

	useEffect(() => {
		fetchAllData()
	}, [fetchAllData, pageIndex, pageSize])

	return (
		<div className="w-full">
			<div className="flex flex-row justify-between items-end">
				<InputSearch
					label="Filter Data"
					isRequired={false}
					placeholder="Search..."
				/>
				<Link href={"/data-master-node-data/add"}>
					<Button variant="success">
						<Plus /> Add Node
					</Button>
				</Link>
			</div>
			<div className="mt-4">
				<DataTable<Node>
					columns={columnNode(() => {})}
					data={nodeItems}
					loading={isFetching}
					rowCount={total}
					manualPagination={true}
					onPaginationChange={setPagination}
					pagination={pagination_tanstack}
				/>
			</div>
		</div>
	)
}

export default NodeDataModule
