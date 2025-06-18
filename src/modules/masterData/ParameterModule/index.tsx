"use client"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"
import DataTable from "@/components/DataTable"
import DialogMain from "@/components/dialogs/DialogMain"
import InputSearch from "@/components/inputs/InputSearch"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import { useToast } from "@/hooks/use-toast"
import useAuthStore from "@/store/authStore"
import useParameterStore from "@/store/parameterStore"
import { Parameter } from "@/types/riskDataBank"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { columnParamter } from "../columns"
import ParameterForm from "./ParameterForm"

const ParameterModule = () => {
	const {
		parameterItems,
		querySearch,
		isFetchingDelete,
		actions: { fetchAllData, setPagination, deleteData, setQuerySearch },
		isFetching,
		meta,
		pagination_tanstack,
	} = useParameterStore()
	const [modal, setModal] = useState<{
		open: boolean
		item: Parameter | null
	}>({
		open: false,
		item: null,
	})
	const { year_selected } = useAuthStore()
	const { pageIndex, pageSize } = pagination_tanstack
	const [shownAlertDel, setShownAlertDel] = useState({
		id: null,
		shown: false,
	})
	const { toast } = useToast()
	const total = meta?.total || 0
	const router = useRouter()

	const handleActionTable = (action: string, item: Parameter) => {
		if (action === "update") {
			setModal({
				open: true,
				item: item,
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
				<InputSearch
					label="Filter Data"
					isRequired={false}
					placeholder="Search..."
					onChange={(e) => handleSearch(e.target.value, "filter")}
				/>

				<Button
					variant="success"
					onClick={() => {
						setModal({
							open: true,
							item: null,
						})
					}}
				>
					<Plus /> Add Parameter
				</Button>
			</div>
			<div className="mt-4">
				<DataTable<Parameter>
					columns={columnParamter(handleActionTable)}
					data={parameterItems}
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
			<DialogMain
				open={modal.open}
				onOpenChange={(value) => {
					setModal((prev) => ({
						...prev,
						open: value,
					}))
				}}
				title="Parameter"
				size="lg"
			>
				<ParameterForm
					isEdit={modal.item ? true : false}
					id={modal.item?.id}
					parameterName={modal.item?.name}
					afterSaveSuccesfull={() => {
						setModal((prev) => ({
							...prev,
							open: false,
							item: null,
						}))
					}}
				/>
			</DialogMain>
		</div>
	)
}

export default ParameterModule
