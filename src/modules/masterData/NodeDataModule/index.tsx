"use client"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { columnNode } from "../columns"
import type { Node } from "@/types/node"
import { useEffect, useState } from "react"
import useNodeStore from "@/store/nodeStore"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"
import { useToast } from "@/hooks/use-toast"

const NodeDataModule = () => {
	const {
		nodeItems,
		actions: { fetchAllData, setPagination, deleteData },
		isFetching,
		meta,
		pagination_tanstack,
	} = useNodeStore()
	const { pageIndex, pageSize } = pagination_tanstack
	const [shownAlertDel, setShownAlertDel] = useState({
		id: null,
		shown: false,
	})
	const { toast } = useToast()
	const total = meta?.total || 0
	const router = useRouter()

	const handleActionTable = (action: string, id: any) => {
		if (action === "update") {
			router.push("/data-master-node-data/update/" + id)
		} else if (action === "detail") {
			router.push("/data-master-node-data/detail/" + id)
		} else if (action === "delete") {
			//
			setShownAlertDel({
				id,
				shown: true,
			})
		}
	}

	const handleDeleteAction = (confirmType: string) => {
	
		if (confirmType === "deny") {
			setShownAlertDel({
				id: null,
				shown: false,
			})
		} else if (confirmType === "confirm") {
			shownAlertDel.id &&
				deleteData &&
				deleteData(shownAlertDel.id).then((result) => {
					setShownAlertDel({
						id: null,
						shown: false,
					})
					toast({
						title: result.message,
						variant: "success",
					})
				})
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
				<AlertConfirmDialog
					open={
						shownAlertDel.shown && shownAlertDel.id ? true : false
					}
					title="Are you sure want to delete this data ?"
					description="deleted data cannot be revert!"
					onAction={handleDeleteAction}
				/>
			</div>
		</div>
	)
}

export default NodeDataModule
