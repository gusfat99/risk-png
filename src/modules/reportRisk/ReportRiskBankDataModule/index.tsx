"use client"
import ExportExcelButton from "@/components/buttons/ExportExcelButton"
import DataTable from "@/components/DataTable"
import DialogMain from "@/components/dialogs/DialogMain"
import InputSearch from "@/components/inputs/InputSearch"
import GeneralTable from "@/components/tables/GeneralTable"
import { toast } from "@/hooks/use-toast"
import {
	columnRiskBankFlatByConsequences,
	columnSafeguard,
} from "@/modules/RiskBankModule/columns"
import useAuthStore from "@/store/authStore"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { RiskBankFlatByConsequence } from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"
import { useEffect, useState } from "react"

const ReportRiskBankDataModule = () => {
	const {
		riskDataBankFlatByConsequences,
		actions: { fetchAllData, setPagination, exportExcel },
		isFetching,
		isFetchingExportData,
		meta,
		pagination_tanstack,
	} = useRiskDataBankStore()
	const { pageIndex, pageSize } = pagination_tanstack
	const total = meta?.total || 0
	const { year_selected } = useAuthStore()
	const [showSafeguards, setShowSafeguars] = useState<{
		show: boolean
		item: Safeguard[] | null
	}>({
		item: null,
		show: false,
	})

	const handleAction = (
		actionName: string,
		_: any,
		item?: RiskBankFlatByConsequence
	) => {
		if (actionName === "view_safeguards") {
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

	useEffect(() => {
		fetchAllData()
	}, [fetchAllData, pageIndex, pageSize, year_selected])

	return (
		<div className="w-full">
			<div className="flex flex-row gap-4 items-end">
				<InputSearch
					label="Filter Data"
					isRequired={false}
					placeholder="Search..."
				/>
				<ExportExcelButton
					label="Export Excel"
					loading={isFetchingExportData}
					onClick={() => {
						exportExcel && exportExcel()
					}}
				/>
			</div>
			<div className="mt-4">
				<DataTable<RiskBankFlatByConsequence>
					columns={columnRiskBankFlatByConsequences(handleAction, true)}
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
				/>
			</div>
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

export default ReportRiskBankDataModule
