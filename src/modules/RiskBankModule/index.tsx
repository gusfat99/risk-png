"use client"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { RiskBankFlat } from "@/types/riskDataBank"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { columnRiskBank } from "./columns"

const RiskBankModule = () => {
	const {
      riskDataBankFlat,
		actions: { fetchAllData, setPagination, deleteData },
		isFetching,
		meta,
		pagination_tanstack,
	} = useRiskDataBankStore()
	const { pageIndex, pageSize } = pagination_tanstack
	const [shownAlertDel, setShownAlertDel] = useState({
		id: null,
		shown: false,
	})
	const { toast } = useToast()
	const total = meta?.total || 0
	const router = useRouter()
		const pathname = usePathname()
		const splitPathname = pathname.split("/")
	
		const basePathname = "/".concat(splitPathname[1])

	const handleActionTable = (action: string, id: any) => {
		if (action === "update") {
			router.push(basePathname+"/update/" + id)
		} else if (action === "detail") {
			router.push(basePathname+"/detail/" + id)
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
				<Link href={basePathname+"/add"}>
					<Button variant="success">
						<Plus /> Add Risk Bank
					</Button>
				</Link>
			</div>
			<div className="mt-4">
				<DataTable<RiskBankFlat>
					columns={columnRiskBank(handleActionTable)}
					data={riskDataBankFlat}
					loading={isFetching}
					rowCount={total}
					manualPagination={true}
					onPaginationChange={setPagination}
					pagination={pagination_tanstack}
					tbodyWithCell={false}
					config={{
						getRowKey: (row) => row.uniqueKey

					}}
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

export default RiskBankModule
