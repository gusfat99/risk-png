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
import { useRouter } from "next/navigation"

const NodeDataModule = () => {
	const {
		nodeItems,
		actions: { fetchAllData, setPagination },
		isFetching,
		meta,
		pagination_tanstack,
	} = useNodeStore()
	const { pageIndex, pageSize } = pagination_tanstack
	const total = meta?.total || 0
	const router = useRouter()

	const handleActionTable = (action: string, id: any) => {
		if (action === "update") {
			router.push("/data-master-node-data/update/" + id)
		} else if (action === "detail") {
			router.push("/data-master-node-data/detail/" + id)
		}
	}

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
					columns={columnNode(handleActionTable)}
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
