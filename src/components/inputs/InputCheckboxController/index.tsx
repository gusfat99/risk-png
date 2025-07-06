import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import React from "react"

interface InputCheckboxControllerProps extends CheckboxProps {
	label?: string
	loading?: boolean
	description?: string
	labelClassName?: string
	isRequired?: boolean
}

const InputCheckboxController: React.FC<InputCheckboxControllerProps> = ({
	label,
	loading,
	description,
	isRequired = false,
	labelClassName,
	...restProps
}) => {
	return (
		<FormItem className="w-full">
			<FormControl>
				<Checkbox {...restProps} />
			</FormControl>
			{label && !loading && (
				<FormLabel className={cn("tracking-wider", labelClassName)}>
					{label}{" "}
					{isRequired && <span className="text-destructive">*</span>}
				</FormLabel>
			)}
		</FormItem>
	)
}

export default InputCheckboxController
