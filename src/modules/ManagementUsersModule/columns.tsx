import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import TableRowActions from "@/components/TableRowActions"
import { Badge } from "@/components/ui/badge"
import { User } from "@/types/user"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
// import { Badge } from "lucide-react"

export const columnsManagementUser = (
	onAction: (actionName: string, id: any) => void
): ColumnDef<User>[] => {
	const column: ColumnDef<User>[] = [
		{
			header: "No",
			size: 40,
			cell: ({ row, table }) => {
				const { pageIndex, pageSize } = table.getState().pagination
				return (pageIndex - 1) * pageSize + row.index + 1
			},
		},
		{
			id: "id",
			accessorFn: (row) => row.id,
			header: () => {
				return <div className="flex justify-start">Action</div>
			},
			cell: ({ row }) => (
				<TableRowActions
					onAction={(actionName: string) => {
						onAction(actionName, row.getValue("id"))
					}}
					acl={{
						canDelete: true,
						canEdit: true,
						canView: false,
					}}
				/>
			),
			size: 60,
		},
		{
			id: "name",
			accessorFn: (row) => row.name,
			enableSorting: false,
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Name" />
			},
			cell: ({ row }) => row.getValue("name"),
		},

		{
			id: "email",
			enableSorting: false,
			accessorFn: (row) => `${row.email}`,
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Email" />
			},
			cell: ({ row }) => <div>{row.getValue("email")}</div>,
		},
		{
			id: "role",
			enableSorting: false,
			meta: {
				className: "text-center",
			},
			accessorFn: (row) => row.role,
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Role" />
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.roles?.length <= 0 ? (
						"-"
					) : (
						<Link
							href={`/configuration-role-access-menu/update/${row.original.roles[0]?.id}`}
						>
							<Badge variant={"secondary"}>
								{row.getValue("role")}
							</Badge>
						</Link>
					)}
				</div>
			),
		},
	]

	return column
}
