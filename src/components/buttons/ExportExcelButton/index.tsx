import { Button, ButtonProps } from "@/components/ui/button"
import Spinner from "@/components/ui/spinner"
import { FileSpreadsheet, Plus } from "lucide-react"
import React from "react"

interface IProps extends ButtonProps {
	size?: "default" | "sm" | "lg" | "icon" | null | undefined
	children?: React.ReactNode
	label?: string
	loading?: boolean
}

const ExportExcelButton: React.FC<IProps> = ({
	size = "default",
	children,
	label,
	loading,
	...rest
}) => {
	return (
		<Button
			size={size}
			type="button"
			variant={"outline_success"}
			disabled={rest.disabled || loading}
			{...rest}
		>
			{loading ? <Spinner className="w-4 h-4"  /> : <FileSpreadsheet />} {label && label}
			{children && children}
		</Button>
	)
}

export default ExportExcelButton
