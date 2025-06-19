"use client"

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
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { SelectDataType } from "@/types/common"
import { SelectProps } from "@radix-ui/react-select"

interface FormSelectInputProps extends SelectProps {
	label?: string
	description?: string
	labelClassName?: string
	className?: string
	itemClassName?: string
	placeholder: string
	items: SelectDataType[]
	field?: any
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
		className,
		itemClassName = "",
		...restProps
	} = props

	return (
		<FormItem className={cn(className)}>
			{label && (
				<FormLabel className={cn("tracking-wider", labelClassName)}>
					{label}{" "}
					{isRequired && <span className="text-destructive">*</span>}
				</FormLabel>
			)}
			{loading && <Skeleton className="h-10 w-full" />}
			{!loading && (
				<>
					<Select
						defaultValue={field.value}
						onValueChange={(val) =>
							typeof val !== "undefined" &&
							val !== null &&
							onChange(val)
						}
						value={field.value}
						disabled={disabled}
						{...restProps}
					>
						<FormControl>
							<SelectTrigger className="!text-sm">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent className="max-w-sm sm:max-w-[520px] mr-5 text-wrap">
							{items.map((item, key) => (
								<SelectItem
									className={cn(
										"max-w-screen-sm sm:max-w-[520px] text-wrap",
										itemClassName
									)}
									key={key}
									value={item.value}
								>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{description && (
						<FormDescription>{description}</FormDescription>
					)}
					<FormMessage />
				</>
			)}
		</FormItem>
	)
}

export default InputSelectController
