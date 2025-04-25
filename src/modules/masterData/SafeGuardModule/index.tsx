"use client"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import useSafeguardStore from "@/store/safeguradStore"
import { Safeguard } from "@/types/safeguard"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { columnSafeguard } from "../columns"
import { useDebounce } from "@/hooks/use-debounce"

const SafeguardModule = () => {
	const {
		safeguardItems,
		querySearch,
		isFetchingDelete,
		actions: { fetchAllData, setPagination, deleteData, setQuerySearch },
		isFetching,
		meta,
		pagination_tanstack,
	} = useSafeguardStore()
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
			router.push("/data-master-safeguards/update/" + id)
		} else if (action === "detail") {
			router.push("/data-master-safeguards/detail/" + id)
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

	const handleSearch = useDebounce((value : string) => {setQuerySearch && setQuerySearch(value)})

	useEffect(() => {
		fetchAllData()
	}, [fetchAllData, pageIndex, pageSize, querySearch])

	return (
		<div className="w-full">
			<div className="flex flex-row justify-between items-end">
				<InputSearch
					label="Filter Data"
					isRequired={false}
					placeholder="Search..."
					onChange={(e) => handleSearch(e.target.value, 'filter')}
				/>
				<Link href={"/data-master-safeguards/add"}>
					<Button variant="success">
						<Plus /> Add Safeguard
					</Button>
				</Link>
			</div>
			<div className="mt-4">
				<DataTable<Safeguard>
					columns={columnSafeguard(handleActionTable)}
					data={safeguardItems}
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

export default SafeguardModule
