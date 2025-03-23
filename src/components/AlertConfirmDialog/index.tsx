import React, { ReactNode } from "react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog"

export interface AlertConfirmDialogProps {
	open: boolean
	title: string
	description: string
	confirmLabel?: string
	denyLabel?: string
	onAction?(action: string): void
	alertDialogFooter?: React.ReactElement
}

function AlertConfirmDialog({
	open,
	title,
	description,
	confirmLabel = "Yes",
	denyLabel = "Cancel",
	onAction,
	alertDialogFooter,
}: AlertConfirmDialogProps) {
	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				{alertDialogFooter && alertDialogFooter}
				{!alertDialogFooter && (
					<AlertDialogFooter>
						<AlertDialogCancel
							onClick={() => onAction && onAction("deny")}
						>
							{denyLabel}
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => onAction && onAction("confirm")}
						>
							{confirmLabel}
						</AlertDialogAction>
					</AlertDialogFooter>
				)}
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default AlertConfirmDialog
