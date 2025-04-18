import { FormDescription } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import React from "react"

interface IPropsInputSearch extends InputProps {
	label?: string
	description?: string
	placeholder: string
	isRequired?: boolean
	type?: "number" | "text" | "password" | "email" | "url"
	value?: any
}

const InputSearch = React.forwardRef<HTMLInputElement, IPropsInputSearch>(
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
			<div className="grid max-w-sm items-center gap-1.5">
				{label && (
					<div className="flex gap-2">
						<Label>{label}</Label>
						{isRequired && (
							<span className="text-destructive">*</span>
						)}
					</div>
				)}
				<div className="relative">
					<Input
						type={type}
						placeholder={placeholder}
						{...restProps}
						className="pr-10 h-10"
					/>
					<Search className="text-muted-foreground absolute z-10 top-1/2 right-2 transform  -translate-y-1/2" />
				</div>
				{description && (
					<FormDescription>{description}</FormDescription>
				)}
			</div>
		)
	}
)

InputSearch.displayName = "Input"

export default InputSearch
