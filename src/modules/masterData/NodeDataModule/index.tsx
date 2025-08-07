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
import { useDebounce } from "@/hooks/use-debounce"
import useAuthStore from "@/store/authStore"
import ExportExcelButton from "@/components/buttons/ExportExcelButton"

const NodeDataModule = () => {
	const {
		nodeItems,
		querySearch,
		isFetchingDelete,
		isFetchingExportData,
		actions: {
			fetchAllData,
			setPagination,
			deleteData,
			setQuerySearch,
			exportExcel,
		},
		isFetching,
		meta,
		pagination_tanstack,
	} = useNodeStore()
	const { year_selected } = useAuthStore()
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

	const handleSearch = useDebounce((value: string) => {
		setQuerySearch && setQuerySearch(value)
	})

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
	}, [fetchAllData, pageIndex, pageSize, querySearch, year_selected])

	return (
		<div className="w-full">
			<div className="flex flex-row justify-between items-end">
				<div className="flex flex-row items-end space-x-2">
					<InputSearch
						label="Filter Data"
						isRequired={false}
						placeholder="Search..."
						onChange={(e) => handleSearch(e.target.value, "filter")}
					/>
					<ExportExcelButton
						label="Export Excel"
						loading={isFetchingExportData}
						onClick={() => {
							// nodeSelected && exportExcel(nodeSelected.id)
							exportExcel && exportExcel()
						}}
					/>
				</div>
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
					loading={isFetchingDelete}
				/>
			</div>
		</div>
	)
}

export default NodeDataModule
