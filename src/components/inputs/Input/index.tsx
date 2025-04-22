import { FormDescription } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

interface IPropsInputWithLabel extends InputProps {
	label: string
	description?: string
	loading? :boolean
	placeholder: string
	isRequired?: boolean
	type?: "number" | "text" | "password" | "email" | "url"
	value?: any
}

const InputWithLabel = React.forwardRef<HTMLInputElement, IPropsInputWithLabel>(
	(
		{
			label,
			description,
			placeholder,
			children,
			type,
			loading,
			isRequired = true,
			...restProps
		},
		ref
	) => {
		return (
			<div className="grid w-full items-center gap-1.5">
				{loading && <Skeleton className="w-[120px] h-4" />}
				{loading && <Skeleton className="h-10 w-full" />}
				{loading && description && <Skeleton className="w-full h-4" />}
				
				{!loading && (<div className="flex gap-2">
					<Label htmlFor="email">{label}</Label>
					{isRequired && <span className="text-destructive">*</span>}
				</div>)}
				
				{!loading && (<Input type={type} placeholder={placeholder} {...restProps} />)}
				{description && !loading && (
					<FormDescription>{description}</FormDescription>
				)}
			</div>
		)
	}
)

InputWithLabel.displayName = "Input"

export default InputWithLabel
