import { FormDescription } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

interface IPropsInputWithLabel extends InputProps {
	label: string
	description?: string
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
			isRequired = true,
			...restProps
		},
		ref
	) => {
		return (
			<div className="grid w-full items-center gap-1.5">
				<div className="flex gap-2">
					<Label htmlFor="email">{label}</Label>
					{isRequired && <span className="text-destructive">*</span>}
				</div>
				<Input type={type} placeholder={placeholder} {...restProps} />
				{description && (
					<FormDescription>{description}</FormDescription>
				)}
			</div>
		)
	}
)

InputWithLabel.displayName = "Input"

export default InputWithLabel
