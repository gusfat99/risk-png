import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import React from "react"
import Multiselect from "multiselect-react-dropdown"
import { StateOption } from "@/types/common"

export interface InputDropdownMultipleControllerProps<Option = StateOption> {
	label: string
	onSelect: (selectedList: Option[], selectedItem: Option) => void
	onRemove: (selectedList: Option[], selectedItem: Option) => void
	options: Option[]
	placeholder?: string
	isDisabled?: boolean
	isRequired?: boolean
	field: any
	id?: string
}

const InputDropdownMultipleController: React.FC<
	InputDropdownMultipleControllerProps
> = ({
	label,
	isRequired = true,
	isDisabled,
	field,
	options,
	onSelect,
	onRemove,
	placeholder,
	id,
}) => {
	return (
		<FormItem>
			<FormLabel>
				{label}{" "}
				{isRequired && <span className="text-destructive">*</span>}
			</FormLabel>
			<FormControl>
				<Multiselect
					id={id}
					placeholder={isDisabled ? "" : placeholder}
					disable={isDisabled}
					options={options}
					selectedValues={field.value} // Preselected value to persist in dropdown
					onSelect={(selectedList, selectedItem) => {
						onSelect(selectedList, selectedItem)
					}} // Function will trigger on select event
					onRemove={(selectedList, selectedItem) => {
						onRemove(selectedList, selectedItem)
					}} // Function will trigger on remove event
					displayValue="label" // Property name to display in the dropdown options
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	)
}

export default InputDropdownMultipleController
