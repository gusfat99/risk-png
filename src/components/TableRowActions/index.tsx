"use client"
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface TableRowActionsProps {
	onAction: (actionName: string) => void
	menuName?: string
	acl?: {
		canView?: boolean
		canEdit?: boolean
		canDelete?: boolean
	}
	children?: React.ReactNode
}

const TableRowActions: React.FC<TableRowActionsProps> = ({
	onAction,
	children,
	acl = {
		canView: true,
		canEdit: true,
		canDelete: true,
	},
}) => {
	// const {permissions} = useAuthContext();

	// const actionCheck: Array<keyof Permissions> = ["edit", "delete"];

	// const hasPermissions = permissions.some(
	// 	(perm) => perm.menu === menuName &&  actionCheck.some(action => perm[action])
	// );

	// const hasEditPermissions = permissions.some(
	// 	(perm) => perm.menu === menuName && perm.edit
	// );
	// const hasDeletePermissions = permissions.some(
	// 	(perm) => perm.menu === menuName && perm.delete
	// );

	return (
		<DropdownMenu  >
			<DropdownMenuTrigger asChild>
				<Button aria-haspopup="true" size="icon" variant="ghost">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Toggle Action</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				<DropdownMenuLabel>Action</DropdownMenuLabel>
				{acl.canView && (
					<DropdownMenuItem
						className="hover:cursor-pointer"
						onClick={() => {
							onAction("detail")
						}}
					>
						<Eye /> Detail
					</DropdownMenuItem>
				)}
				{acl.canEdit && (
					<DropdownMenuItem
						className="hover:cursor-pointer"
						onClick={() => {
							onAction("update")
						}}
					>
						<Pencil /> Edit
					</DropdownMenuItem>
				)}
				{acl.canDelete && (
					<DropdownMenuItem
						className="hover:cursor-pointer"
						onClick={() => {
							onAction("delete")
						}}
					>
						<Trash /> Delete
					</DropdownMenuItem>
				)}

				{children && children}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default TableRowActions
