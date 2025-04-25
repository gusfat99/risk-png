"use client"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import useUserManagementStore from "@/store/userManagementStore"
import { User } from "@/types/user"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { columnsManagementUser } from "./columns"
import { useDebounce } from "@/hooks/use-debounce"

const ManagementUsersModule = () => {
	const {
		userItems,
		userRoleItems,
		querySearch,
		isFetchingDelete,
		actions: { fetchAllData, setPagination, deleteData, setUserSelected, fetchUserRoleData, setQuerySearch},
		isFetching,
		meta,
		pagination_tanstack,
	} = useUserManagementStore()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])
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
			setUserSelected && setUserSelected(id);
			router.push(basePathname + "/update/" + id)
		} else if (action === "detail") {
			router.push(basePathname + "/detail/" + id)
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
		if (userRoleItems.length === 0) {
			fetchUserRoleData();
		}
		
	}, [fetchAllData, pageIndex, pageSize, userRoleItems.length, querySearch])

	return (
		<div className="w-full">
			<div className="flex flex-row justify-between items-end">
				<InputSearch
					label="Filter Data"
					isRequired={false}
					placeholder="Search..."
					onChange={(e) => handleSearch(e.target.value, 'filter')}
				/>
				<Link href={basePathname+"/add"}>
					<Button variant="success">
						<Plus /> Add User
					</Button>
				</Link>
			</div>
			<div className="mt-4">
				<DataTable<User>
					columns={columnsManagementUser(handleActionTable)}
					data={userItems}
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

export default ManagementUsersModule
