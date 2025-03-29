import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import InputController from "@/components/inputs/InputController"
import TableRowActions from "@/components/TableRowActions"
import { FormField } from "@/components/ui/form"
import { useDebounce } from "@/hooks/use-debounce"
import {
	RiskAnalysis,
	RiskAnalysisSevertyForm,
	RiskAnalysisSevertyMultipleForm,
} from "@/types/riksAnalys"
import { ColumnDef } from "@tanstack/react-table"
import React, { useMemo } from "react"
import { UseFormReturn } from "react-hook-form"

interface UseColumnsProps {
	onAction?: (actionName: string, id: any) => void
	form: UseFormReturn<RiskAnalysisSevertyMultipleForm>
}

const CellInput = ({
	row,
	form,
	name,
}: {
	row: any
	form: UseFormReturn<RiskAnalysisSevertyMultipleForm>
	name: keyof RiskAnalysisSevertyForm
}) => {
	const rowId = row.index

	const debouncedUpdate = useDebounce((key: any, value: any) => {
		form.setValue(key, value)
	})

	return (
		<FormField
			control={form.control}
			name={`risks.${rowId}.${name}`}
			render={({ field }) => (
				<InputController
					defaultValue={field.value}
					type="number"
					placeholder="Enter SP"
					onChange={(e) => {
						debouncedUpdate(
							`risks.${rowId}.${name}`,
							parseInt(e.target.value) as any
						)
					}}
				/>
			)}
		/>
	)
}

const MemoizedCellInput = React.memo(
	CellInput,
	(prev, next) => prev.row.id === next.row.id
)

const useColumnsRiskAnalyst = ({
	onAction,
	form,
}: UseColumnsProps): {
	column: ColumnDef<RiskAnalysis>[]
} => {
	const column: ColumnDef<RiskAnalysis>[] = useMemo(() => {
		const cols: ColumnDef<RiskAnalysis>[] = [
			{
				header: "No",
				cell: ({ row, table }) => {
					const { pageIndex, pageSize } = table.getState().pagination

					return (pageIndex - 1) * pageSize + row.index + 1
				},
			},
			{
				id: "id",
				accessorFn: (row) => row.id,
				meta: {
					hiddenFilter: true,
				},
				header: () => {
					return <div className="flex justify-start">Action</div>
				},
				cell: ({ row }) => (
					<TableRowActions
						onAction={(actionName: string) => {
							onAction && onAction(actionName, row.getValue("id"))
						}}
					/>
				),
			},
			{
				id: "deviation",
				accessorFn: (row) => row.deviations.deviation ?? "",
				meta: {
					hiddenFilter: true,
				},
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Deviation"
						/>
					)
				},
				cell: ({ row }) => row.getValue("deviation"),
			},
			{
				id: "cause",
				accessorFn: (row) => `${row.causes.cause}`,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader column={column} title="Cause" />
					)
				},
				cell: ({ row }) => <div>{row.getValue("cause")}</div>,
			},
			{
				id: "consequence",
				accessorFn: (row) => row.consequences.consequence,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Consequence"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("consequence")}</div>
					// <></>
				),
			},
			{
				id: "existing_safeguard",
				accessorFn: (row) => row.existing_safeguard,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Existing safeguard"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("existing_safeguard")}</div>
				),
			},
			{
				id: "sp_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Personel (SP)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<React.Fragment>
							<FormField
								control={form.control}
								name={`risks.${row.index}.risk_analyst_id`}
								render={({ field }) => (
									<InputController
										{...field}
										type="hidden"
										placeholder="Enter SP"
										readOnly
										hidden
									/>
								)}
							/>
							<MemoizedCellInput
								row={row}
								form={form}
								name="sp_current"
							/>
						</React.Fragment>
					)
				},
			},
			{
				id: "se_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Environment (EP)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="se_current"
						/>
					)
				},
			},
			{
				id: "sf_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Finance (SF)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sf_current"
						/>
					)
				},
			},
			{
				id: "srl_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Reputation & Ilegal (SRL)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="srl_current"
						/>
					)
				},
			},
			{
				id: "sa_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Asset (SA)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sa_current"
						/>
					)
				},
			},
			{
				id: "spn_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Public Notification (SPN)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="spn_current"
						/>
					)
				},
			},
			{
				id: "l_frequency_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Likelihood Frequency Kejadian (L)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="l_frequency_current"
						/>
					)
				},
			},
			{
				id: "risk_rank",
				accessorFn: (row) => row.risk_ranking_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Risk Ranking (RR)"
						/>
					)
				},
				cell: ({ row }) => {
					const severty = form.watch("risks")[row.index]
					const severties = [
						severty["sa_current"],
						severty["sp_current"],
						severty["se_current"],
						severty["spn_current"],
						severty["srl_current"],
					]
					const maxValSeverty = Math.max(...severties)
					const risk_ranking_current =
						maxValSeverty * severty["l_frequency_current"]
					return (
						<div className="font-semibold text-center">
							{risk_ranking_current}
						</div>
						// <></>
					)
				},
			},
			{
				id: "remark_analyst",
				accessorFn: (row) => row.remark_analyst,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Notes Special Condition / Remarks"
						/>
					)
				},
				cell: ({ row }) => <div>{row.getValue("remark_analyst")}</div>,
			},
		]
		return cols
	}, [form])

	return {
		column,
	}
}

export default useColumnsRiskAnalyst
