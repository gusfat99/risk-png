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
import Spinner from "../ui/spinner"

export interface AlertConfirmDialogProps {
	open: boolean
	title: string
	description: string
	confirmLabel?: string
	denyLabel?: string
	showDenyButton?: boolean
	onAction?(action: string): void
	alertDialogFooter?: React.ReactElement
	loading?: boolean
}

function AlertConfirmDialog({
	open,
	title,
	description,
	confirmLabel = "Yes",
	denyLabel = "Cancel",
	onAction,
	alertDialogFooter,
	loading,
	showDenyButton = true,
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
						{showDenyButton && (
							<AlertDialogCancel
								onClick={() => onAction && onAction("deny")}
								disabled={loading}
							>
								{loading && <Spinner className="h-4 w-4" />}
								{denyLabel}
							</AlertDialogCancel>
						)}
						<AlertDialogAction
							onClick={() => onAction && onAction("confirm")}
							disabled={loading}
						>
							{loading && <Spinner className="h-4 w-4" />}
							{confirmLabel}
						</AlertDialogAction>
					</AlertDialogFooter>
				)}
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default AlertConfirmDialog
