import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import TableRowActions from "@/components/TableRowActions"
import { User } from "@/types/user"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "lucide-react"

export const columnsManagementUser = (
	onAction: (actionName: string, id: any) => void
): ColumnDef<User>[] => {
	const column: ColumnDef<User>[] = [
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
						onAction(actionName, row.getValue("id"))
					}}
				/>
			),
		},
		{
			id: "name",
			accessorFn: (row) => row.name,
			meta: {
				hiddenFilter: true,
			},
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Name" />
			},
			cell: ({ row }) => row.getValue("name"),
		},

		{
			id: "email",
			accessorFn: (row) => `${row.email}`,
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Email" />
			},
			cell: ({ row }) => <div>{row.getValue("email")}</div>,
		},
		{
			id: "role",
			accessorFn: (row) => row.role,
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Role" />
			},
			cell: ({ row }) => (
				<Badge>{row.getValue("role")}</Badge>
				// <></>
			),
		},
		
	]

	return column
}
