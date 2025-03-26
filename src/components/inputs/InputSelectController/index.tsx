"use client"

import { z } from "zod"

import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { SelectProps } from "@radix-ui/react-select"
import { SelectDataType } from "@/types/common"
import { cn } from "@/lib/utils"

interface FormSelectInputProps extends SelectProps {
	label: string
	description?: string
	labelClassName?: string
	placeholder: string
	items: SelectDataType[]
	field: any
	disabled?: boolean
	loading?: boolean
	isRequired?: boolean
	onChange: (value: string) => void
}

function InputSelectController(props: FormSelectInputProps) {
	const {
		label,
		description,
		placeholder,
		items,
		field,
		loading,
		onChange,
		isRequired = true,
		disabled,
		labelClassName,
		...restProps
	} = props

	return (
		<FormItem>
			<FormLabel className={cn("tracking-wider", labelClassName)}>
				{label}{" "}
				{isRequired && <span className="text-destructive">*</span>}
			</FormLabel>
			<Select
				defaultValue={field.value}
				onValueChange={(val) => val && onChange(val)}
				value={field.value}
				disabled={disabled}
				{...restProps}
			>
				<FormControl>
					<SelectTrigger>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
				</FormControl>
				<SelectContent>
					{items.map((item, key) => (
						<SelectItem key={key} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</FormItem>
	)
}

export default InputSelectController
