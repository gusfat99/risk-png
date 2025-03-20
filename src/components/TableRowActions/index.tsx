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
	children?: React.ReactNode
}

const TableRowActions: React.FC<TableRowActionsProps> = ({
	onAction,
	children,
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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button aria-haspopup="true" size="icon" variant="ghost">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Toggle Aksi</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Aksi</DropdownMenuLabel>
				<DropdownMenuItem className="hover:cursor-pointer"
					onClick={() => {
						onAction("detail")
					}}
				>
					<Eye/> Detail
				</DropdownMenuItem>

				{/* {hasEditPermissions && (
				)} */}
				<DropdownMenuItem className="hover:cursor-pointer"
					onClick={() => {
						onAction("update")
					}}
				>
					<Pencil/> Edit
				</DropdownMenuItem>

				{/* {hasDeletePermissions && (
				)} */}
				<DropdownMenuItem className="hover:cursor-pointer"
					onClick={() => {
						onAction("delete")
					}}
				>
					<Trash/> Delete
				</DropdownMenuItem>

				{children && children}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default TableRowActions
