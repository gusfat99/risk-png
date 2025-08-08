import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import { UseColumnsProps } from "@/hooks/use-columns-severty"
import { HazopReport } from "@/types/riskResponse"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

interface ColumnsProps extends UseColumnsProps {}

export const useColumnsReportHazopResponseModule = ({
	onAction,
}: ColumnsProps) => {
	const column: ColumnDef<HazopReport>[] = useMemo(() => {
		const cols: ColumnDef<HazopReport>[] = [
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
				id: "node",
				accessorFn: (row) => row.node,
				meta: {
					className: "text-center",
				},
				header: ({ column }) => {
					return (
						<DataTableColumnHeader column={column} title="Node" />
					)
				},
				cell: ({ row }) => row.getValue("node"),
			},
			{
				id: "hazop",
				accessorFn: (row) => row.hazop_recom ?? "",
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Hazop Recommendation"
						/>
					)
				},
				size: 180,
				enableSorting: false,
				cell: ({ row }) => row.getValue("hazop"),
			},
			{
				id: "parameter",
				accessorFn: (row) => row.parameter_name ?? "",

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
				cell: ({ row }) => row.getValue("parameter"),
			},
			{
				id: "deviation",
				accessorFn: (row) => row.deviation_name ?? "",

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
				accessorFn: (row) => `${row.cause_name}`,
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
				accessorFn: (row) => row.consequence_name || "",
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
				enableSorting: false,
				accessorFn: (row) => row.existing_safeguard,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Existing safeguard"
						/>
					)
				},
				size: 420,
				cell: ({ row }) => (
					<ul className="flex flex-col gap-2">
						{row.original.existing_safeguard.length <= 0
							? "-"
							: row.original.existing_safeguard.map(
									(safeguard, index) => (
										<li key={index} className="text-xs">
											{safeguard}
										</li>
									)
							  )}
					</ul>
				),
			},
		]
		return cols
	}, [onAction])

	return { column }
}
