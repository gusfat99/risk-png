import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import {
	CellInputReadOnly,
	MemoizedCellInput,
} from "@/components/inputs/InputCellTableDt"
import InputController from "@/components/inputs/InputController"
import TableRowActions from "@/components/TableRowActions"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FormField } from "@/components/ui/form"
import { EVIDENCE_PATHNAME_STORAGE } from "@/constants"
import { hazopStatus, riskMonitoringStatus } from "@/data/enumetions"
import { cn, riskRankColor } from "@/lib/utils"
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
import { FileDown, LucideEdit } from "lucide-react"
import Link from "next/link"
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
					className: "text-center",
				},
				size: 80,
				header: () => {
					return <div className="flex justify-center">Action</div>
				},
				cell: ({ row }) => (
					<TableRowActions
						acl={{
							canEdit: true,
							canView: true,
						}}
						onAction={(actionName: string) => {
							onAction && onAction(actionName, row.getValue("id"))
						}}
					>
						<DropdownMenuItem
							className="hover:cursor-pointer"
							onClick={() => {
								onAction &&
									onAction(
										"risk_response",
										row.getValue("id"),
										row.original
									)
							}}
						>
							<LucideEdit /> Fill Risk Response
						</DropdownMenuItem>
					</TableRowActions>
				),
			},
			{
				id: "parameter",
				accessorFn: (row) => row.parameters.name ?? "",
				size: 128,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Parameter"
						/>
					)
				},
				cell: ({ row }) => (
					<span className="break-words">
						{row.getValue("parameter")}
					</span>
				),
			},
			{
				id: "deviation",
				accessorFn: (row) => row.deviations.name ?? "",
				size: 128,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Deviation"
						/>
					)
				},
				cell: ({ row }) => (
					<span className="break-words">
						{row.getValue("deviation")}
					</span>
				),
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
				size: 520,
				enableSorting: false,
				cell: ({ row }) => (
					<ul className="!list-decimal">
						{row.original.existing_safeguard.map(
							(safeguard, key) => (
								<li key={key}>{safeguard}</li>
							)
						)}
					</ul>
				),
			},
			{
				id: "severity_current",
				accessorFn: (row) => row.id,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity (Current)"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 600,
				cell: ({ row }) => {
					return (
						<>
							<FormField
								control={form.control}
								name={`risks.${row.index}.risk_analyst_id`}
								render={({ field }) => (
									<InputController
										{...field}
										type="hidden"
										placeholder="Enter SP"
										className="!mt-0"
										readOnly
										hidden
									/>
								)}
							/>
							<div className="grid grid-cols-2 gap-2">
								<MemoizedCellInput
									name_code={"sp"}
									row={row}
									form={form}
									name="sp_current"
								/>
								<MemoizedCellInput
									name_code={"se"}
									row={row}
									form={form}
									name="se_current"
								/>
								<MemoizedCellInput
									name_code={"sf"}
									row={row}
									form={form}
									name="sf_current"
								/>
								<MemoizedCellInput
									name_code={"srl"}
									row={row}
									form={form}
									name="srl_current"
								/>
								<MemoizedCellInput
									name_code={"sa"}
									row={row}
									form={form}
									name="sa_current"
								/>
								<MemoizedCellInput
									name_code={"spn"}
									row={row}
									form={form}
									name="spn_current"
								/>
							</div>
						</>
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
				meta: {
					className: "text-center",
				},
				size: 180,
				enableSorting: false,
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							name_code={"l_frequency"}
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
						severty["sp_current"] || 0,
						severty["se_current"] || 0,
						severty["sf_current"] || 0,
						severty["srl_current"] || 0,
						severty["sa_current"] || 0,
						severty["spn_current"] || 0,
					]
					const likelihood = severty["l_frequency_current"] || 0
					const maxValSeverty = Math.max(...severties)
					const risk_ranking_current = maxValSeverty * likelihood
					return (
						<div
							className={cn(
								"font-semibold text-center",
								`${riskRankColor(risk_ranking_current)}`
							)}
						>
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
				id: "id_action",
				accessorFn: (row) => row.id,
				meta: {
					className: "text-center",
				},
				header: () => {
					return <div>Action</div>
				},
				size: 80,
				cell: ({ row }) => (
					<TableRowActions
						acl={{
							canEdit: true,
							canView: true,
							canDelete: false,
						}}
						onAction={(actionName: string) => {
							onAction && onAction(actionName, row.original)
						}}
					/>
				),
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
				id: "parameter",
				accessorFn: (row) => row.parameters.name ?? "",
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Parameter"
						/>
					)
				},
				size: 180,
				enableSorting: false,
				cell: ({ row }) => (
					<span className="break-words">
						{row.getValue("parameter")}
					</span>
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
				cell: ({ row }) => (
					<span className="break-words">
						{row.getValue("deviation")}
					</span>
				),
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
				cell: ({ row }) => <div>{row.getValue("consequence")}</div>,
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
				size: 600,
				enableSorting: false,
				cell: ({ row }) => (
					<div>{row.original.existing_safeguard.join(", ")}</div>
				),
			},

			{
				id: "severity_current",
				accessorFn: (row) => row.id,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity (Current)"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				size: 600,
				cell: ({ row }) => {
					return (
						<>
							<div className="grid grid-cols-2 gap-2">
								<CellInputReadOnly
									name_code={"sp"}
									value={row.original.sp_current}
									name="sp_current"
								/>
								<CellInputReadOnly
									name_code={"se"}
									value={row.original.se_current}
									name="se_current"
								/>
								<CellInputReadOnly
									name_code={"sf"}
									value={row.original.sf_current}
									name="sf_current"
								/>
								<CellInputReadOnly
									name_code={"srl"}
									value={row.original.srl_current}
									name="srl_current"
								/>
								<CellInputReadOnly
									name_code={"sa"}
									value={row.original.sa_current}
									name="sa_current"
								/>
								<CellInputReadOnly
									name_code={"spn"}
									value={row.original.spn_current}
									name="spn_current"
								/>
							</div>
						</>
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
						<div
							className={cn(
								"font-semibold text-center",
								`${riskRankColor(
									row.original.risk_ranking_current
								)}`
							)}
						>
							{row.getValue("risk_ranking_current")}
						</div>
					)
				},
			},
			{
				id: "severity_expected",
				size: 600,
				enableSorting: false,
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity (Expected)"}
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
							<div className="grid grid-cols-2 gap-2">
								<MemoizedCellInput
									name_code={"sp"}
									row={row}
									form={form}
									name="sp_expected"
								/>
								<MemoizedCellInput
									name_code={"se"}
									row={row}
									form={form}
									name="se_expected"
								/>
								<MemoizedCellInput
									name_code={"sf"}
									row={row}
									form={form}
									name="sf_expected"
								/>
								<MemoizedCellInput
									name_code={"srl"}
									row={row}
									form={form}
									name="srl_expected"
								/>
								<MemoizedCellInput
									name_code={"sa"}
									row={row}
									form={form}
									name="sa_expected"
								/>
								<MemoizedCellInput
									name_code={"spn"}
									row={row}
									form={form}
									name="spn_expected"
								/>
							</div>
						</React.Fragment>
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
							name_code={"l_frequency"}
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
					const severty = { ...form.watch("risks")[row.index] }
					const severties = [
						severty["sp_expected"] || 0,
						severty["se_expected"] || 0,
						severty["sf_expected"] || 0,
						severty["srl_expected"] || 0,
						severty["sa_expected"] || 0,
						severty["spn_expected"] || 0,
					]
					const likelihood = severty["l_frequency_expected"] || 0
					const maxValSeverty = Math.max(...severties)
					const risk_ranking_expected = maxValSeverty * likelihood
					return (
						<div
							className={cn(
								"font-semibold text-center",
								`${riskRankColor(risk_ranking_expected)}`
							)}
						>
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
					const hazop = hazopStatus.find(
						(x) => x.value === hazop_status
					)
					hazop_status = hazop?.label || "-"
					const textColor = hazop?.color || ""
					
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className={cn(textColor)}
									variant="outline"
								>
									{hazop?.icon && <hazop.icon />}
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
											"focus:text-secondary":
												status.color ===
												"text-secondary",
										})}
										key={status.value}
									>
										{<status.icon />} {status.label}
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
							title="Date Completed"
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
					className: "text-center",
				},
				header: () => {
					return <div>Action</div>
				},
				size: 80,
				cell: ({ row }) => (
					<TableRowActions
						onAction={(actionName: string) => {
							onAction && onAction(actionName, row.getValue("id"))
						}}
					/>
				),
			},
			{
				id: "parameter",
				accessorFn: (row) => row.parameters.name ?? "",
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Parameter"
						/>
					)
				},
				cell: ({ row }) => (
					<span className="break-words">
						{row.getValue("parameter")}
					</span>
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
				cell: ({ row }) => (
					<span className="break-words">
						{row.getValue("deviation")}
					</span>
				),
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
				id: "consequence",
				accessorFn: (row) => row.consequences.consequence || "",
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
				id: "failed_safeguards",
				accessorFn: (row) => row.failed_safeguards,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Related Safeguard Failure"
						/>
					)
				},
				size: 280,
				enableSorting: false,
				cell: ({ row }) => (
					<ul className="!list-decimal">
						{row.original.failed_safeguards.map(
							(safeguard, key) => (
								<li key={key}>{safeguard.safeguard}</li>
							)
						)}
					</ul>
				),
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
				id: "incident_date",
				accessorFn: (row) => row.incident_date,
				minSize: 250,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Incident Date"
						/>
					)
				},
				cell: ({ row }) => (
					<div>
						{format(row.getValue("incident_date"), "dd/MM/yyyy")}{" "}
						{row.original.incident_time}
					</div>
				),
			},
			{
				id: "name",
				accessorFn: (row) => row.name,
				minSize: 250,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Reported By"
						/>
					)
				},
				cell: ({ row }) => <div>{row.getValue("name")}</div>,
			},
			{
				id: "nip",
				accessorFn: (row) => row.nip,
				minSize: 120,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="NIP Reported"
						/>
					)
				},
				cell: ({ row }) => <div>{row.getValue("nip")}</div>,
			},
			{
				id: "reported_on",
				accessorFn: (row) => row.reported_on,
				minSize: 60,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Reported On"
						/>
					)
				},
				cell: ({ row }) => (
					<div>
						{format(row.getValue("reported_on"), "dd/MM/yyyy")}
					</div>
				),
			},
			{
				id: "action_taken",
				accessorFn: (row) => row.action_taken,
				minSize: 250,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Action Taken"
						/>
					)
				},
				cell: ({ row }) => <div>{row.getValue("action_taken")}</div>,
			},
			{
				id: "evidence",
				accessorFn: (row) => row.action_taken,
				minSize: 80,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Evidence"
						/>
					)
				},
				cell: ({ row }) =>
					row.original.evidence ? (
						<Link
							target="_blank"
							href={`${EVIDENCE_PATHNAME_STORAGE}/${row.original.evidence}`}
						>
							<Button
								type="button"
								size={"sm"}
								variant={"warning"}
							>
								<FileDown /> View
							</Button>
						</Link>
					) : (
						"-" // Menampilkan '-' jika tidak ada dokumen
					),
			},
			{
				id: "status",
				accessorFn: (row) => row.status,
				size: 160,
				enableSorting: false,
				meta: {
					className: "text-center",
				},
				header: "Status",
				cell: ({ row }) => {
					let status = row.original.status.toLowerCase()
					const statusRiskMonit = riskMonitoringStatus.find(
						(x) => x.value === status
					)
					status = statusRiskMonit?.label || "-"
					const textColor = statusRiskMonit?.color || ""

					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className={cn(textColor, "w-full")}
									variant="outline"
								>
									{statusRiskMonit?.icon && (
										<statusRiskMonit.icon />
									)}
									{status}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-52 ">
								{riskMonitoringStatus.map((status) => (
									<DropdownMenuItem
										onClick={() => {
											onAction &&
												onAction(
													"status",
													row.original.id,
													status.value as unknown as any
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
											"focus:text-secondary":
												status.color ===
												"text-secondary",
										})}
										key={status.value}
									>
										{<status.icon />} {status.label}
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
				id: "severity_affected",
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
			
				enableSorting: false,
				enableResizing: false,
				size: 600,
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
							<div className="grid grid-cols-2 gap-2">
								<MemoizedCellInput
									name_code={"sp"}
									row={row}
									form={form}
									name="sp_affected"
								/>
								<MemoizedCellInput
									name_code={"se"}
									row={row}
									form={form}
									name="se_affected"
								/>
								<MemoizedCellInput
									name_code={"sf"}
									row={row}
									form={form}
									name="sf_affected"
								/>
								<MemoizedCellInput
									name_code={"srl"}
									row={row}
									form={form}
									name="srl_affected"
								/>
								<MemoizedCellInput
									name_code={"sa"}
									row={row}
									form={form}
									name="sa_affected"
								/>
								<MemoizedCellInput
									name_code={"spn"}
									row={row}
									form={form}
									name="spn_affected"
								/>
							</div>
						</React.Fragment>
					)
				},
			}
		]
		return cols
	}, [form, onAction])

	return {
		column,
	}
}
