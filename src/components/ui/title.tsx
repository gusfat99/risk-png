import { cn } from "@/lib/utils"
import React from "react"

interface IProps {
	children: React.ReactNode
	className?: string
}

const Title: React.FC<IProps> = ({ children, className }) => {
	return (
		<h3
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-wider text-[#45464E]",
				className
			)}
		>
			{children}
		</h3>
	)
}

export default Title
