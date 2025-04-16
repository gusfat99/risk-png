import TableRowActions from "@/components/TableRowActions"
import { DetailReportRiskMonitoring, ReportRiskMonitoring } from "@/types/riskMonitoring"
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

export const columnDetailReportRiskMonitoring = (
	onAction: (actionName: string, row: ReportRiskMonitoring) => void
): ColumnDef<DetailReportRiskMonitoring>[] => {
	const columns: ColumnDef<DetailReportRiskMonitoring>[] = [
		{
			header: "No",
			cell: ({ row, table }) => {
				const { pageIndex, pageSize } = table.getState().pagination

				return (pageIndex - 1) * pageSize + row.index + 1
			},
		},
		
		{
			accessorKey: "incident_name",
			header: "Incident Name",
			cell: ({ row }) => row.original.incident_name,
		},
		{
			accessorKey: "incident_location",
			header: "Incident Location",
			size: 90,
			cell: ({ row }) => row.original.incident_location,
		},
		{
			accessorKey: "incident_trigger",
			header: "Incident Trigger",
			cell: ({ row }) => row.original.incident_trigger,
		},
		
		{
			accessorKey: "sp_affected",
			header: "Saverity to Personel (SP) Affected",
			cell: ({ row }) => row.original.sp_affected,
		},
		{
			accessorKey: "se_affected",
			header: "Saverity to Environment (SE) Affected",
			cell: ({ row }) => row.original.se_affected,
		},
		{
			accessorKey: "sf_affected",
			header: "Saverity to Finance (SF) Affected",
			cell: ({ row }) => row.original.sf_affected,
		},
		{
			accessorKey: "srl_affected",
			header: "Saverity to Reputation & Legal (SRL) Affected",
			cell: ({ row }) => row.original.srl_affected,
		},
		{
			accessorKey: "sa_affected",
			header: "Saverity to Asset (SA) Affected",
			cell: ({ row }) => row.original.sa_affected,
		},
		{
			accessorKey: "spn_affected",
			header: "Saverity to Public Notification (SPN) Affected",
			cell: ({ row }) => row.original.spn_affected,
		},
	]

	return columns
}
