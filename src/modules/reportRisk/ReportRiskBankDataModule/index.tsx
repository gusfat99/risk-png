"use client"
import ExportExcelButton from "@/components/buttons/ExportExcelButton"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { columnRiskBank, columnRiskBankFlatByConsequences } from "@/modules/RiskBankModule/columns"
import useAuthStore from "@/store/authStore"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { RiskBankFlat, RiskBankFlatByConsequence } from "@/types/riskDataBank"
import { useEffect } from "react"

const ReportRiskBankDataModule = () => {
	const {
		riskDataBankFlat,
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
					columns={columnRiskBankFlatByConsequences(() => {}, true)}
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
		</div>
	)
}

export default ReportRiskBankDataModule
