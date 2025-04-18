import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import InputController from "@/components/inputs/InputController"
import InputSelectController from "@/components/inputs/InputSelectController"
import TableRowActions from "@/components/TableRowActions"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FormField } from "@/components/ui/form"
import { hazopStatus } from "@/data/enumetions"
import { fieldsInputSeverity } from "@/data/severity"
import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import {
	RiskAnalysis,
	RiskAnalysisSevertyMultipleForm,
} from "@/types/riksAnalyst"
import {
	RiskMonitoring,
	RiskMonitoringSevertyMultipleForm,
} from "@/types/riskMonitoring"
import {
	RiskResponse,
	RiskResponseSevertyExpectMultipleSchemaForm,
} from "@/types/riskResponse"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import React, { useMemo } from "react"
import { UseFormReturn } from "react-hook-form"

export interface UseColumnsProps {
	onAction?: (actionName: string, value: any, value2?: any) => void
}

export interface UseColumnsRiskAnalystProps extends UseColumnsProps {
	form: UseFormReturn<RiskAnalysisSevertyMultipleForm>
}

export interface UseColumnsRiskMonitoringProps extends UseColumnsProps {
	form: UseFormReturn<RiskMonitoringSevertyMultipleForm>
}

export interface UseColumnsRiskResponseProps extends UseColumnsProps {
	form: UseFormReturn<RiskResponseSevertyExpectMultipleSchemaForm>
}

const CellInput = ({ row, form, name }: { row: any; form: any; name: any }) => {
	const rowId = row.index
	const { likelyhood_options, severity_map_options } = useSettingMatrixStore()

	const debouncedUpdate = useDebounce((key: any, value: any) => {
		form.setValue(key, value)
	},100)
	const fieldSeverity = fieldsInputSeverity.find((field) =>
		name.includes(field.name_code)
	)
	let items = severity_map_options
	if (fieldSeverity) {
		items = items
			.filter(
				(item) =>
					item.saverity_row_id?.toString() ===
					fieldSeverity.col_id?.toString()
			)
			.map((x) => ({
				...x,
				value: parseInt(x.value),
			}))
	}
	if (name.includes("l_frequency")) {
		items = likelyhood_options.map((x) => ({
			...x,
			value: parseInt(x.value),
		}))
	}

	return (
		<FormField
			control={form.control}
			name={`risks.${rowId}.${name}`}
			render={({ field }) => (
				<InputSelectController
					field={field}
					defaultValue={field.value}
					placeholder="Select SP"
					items={items}
					onChange={(value) => {
						debouncedUpdate(
							`risks.${rowId}.${name}`,
							parseInt(value) as any
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

export const useColumnsRiskAnalyst = ({
	onAction,
	form,
}: UseColumnsRiskAnalystProps): {
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
				size: 60,
				enableSorting: false,
			},
			{
				id: "id",
				accessorFn: (row) => row.id,
				meta: {
					className : "text-center"
				},
				size : 80,
				header: () => {
					return <div className="flex justify-center">Action</div>
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
				accessorFn: (row) => row.deviations.name ?? "",
				size: 120,
				enableSorting: false,
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
				header: "Cause",
				size: 280,
				enableSorting: false,
				cell: ({ row }) => <div>{row.getValue("cause")}</div>,
			},
			{
				id: "consequence",
				accessorFn: (row) => row.consequence?.consequence || "",
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Consequence"
						/>
					)
				},
				size: 280,
				enableSorting: false,
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
				size: 280,
				enableSorting: false,
				cell: ({ row }) => (
					<ul>
						{row.original.existing_safeguard.map((safeguard, key) => (
							<li key={key}>{safeguard.safeguard}</li>
						))}
					</ul>
				),
			},
			{
				id: "sp_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Personel (SP)"}
						/>
					)
				},
				meta: {
					className: "text-center",
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
							title={"Severity to Environment (EP)"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
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
							title={"Severity to Finance (SF)"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
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
							title={"Severity to Reputation & Ilegal (SRL)"}
						/>
					)
				},
				meta: {
					className: "text-center",
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
				size: 180,
				enableSorting: false,
			},
			{
				id: "sa_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Asset (SA)"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
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
							title={"Severity to Public Notification (SPN)"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
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
							title={"Likelyhood Frequency Kejadian (L)"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
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
				meta: {
					className: "text-center",
				},
				size: 120,
				enableSorting: false,
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
				size: 280,
				enableSorting: false,
				cell: ({ row }) => <div>{row.getValue("remark_analyst")}</div>,
			},
		]
		return cols
	}, [form])

	return {
		column,
	}
}

export const useColumnsRiskResponse = ({
	onAction,
	form,
}: UseColumnsRiskResponseProps): {
	column: ColumnDef<RiskResponse>[]
} => {
	const column: ColumnDef<RiskResponse>[] = useMemo(() => {
		const cols: ColumnDef<RiskResponse>[] = [
			{
				header: "No",
				cell: ({ row, table }) => {
					const { pageIndex, pageSize } = table.getState().pagination

					return (pageIndex - 1) * pageSize + row.index + 1
				},
				size: 60,
				enableSorting: false,
			},
			{
				id: "id",
				accessorFn: (row) => row.id,
			
				header: () => {
					return (
						<div className="flex justify-start">
							HAZOP Recomendation
						</div>
					)
				},
				cell: ({ row }) => (
					<Button
						variant={"secondary_100"}
						onClick={() =>
							onAction && onAction("hazop", row.original)
						}
						type="button"
					>
						Hazop
					</Button>
				),
			},
			{
				id: "deviation",
				accessorFn: (row) => row.deviations.name ?? "",

				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Deviation"
						/>
					)
				},
				size: 180,
				enableSorting: false,
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
				size: 280,
				enableSorting: false,
				cell: ({ row }) => <div>{row.getValue("cause")}</div>,
			},
			{
				id: "consequence",
				accessorFn: (row) => row.consequence?.consequence || "",
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Consequence"
						/>
					)
				},
				size: 280,
				enableSorting: false,
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
					<div>{row.original.existing_safeguard.join(", ")}</div>
				),
			},
			{
				id: "sp_current",
				accessorFn: (row) => row.sp_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Personel (SP) Current"}
						/>
					)
				},
				enableSorting: false,
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{" "}
							{row.getValue("sp_current")}
						</div>
					)
				},
			},
			{
				id: "se_current",
				accessorFn: (row) => row.se_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Environment (EP) Current"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{" "}
							{row.getValue("se_current")}
						</div>
					)
				},
			},
			{
				id: "sf_current",
				accessorFn: (row) => row.sf_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Finance (SF) Current"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{row.getValue("sf_current")}
						</div>
					)
				},
			},
			{
				id: "srl_current",
				accessorFn: (row) => row.srl_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Severity to Reputation & Ilegal (SRL) Current"
							}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{row.getValue("srl_current")}
						</div>
					)
				},
			},
			{
				id: "sa_current",
				accessorFn: (row) => row.sa_current,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Asset (SA) Current"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{" "}
							{row.getValue("sa_current")}
						</div>
					)
				},
			},
			{
				id: "spn_current",
				accessorFn: (row) => row.spn_current,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Severity to Public Notification (SPN) Current"
							}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{row.getValue("spn_current")}
						</div>
					)
				},
			},
			{
				id: "l_frequency_current",
				accessorFn: (row) => row.l_frequency_current,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Likelihood Frequency Kejadian (L) Current"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{row.getValue("l_frequency_current")}
						</div>
					)
				},
			},
			{
				id: "risk_ranking_current",
				size: 180,
				enableSorting: false,
				accessorFn: (row) => row.risk_ranking_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Rank Risk (RR) Current"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{row.getValue("risk_ranking_current")}
						</div>
					)
				},
			},
			{
				id: "sp_expect_risk_analyst_id",
				size: 180,
				enableSorting: false,
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Personel (SP) Expected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<React.Fragment>
							<FormField
								control={form.control}
								name={`risks.${row.index}.id`}
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
								name="sp_expected"
							/>
						</React.Fragment>
					)
				},
			},
			{
				id: "se_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Environment (EP) Expected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="se_expected"
						/>
					)
				},
			},
			{
				id: "sf_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Finance (SF) Expected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sf_expected"
						/>
					)
				},
			},
			{
				id: "srl_expect_risk_analyst_id",
				size: 180,
				enableSorting: false,
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Severity to Reputation & Ilegal (SRL) Expected"
							}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="srl_expected"
						/>
					)
				},
			},
			{
				id: "sa_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Asset (SA) Expected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sa_expected"
						/>
					)
				},
			},
			{
				id: "spn_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Severity to Public Notification (SPN) Expected"
							}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="spn_expected"
						/>
					)
				},
			},
			{
				id: "l_frequency_expect_risk_analyst_id",
				size: 180,
				enableSorting: false,
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Likelihood Frequency Kejadian (L) Expected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="l_frequency_expected"
						/>
					)
				},
			},
			{
				id: "risk_ranking_expected",
				accessorFn: (row) => row.risk_ranking_expected,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Risk Ranking (RR) Expected"
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					const severty = {...form.watch("risks")[row.index]}
					const severties = [
						severty["sa_expected"],
						severty["sp_expected"],
						severty["se_expected"],
						severty["spn_expected"],
						severty["srl_expected"],
					]
					const maxValSeverty = Math.max(...severties)
					const risk_ranking_expected =
						maxValSeverty * severty["l_frequency_expected"]
					return (
						<div className="font-semibold text-center">
							{risk_ranking_expected}
						</div>
						// <></>
					)
				},
			},
			{
				id: "hazop_status",
				accessorFn: (row) => row.hazop_completed,
				size: 120,
				enableSorting: false,
				meta: {
					className: "text-center",
				},
				header: "Hazop Status",
				cell: ({ row }) => {
					let hazop_status =
						row.original.hazop_completed.toLowerCase()
					hazop_status =
						hazopStatus.find((x) => x.value === hazop_status)
							?.label || "-"
					let textColor = "text-gray-500"
					if (hazop_status?.toLowerCase() === "done") {
						textColor = "text-success"
					} else if (hazop_status?.toLowerCase() === "on progress") {
						textColor = "text-warning-700"
					}

					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className={cn(textColor)}
									variant="outline"
								>
									{hazop_status}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-52">
								{hazopStatus.map((status) => (
									<DropdownMenuItem
										onClick={() => {
											onAction &&
												onAction(
													"hazop_status",
													row.original,
													status.value
												)
										}}
										className={cn("font-light", {
											"focus:text-gray-500":
												status.color ===
												"text-gray-500",
											"focus:text-warning-700":
												status.color ===
												"text-warning-600",
											"focus:text-success":
												status.color === "text-success",
										})}
										key={status.value}
									>
										{status.label}
									</DropdownMenuItem>
								))}

								{/* <DropdownMenuLabel>Change Hazop Status</DropdownMenuLabel> */}
							</DropdownMenuContent>
						</DropdownMenu>
						// <></>
					)
				},
			},
			{
				id: "date_finished",
				enableSorting: false,
				accessorFn: (row) => row.date_finished,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Date Finished"
						/>
					)
				},
				cell: ({ row }) => (
					<div className="text-center">
						{row.getValue("date_finished")
							? format(
									row.getValue("date_finished"),
									"dd/MM/yyyy"
							  )
							: "-"}
					</div>
				),
			},
			{
				id: "remark_analyst",
				enableSorting: false,
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
	}, [form, onAction])

	return {
		column,
	}
}

export const useColumnsMonitoring = ({
	onAction,
	form,
}: UseColumnsRiskMonitoringProps): {
	column: ColumnDef<RiskMonitoring>[]
} => {
	const column: ColumnDef<RiskMonitoring>[] = useMemo(() => {
		const cols: ColumnDef<RiskMonitoring>[] = [
			{
				header: "No",
				cell: ({ row, table }) => {
					const { pageIndex, pageSize } = table.getState().pagination

					return (pageIndex - 1) * pageSize + row.index + 1
				},
				size: 60,
				enableSorting: false,
			},
			{
				id: "id",
				accessorFn: (row) => row.id,
				meta: {
					className : "text-center"
				},
				header: () => {
					return <div >Action</div>
				},
				size : 80,
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
				accessorFn: (row) => row.deviations.name ?? "",
				enableSorting: false,
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
				minSize: 250,
				enableSorting: false,
				accessorFn: (row) => `${row.causes?.cause}`,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader column={column} title="Cause" />
					)
				},
				cell: ({ row }) => <div>{row.getValue("cause")}</div>,
			},
			{
				id: "incident_name",
				enableSorting: false,
				minSize: 250,
				accessorFn: (row) => row.incident_name,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Incident Name"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("incident_name")}</div>
					// <></>
				),
			},
			{
				id: "incident_location",

				enableSorting: false,
				accessorFn: (row) => row.incident_location,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Incident Location"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("incident_location")}</div>
				),
			},
			{
				id: "incident_trigger",
				accessorFn: (row) => row.incident_trigger,
				minSize: 250,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Incident Trigger"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("incident_trigger")}</div>
				),
			},
			{
				id: "sp_affected_monitoring_id",
				accessorFn: (row) => row.sp_affected,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Personel (SP) Affected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				// meta: {
				// 	className : "max-w-[130px]",
				// },
				enableSorting: false,
				enableResizing: false,
				// size: 180,
				size: 180,
				cell: ({ row }) => {
					return (
						<React.Fragment>
							<FormField
								control={form.control}
								name={`risks.${row.index}.id`}
								render={({ field }) => (
									<InputController
										{...field}
										type="hidden"
										placeholder="Enter"
										readOnly
										hidden
									/>
								)}
							/>
							<MemoizedCellInput
								row={row}
								form={form}
								name="sp_affected"
							/>
						</React.Fragment>
					)
				},
			},
			{
				id: "se_affected_monitoring_id",
				accessorFn: (row) => row.id,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Environment (EP) Affected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="se_affected"
						/>
					)
				},
			},
			{
				id: "sf_affected_monitoring_id",
				accessorFn: (row) => row.id,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Finance (SF) Affected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sf_affected"
						/>
					)
				},
			},
			{
				id: "srl_affected_monitoring_id",
				accessorFn: (row) => row.id,
				enableSorting: false,
				size: 180,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Severity to Reputation & Ilegal (SRL) Affected"
							}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="srl_affected"
						/>
					)
				},
			},
			{
				id: "sa_affected_monitoring_id",
				accessorFn: (row) => row.id,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Asset (SA) Affected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 180,
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sa_affected"
						/>
					)
				},
			},
			{
				id: "spn_affected_monitoring_id",
				accessorFn: (row) => row.id,
				enableSorting: false,
				header: "Severity to Public Notification (SPN) Affected",
				size: 180,
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="spn_affected"
						/>
					)
				},
			},
		]
		return cols
	}, [form, onAction])

	return {
		column,
	}
}
