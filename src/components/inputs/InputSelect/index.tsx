import { FormDescription } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
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
import React from "react"

interface FormInputSelectProps extends SelectProps {
	label: string
	description?: string
	labelClassName?: string
	placeholder: string
	items: SelectDataType[]
	loading?: boolean
	isRequired?: boolean
	className?: string
	itemClassName?: string
}

const InputSelect: React.FC<FormInputSelectProps> = ({
	label,
	isRequired,
	placeholder,
	items,
	description,
	loading,
	className,
	itemClassName,
	...restProps
}) => {
	return (
		<div className={cn("grid items-center gap-1.5", className)}>
			<div className="flex gap-2">
				<Label htmlFor="email">{label}</Label>
				{isRequired && <span className="text-destructive">*</span>}
			</div>
			{loading && <Skeleton className="h-10 w-full" />}
			{!loading && (
				<>
					<Select {...restProps}>
						<SelectTrigger>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>

						<SelectContent>
							{items.map((item, key) => (
								<SelectItem
									className={cn(itemClassName)}
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
				</>
			)}
		</div>
	)
}

export default InputSelect
