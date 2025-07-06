import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import LucideIcon from "@/components/LucideIcon"
import TableRowActions from "@/components/TableRowActions"
import { Menu, Role } from "@/types/configAclMenu"
import { ColumnDef } from "@tanstack/react-table"

export const columnMenu = (
	onAction: (actionName: string, id: any) => void
): ColumnDef<Menu>[] => {
	const column: ColumnDef<Menu>[] = [
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
			accessorFn: (row) => row.id,
			enableSorting: false,
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
			size: 60,
			meta: {
				className: "text-center",
			},
		},
		{
			id: "name",
			accessorFn: (row) => row.name,
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Menu" />
			},
			cell: ({ row }) => (
				<div className="flex flex-row gap-2 items-center">
					{row.original.icon ? (
						<LucideIcon iconName={row.original.icon} />
					) : null}{" "}
					{row.original.name}
				</div>
			),
			enableSorting: false,
		},

		{
			id: "path",
			accessorFn: (row) => row.path,
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Path" />
			},
			cell: ({ row }) => <div>{row.getValue("path") || ""}</div>,
			enableSorting: false,
		},
		{
			id: "type",
			meta: {
				className: "text-center",
			},
			accessorFn: (row) => row.type,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						column={column}
						title="Has Children"
					/>
				)
			},
			enableSorting: false,
			cell: ({ row }) => (
				<div className="text-center">
					{row.getValue("type") === "group" ? "Yes" : "No"}
				</div>
				// <></>
			),
		},
		{
			id: "parent_name",
			accessorFn: (row) => row.parent_name,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						column={column}
						title="Parent Menu"
					/>
				)
			},
			enableSorting: false,
			cell: ({ row }) => (
				<div>{row.getValue("parent_name") || "-"}</div>
				// <></>
			),
		},

		{
			id: "order",
			meta: {
				className: "text-center",
			},
			accessorFn: (row) => `${row.order}`,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						column={column}
						title="Order Number"
					/>
				)
			},
			enableSorting: false,
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("order")}</div>
			),
		},
	]

	return column
}

export const columnRole = (
	onAction: (actionName: string, id: any) => void
): ColumnDef<Role>[] => {
	const column: ColumnDef<Role>[] = [
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
			accessorFn: (row) => row.id,
			enableSorting: false,
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
			size: 60,
			meta: {
				className: "text-center",
			},
		},
		{
			id: "name",
			accessorFn: (row) => row.name,
			header: ({ column }) => {
				return (
					<DataTableColumnHeader column={column} title="Role Name" />
				)
			},
			cell: ({ row }) => <div>{row.getValue("name") || ""}</div>,
			enableSorting: false,
		},
	]

	return column
}

