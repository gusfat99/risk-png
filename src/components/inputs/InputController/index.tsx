import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import React from "react"

interface InputControllerProps extends InputProps {
	label?: string
	description?: string
	placeholder: string
	children?: React.ReactNode
	isRequired?: boolean
	passwordVisible?: boolean
	secure?: boolean
	type?: "number" | "text" | "password" | "email" | "url" | "hidden" | "date"
	value?: any
	labelClassName?: string
	onClickShuffix?(): void
}

const InputController = React.forwardRef<
	HTMLInputElement,
	InputControllerProps
>(
	(
		{
			label,
			description,
			placeholder,
			children,
			type,
			isRequired = true,
			passwordVisible = false,
			labelClassName = "",
			secure = false,
			onClickShuffix,
			...restProps
		},
		ref
	) => {
		return (
			<FormItem className="w-full">
				{label && (
					<FormLabel className={cn("tracking-wider", labelClassName)}>
						{label}{" "}
						{isRequired && (
							<span className="text-destructive">*</span>
						)}
					</FormLabel>
				)}
				<FormControl>
					<div className="relative">
						{children ? (
							children
						) : (
							<Input
								{...restProps}
								ref={ref} // forward ref to Input component
								onChange={restProps.onChange}
								type={type ?? "text"}
								placeholder={placeholder}
								className={cn("h-10",{
									"pr-10": secure,
								})}
							/>
						)}
						{secure && (
							<div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
								<button
									type="button"
									onClick={() => {
										onClickShuffix && onClickShuffix()
									}}
								>
									{passwordVisible && (
										<Eye className="text-muted-foreground" />
									)}
									{!passwordVisible && (
										<EyeOff className="text-muted-foreground" />
									)}
								</button>
							</div>
						)}
					</div>
				</FormControl>
				{description && (
					<FormDescription>{description}</FormDescription>
				)}
				<FormMessage />
			</FormItem>
		)
	}
)

InputController.displayName = "InputController"

export default InputController
