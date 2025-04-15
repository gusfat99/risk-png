import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import { Button } from "@/components/ui/button"
import { hazopStatus } from "@/data/enumetions"
import { UseColumnsProps } from "@/hooks/use-columns-severty"
import { cn } from "@/lib/utils"
import { RiskResponse } from "@/types/riskResponse"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useColumnsReportRiskBySeverity = ({
	onAction,
}: UseColumnsProps) => {

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
				id: "risk_ranking_current",
				accessorFn: (row) => row.risk_ranking_current,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Risk Ranking (RR) Current"
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return (
						<div className="font-semibold text-center">
							{row.getValue("risk_ranking_current")}
						</div>
						// <></>
					)
				},
			},
			{
				id: "id",
				accessorFn: (row) => row.id,
				meta: {
					hiddenFilter: true,
				},
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
				id: "sp_expected",
				size: 180,
				enableSorting: false,
				accessorFn: (row) => row.sp_expected,
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
					return row.getValue("sp_expected")
				},
			},
			{
				id: "se_expected",
				accessorFn: (row) => row.se_expected,
				size: 180,
				enableSorting: false,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Severity to Environment (SE) Expected"}
						/>
					)
				},
				meta: {
					className: "text-center",
				},
				cell: ({ row }) => {
					return row.getValue("se_expected")
				},
			},
			{
				id: "sf_expected",
				accessorFn: (row) => row.sf_expected,
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
					return row.getValue("sf_expected")
				},
			},
			{
				id: "srl_expected",
				size: 180,
				enableSorting: false,
				accessorFn: (row) => row.srl_expected,
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
					return row.getValue("srl_expected")
				},
			},
			{
				id: "sa_expected",
				accessorFn: (row) => row.sa_expected,
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
					return row.getValue("srl_expected")
				},
			},
			{
				id: "spn_expected",
				accessorFn: (row) => row.spn_expected,
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
					return row.getValue("spn_expected")
				},
			},
			{
				id: "l_frequency_expected",
				size: 180,
				enableSorting: false,
				accessorFn: (row) => row.l_frequency_expected,
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
					return row.getValue("l_frequency_expected")
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
						<div
							className={cn(
								"p-2 border rounded-lg text-center border-muted",
								textColor
							)}
						>
							{hazop_status}
						</div>
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
	}, [onAction])

	return { column }
}
