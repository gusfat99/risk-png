"use client"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"
import AddButton from "@/components/buttons/AddButton"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { useDebounce } from "@/hooks/use-debounce"
import { useToast } from "@/hooks/use-toast"
import useConfigAclMenu from "@/store/configAclMenu"
import { Menu } from "@/types/configAclMenu"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { columnMenu } from "../columns"

const ConfigMenuModule = () => {
	const {
		actions: { fetchMenu, setQuerySearchMenu, setPagination, deleteMenu },
		isFetching,
		isFetchingDelete,
		menuItems,
		meta,
		pagination_tanstack,
	} = useConfigAclMenu()
	const { pageIndex, pageSize } = pagination_tanstack
	const pathname = usePathname()
	const splitPathname = pathname.split("/")
	const { toast } = useToast()
	const total = meta?.total || 0
	const router = useRouter()
	const basePathname = "/".concat(splitPathname[1])
	const [shownAlertDel, setShownAlertDel] = React.useState<{
		shown: boolean
		id: number | null
	}>({
		shown: false,
		id: null,
	})

	const handleSearch = useDebounce((value: string) => {
		setQuerySearchMenu && setQuerySearchMenu(value)
	})

	const handleActionTable = (actionName: string, id: any) => {
		if (actionName === "update") {
			router.push(`${basePathname}/update/${id}`)
		} else if (actionName === "delete") {
			setShownAlertDel({
				id: id,
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
				deleteMenu &&
				deleteMenu(shownAlertDel.id).then((result) => {
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
		fetchMenu()
	}, [fetchMenu, pageIndex, pageSize, setQuerySearchMenu])

	return (
		<div className="w-full">
			<div className="flex flex-row justify-between items-end">
				<InputSearch
					label="Filter Data"
					isRequired={false}
					placeholder="Search..."
					onChange={(e) => handleSearch(e.target.value, "filter")}
				/>
				<Link href={`${basePathname}/add`}>
					<AddButton label="Add Menu" />
				</Link>
			</div>
			<div className="mt-4">
				<DataTable<Menu>
					columns={columnMenu(handleActionTable)}
					data={menuItems}
					loading={isFetching}
					rowCount={total}
					manualPagination={true}
					onPaginationChange={(updater) => {
						setPagination &&
							setPagination(
								updater,
								"menu" // specify type for pagination
							)
					}}
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

export default ConfigMenuModule
