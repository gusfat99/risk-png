import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { SelectDataType } from "@/types/common"
import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import InputCheckbox from "../InputCheckbox"

interface InputComboboxControllerProps extends InputProps {
	label: string
	description?: string
	placeholder: string
	isRequired?: boolean
	labelClassName?: string
	defaultMode?: "text" | "select"
	placeholderCheckbox: string
	value?: any
	field: any
	disabled?: boolean
	freetextConfig?: {
		passwordVisible?: boolean
		secure?: boolean
		type?: "number" | "text" | "password" | "email" | "url"
		onClickShuffix?(): void
	}
	selectConfig?: {
		loading?: boolean
		items: SelectDataType[]
	}
	handleChange: (value: string, name: string) => void
	onCheckedChange?(mode: string): void;
}

const InputComboboxController = React.forwardRef<
	HTMLInputElement,
	InputComboboxControllerProps
>(
	(
		{
			label,
			description,
			placeholder,
			isRequired = true,
			labelClassName = "",
			defaultMode = "select",
			field,
			freetextConfig,
			selectConfig,
			disabled,
			handleChange,
			placeholderCheckbox,
			value,
			onCheckedChange,
			
		},
		ref
	) => {
		const [mode, setMode] = useState<"text" | "select">(defaultMode)
		return (
			<FormItem className="w-full">
				<FormLabel className={cn("tracking-wider", labelClassName)}>
					{label}{" "}
					{isRequired && <span className="text-destructive">*</span>}
				</FormLabel>

				{mode === "text" && (
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								disabled={disabled}
								ref={ref} // forward ref to Input component
								onChange={(e) =>
									handleChange(e.target.value, field.name)
								}
								type={freetextConfig?.type ?? "text"}
								placeholder={`Enter ${placeholder}...`}
								className={cn({
									"pr-10": freetextConfig?.secure,
								})}
							/>
							{freetextConfig?.secure && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
									<button
										type="button"
										onClick={() => {
											freetextConfig?.onClickShuffix &&
												freetextConfig?.onClickShuffix()
										}}
									>
										{freetextConfig?.passwordVisible && (
											<Eye className="text-muted-foreground" />
										)}
										{!freetextConfig?.passwordVisible && (
											<EyeOff className="text-muted-foreground" />
										)}
									</button>
								</div>
							)}
						</div>
					</FormControl>
				)}
				{mode === "select" && (
					<FormControl>
						<Select
							defaultValue={field.value}
							onValueChange={(val) =>
								val && handleChange(val as any, field.name)
							}
							value={field.value}
							disabled={disabled}
							name={field.name}
							
							// {...restProps}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder={`Select ${placeholder}...`} />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{(selectConfig?.items || []).map(
									(item, key) => (
										<SelectItem
											key={key}
											value={item.value}
										>
											{item.label}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
					</FormControl>
				)}
				{description && (
					<FormDescription>{description}</FormDescription>
				)}
				<FormMessage />
				{!disabled && (
					<InputCheckbox
						id={field.name}
						label={placeholderCheckbox}
						onCheckedChange={(checked) => {
							if (checked) {
								setMode("text")
								onCheckedChange && onCheckedChange("text")
							} else {
								onCheckedChange && onCheckedChange("select")
								setMode("select")
							}
						}}
						checked={mode === "text"}
					/>
				)}
			</FormItem>
		)
	}
)

InputComboboxController.displayName = "InputComboboxController"

export default InputComboboxController
