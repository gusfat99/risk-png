import { Button, ButtonProps } from "@/components/ui/button"
import { Minus, Plus, Trash, Trash2 } from "lucide-react"
import React from "react"

interface IProps extends ButtonProps {
	size?: "default" | "sm" | "lg" | "icon" | null | undefined
	children?: React.ReactNode
	label?: string
}

const AddButton: React.FC<IProps> = ({
	size = "default",
	children,
	label,
	...rest
}) => {
	return (
		<Button size={size} type="button" variant={"success"} {...rest}>
			<Plus /> {label && label}
			{children && children}
		</Button>
	)
}

export default AddButton
