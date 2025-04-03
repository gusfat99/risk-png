import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import React from "react"
import Datepicker, { DatepickerType } from "react-tailwindcss-datepicker"

interface InputDatepickerControllerProps extends DatepickerType {
	label: string
	isRequired?: boolean
	description?: string
}

const InputDatepickerController: React.FC<InputDatepickerControllerProps> = ({
	label,
	isRequired = true,
	useRange = false,
	description,
	...rest
}) => {
	return (
		<FormItem>
			<FormLabel>
				{label}{" "}
				{isRequired && <span className="text-destructive">*</span>}
			</FormLabel>
			<FormControl>
				<Datepicker
					{...rest}
					displayFormat="DD/MM/YYYY"
					useRange={useRange}
					i18n="id"
					inputClassName={
						"relative h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					}
				/>
			</FormControl>
			<FormMessage />
			{description && <FormDescription>{description}</FormDescription>}
		</FormItem>
	)
}

export default InputDatepickerController
