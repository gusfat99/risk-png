import TableRowActions from "@/components/TableRowActions"
import { ReportRiskMonitoring } from "@/types/riskMonitoring"
import { ColumnDef } from "@tanstack/react-table"

export const columnReportRiskMonitoring = (
	onAction: (actionName: string, row: ReportRiskMonitoring) => void
): ColumnDef<ReportRiskMonitoring>[] => {
	const columns: ColumnDef<ReportRiskMonitoring>[] = [
		{
			header: "No",
			cell: ({ row, table }) => {
				const { pageIndex, pageSize } = table.getState().pagination

				return (pageIndex - 1) * pageSize + row.index + 1
			},
		},
		{
			id: "id",

			header: () => {
				return <div className="flex justify-start">Action</div>
			},
			cell: ({ row }) => (
				<TableRowActions
					onAction={(actionName: string) => {
						onAction(actionName, row.original)
					}}
				/>
			),
		},
		{
			accessorKey: "node",
			header: "Node",
			cell: ({ row }) => row.original.node,
		},
		{
			accessorKey: "deviation",
			header: "Deviation",
			size: 90,
			cell: ({ row }) => row.original.deviation_name,
		},
		{
			accessorKey: "cause",
			header: "Cause Name",
			cell: ({ row }) => row.original.cause,
		},
		{
			accessorKey: "incident_count",
			header: "Incident Count",
			cell: ({ row }) => row.original.incident_count,
		},
		{
			accessorKey: "incident_severity",
			header: "Incident Count",
			cell: ({ row }) => row.original.incident_severity,
		},
	]

	return columns
}
