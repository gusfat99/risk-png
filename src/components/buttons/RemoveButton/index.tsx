import { Button, ButtonProps } from "@/components/ui/button"
import { Minus, Trash, Trash2 } from "lucide-react"
import React from "react"

interface IProps extends ButtonProps {
	size?: "default" | "sm" | "lg" | "icon" | null | undefined
}

const RemoveButton: React.FC<IProps> = ({ size = "sm", ...rest }) => {
	return (
		<Button size={size} type="button" variant={"destructive"} {...rest}>
			<Trash2 />
		</Button>
	)
}

export default RemoveButton
