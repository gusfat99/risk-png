"use client"
import ExportExcelButton from "@/components/buttons/ExportExcelButton"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { useToast } from "@/hooks/use-toast"
import { columnRiskBank } from "@/modules/RiskBankModule/columns"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { RiskBankFlat } from "@/types/riskDataBank"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ReportRiskBankDataModule = () => {
	const {
		riskDataBankFlat,
		actions: { fetchAllData, setPagination, exportExcel },
		isFetching,
		isFetchingExportData,
		meta,
		pagination_tanstack,
	} = useRiskDataBankStore()
	const { pageIndex, pageSize } = pagination_tanstack
	const total = meta?.total || 0

	useEffect(() => {
		fetchAllData()
	}, [fetchAllData, pageIndex, pageSize])

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
				<DataTable<RiskBankFlat>
					columns={columnRiskBank(() => {}, true)}
					data={riskDataBankFlat}
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
