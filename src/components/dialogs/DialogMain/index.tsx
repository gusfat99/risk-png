import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface IProps {
	title: string
	description?: string
	open: boolean
	size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "6xl" | "7xl" | "8xl"
	children: React.ReactNode
	onOpenChange: (open: boolean) => void
	className?: string
}

export default function DialogMain(props: IProps) {
	const {
		title,
		description,
		open,
		size = "lg",
		onOpenChange,
		className,
		children,
	} = props
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={cn(`w-full`, [
					{
						"max-w-md": size === "md",
						"max-w-lg": size === "lg",
						"max-w-xl": size === "xl",
						"max-w-2xl": size === "2xl",
						"max-w-3xl": size === "3xl",
						"max-w-4xl": size === "4xl",
						"max-w-6xl": size === "6xl",
						"max-w-7xl": size === "7xl",
						"max-w-8xl": size === "8xl",
					},
					className,
				])}
			>
				<DialogHeader>
					<DialogTitle className="text-primary" >{title}</DialogTitle>
					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}
