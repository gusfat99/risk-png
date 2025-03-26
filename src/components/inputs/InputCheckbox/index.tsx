"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import React from "react"

interface InputCheckboxProps extends CheckboxProps {
	label: string
}

const InputCheckbox = React.forwardRef<HTMLButtonElement, InputCheckboxProps>(
	({ label, ...restProps }, ref) => {
		return (
			<div className="flex items-center space-x-2">
				<Checkbox {...restProps} ref={ref} />
				<label
					htmlFor={restProps.id}
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{label}
				</label>
			</div>
		)
	}
)

InputCheckbox.displayName = "InputCheckbox"
export default InputCheckbox
