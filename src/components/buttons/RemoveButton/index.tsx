import { Button, ButtonProps } from "@/components/ui/button"
import { Minus, Trash, Trash2 } from "lucide-react"
import React from "react"

interface IProps extends ButtonProps {
	size?: "default" | "sm" | "lg" | "icon" | null | undefined
	title? : string
}

const RemoveButton: React.FC<IProps> = ({ size = "sm", title, ...rest }) => {
	return (
		<Button size={size} type="button" variant={"ghost"} {...rest}>
			<Trash2 /> {title}
		</Button>
	)
}

export default RemoveButton
