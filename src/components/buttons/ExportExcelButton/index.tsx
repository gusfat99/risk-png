import { Button, ButtonProps } from "@/components/ui/button"
import { FileSpreadsheet, Plus } from "lucide-react"
import React from "react"

interface IProps extends ButtonProps {
	size?: "default" | "sm" | "lg" | "icon" | null | undefined
	children?: React.ReactNode
	label?: string
}

const ExportExcelButton: React.FC<IProps> = ({
	size = "default",
	children,
	label,
	...rest
}) => {
	return (
		<Button size={size} type="button" variant={"outline_success"} {...rest}>
			<FileSpreadsheet /> {label && label}
			{children && children}
		</Button>
	)
}

export default ExportExcelButton
