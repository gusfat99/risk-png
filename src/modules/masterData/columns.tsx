'use client'
// import AppTableRowActions from "@/components/AppTableRowActions"
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import TableRowActions from "@/components/TableRowActions"
import { Node } from "@/types/node"
import { ColumnDef } from "@tanstack/react-table"

export const columnNode = (
	onAction: (actionName: string, id: any) => void
): ColumnDef<Node>[] => {
	const column: ColumnDef<Node>[] = [
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
						onAction(actionName, row.getValue("id"))
					}}
				/>
			),
		},
		{
			id: "node",
			accessorFn: (row) => row.node,
			meta: {
				hiddenFilter: true,
			},
			header: ({column}) => {
				return (
					<DataTableColumnHeader
						column={column}
						title="Node"
					/>
				)
			},
			cell: ({ row }) => row.getValue('node')
		},
		

		{
			id: "node_description",
			accessorFn: (row) => `${row.node_description}`,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						column={column}
						title="Node Description"
					/>
				)
			},
			cell: ({ row }) => <div>{row.getValue("node_description")}</div>,
      },
      {
			id: "node_location",
			accessorFn: (row) => row.node_location,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader column={column} title="Node Location" />
				)
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("node_location")}</div>
				// <></>
			),
		},
		{
			id: "drawing_reference",
			
			accessorFn: (row) => row.drawing_reference,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						column={column}
						title="Drawing Referance"
					/>
				)
			},
			cell: ({ row }) => (
				<div className="lowercase">
					{row.getValue("drawing_reference")}
				</div>
			),
		},
		{
			id: "inlet_pressure",
			accessorFn: (row) => `${row.inlet_pressure}`,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						column={column}
						
						title="Inlet Pressure"
					/>
				)
			},
			cell: ({ row }) => <div className="text-center">{row.getValue("inlet_pressure")}</div>,
		},

		{
			id: "outlet_pressure",
			accessorFn: (row) => row.outlet_pressure,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						column={column}
						title="Outlet Pressure"
					/>
				)
			},
			cell: ({ row }) => {
				return (
					<div className="text-center">{row.getValue("inlet_pressure")}</div>
				)
			}
		},
		{
			id: "remark_node",
			accessorFn: (row) => row.remark_node,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						column={column}
						title="Notes Special
Condition / Remarks"
					/>
				)
			},
			cell: ({ row }) => {
				return row.getValue("remark_node")
			},
		},
	]

	return column
}
