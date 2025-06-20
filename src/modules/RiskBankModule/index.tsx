"use client"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import { useToast } from "@/hooks/use-toast"
import useAuthStore from "@/store/authStore"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { RiskBankFlatByConsequence } from "@/types/riskDataBank"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { columnRiskBankFlatByConsequences, columnSafeguard } from "./columns"
import { Safeguard } from "@/types/safeguard"
import DialogMain from "@/components/dialogs/DialogMain"
import GeneralTable from "@/components/tables/GeneralTable"

const RiskBankModule = () => {
	const {
		riskDataBankFlatByConsequences,
		isFetchingDelete,
		actions: { fetchAllData, setPagination, deleteData, setQuerySearch },
		isFetching,
		meta,
		pagination_tanstack,
		querySearch,
	} = useRiskDataBankStore()
	const { year_selected } = useAuthStore()
	const { pageIndex, pageSize } = pagination_tanstack
	const [shownAlertDel, setShownAlertDel] = useState({
		id: null,
		shown: false,
	})
	const [showSafeguards, setShowSafeguars] = useState<{
		show: boolean
		item: Safeguard[] | null
	}>({
		item: null,
		show: false,
	})
	const { toast } = useToast()
	const total = meta?.total || 0
	const router = useRouter()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])

	const handleActionTable = (
		action: string,
		id: any,
		item?: RiskBankFlatByConsequence
	) => {
		console.log({ action })
		if (action === "update") {
			router.push(basePathname + "/update/" + id)
		} else if (action === "detail") {
			router.push(basePathname + "/detail/" + id)
		} else if (action === "delete") {
			//
			setShownAlertDel({
				id,
				shown: true,
			})
		} else if (action === "view_safeguards") {
			if (item) {
				const safeguards = item.safeguards
				setShowSafeguars({
					item: safeguards,
					show: true,
				})
			} else {
				toast({
					variant: "default",
					title: "No Safeguard Selected",
				})
			}
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
					fetchAllData()
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
					onChange={(e) => {
						handleSearch(e.target.value, "filter")
					}}
				/>
				<Link href={basePathname + "/add"}>
					<Button variant="success">
						<Plus /> Add Risk Bank
					</Button>
				</Link>
			</div>
			<div className="mt-4">
				<DataTable<RiskBankFlatByConsequence>
					columns={columnRiskBankFlatByConsequences(
						handleActionTable
					)}
					data={riskDataBankFlatByConsequences}
					loading={isFetching}
					rowCount={total}
					manualPagination={true}
					onPaginationChange={setPagination}
					pagination={pagination_tanstack}
					tbodyWithCell={false}
					config={{
						getRowKey: (row) => row.uniqueKey,
					}}
					enableOnHoverIndicator={false}
				/>
			</div>
			<AlertConfirmDialog
				open={shownAlertDel.shown && shownAlertDel.id ? true : false}
				title="Are you sure want to delete this data ?"
				description="deleted data cannot be revert!"
				onAction={handleDeleteAction}
				loading={isFetchingDelete}
			/>
			<DialogMain
				open={showSafeguards.show}
				onOpenChange={(value) => {
					setShowSafeguars((prev) => ({
						...prev,
						show: value,
					}))
				}}
				title="Safeguards Data"
				size="2xl"
			>
				<GeneralTable
					columns={columnSafeguard()}
					data={showSafeguards.item || []}
				/>
			</DialogMain>
		</div>
	)
}

export default RiskBankModule
