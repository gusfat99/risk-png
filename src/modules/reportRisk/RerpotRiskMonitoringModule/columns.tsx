import TableRowActions from "@/components/TableRowActions"
import {
	DetailReportRiskMonitoring,
	ReportRiskMonitoring,
} from "@/types/riskMonitoring"
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
			size: 60,
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
					acl={{
						canView: true,
						canEdit: false,
						canDelete: false,
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
			accessorKey: "parameter",
			header: "Parameter",
			size: 120,
			cell: ({ row }) => row.original.parameter_name,
		},
		{
			accessorKey: "deviation",
			header: "Deviation",
			size: 120,
			cell: ({ row }) => row.original.deviation_name,
		},
		{
			accessorKey: "cause",
			header: "Cause Name",
			cell: ({ row }) => row.original.cause,
			size: 280,
		},
		{
			accessorKey: "consequene",
			header: "Consequence",
			cell: ({ row }) => row.original.consequence,
			size: 400,
		},
		{
			accessorKey: "incident_count",
			header: "Incident Count",
			meta: {
				className: "text-center",
			},
			cell: ({ row }) => <div className="text-center" >{row.original.incident_count}</div>,
		},
		{
			accessorKey: "incident_severity",
			header: "Incident Severity",
			meta: {
				className: "text-center",
			},
			cell: ({ row }) => <div className="text-center" >{row.original.incident_severity}</div>,
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

			size: 60,
		},

		{
			accessorKey: "incident_name",
			header: "Incident Name",
			cell: ({ row }) => row.original.incident_name,
			size: 240,
		},
		{
			accessorKey: "incident_location",
			header: "Incident Location",
			size: 190,
			cell: ({ row }) => row.original.incident_location,
		},
		{
			size: 280,
			accessorKey: "incident_trigger",
			header: "Incident Trigger",
			cell: ({ row }) => row.original.incident_trigger,
		},

		{
			accessorKey: "sp_affected",
			meta: {
				className: "text-center",
			},
			header: "Saverity to Personel (SP) Affected",
			cell: ({ row }) => (
				<div className="text-center">{row.original.sp_affected}</div>
			),
		},
		{
			accessorKey: "se_affected",
			meta: {
				className: "text-center",
			},
			header: "Saverity to Environment (SE) Affected",
			cell: ({ row }) => (
				<div className="text-center">{row.original.se_affected}</div>
			),
		},
		{
			accessorKey: "sf_affected",
			meta: {
				className: "text-center",
			},
			header: "Saverity to Finance (SF) Affected",
			cell: ({ row }) => (
				<div className="text-center">{row.original.sf_affected}</div>
			),
		},
		{
			accessorKey: "srl_affected",
			meta: {
				className: "text-center",
			},
			header: "Saverity to Reputation & Legal (SRL) Affected",
			cell: ({ row }) => (
				<div className="text-center">{row.original.srl_affected}</div>
			),
		},
		{
			accessorKey: "sa_affected",
			meta: {
				className: "text-center",
			},
			header: "Saverity to Asset (SA) Affected",
			cell: ({ row }) => (
				<div className="text-center">{row.original.sa_affected}</div>
			),
		},
		{
			accessorKey: "spn_affected",
			meta: {
				className: "text-center",
			},
			header: "Saverity to Public Notification (SPN) Affected",
			cell: ({ row }) => (
				<div className="text-center">{row.original.spn_affected}</div>
			),
		},
	]

	return columns
}
