import RemoveButton from "@/components/buttons/RemoveButton"
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import React, { useRef } from "react"

interface InputFileOriginProps extends InputProps {
	label: string
	description?: string
	placeholder: string
	children?: React.ReactNode
	textarea?: boolean
	file?: File | null
	onResetFile?: () => void
	onProgresUpload?: boolean
	multiple?: boolean
	isShowPreview?: boolean
	isRequired?: boolean
}

const InputFileOriginController: React.FC<InputFileOriginProps> = ({
	label,
	description,
	placeholder,
	children,
	textarea,
	file,
	onResetFile,
	onProgresUpload,
	isShowPreview = true,
	isRequired = true,
	...restProps
}) => {
	const ref = useRef<HTMLInputElement>(null)
	const resetFile = () => {
		ref.current?.value && (ref.current.value = "")
	}

	return (
		<FormItem>
			<FormLabel>
				{label}
				{isRequired && <span className="text-destructive">*</span>}
			</FormLabel>
			{isShowPreview && file && (
				<div className="flex gap-2">
					<a
						rel="noopener"
						target="_blank"
						className="text-blue-400 text-sm hover:underline"
						href={URL.createObjectURL(file)}
					>
						Preview File
					</a>
				</div>
			)}

			<FormControl>
				{children ? (
					children
				) : (
					<Input
						{...restProps}
						ref={ref}
						type="file"
						className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
						id="small_size"
						placeholder={placeholder}
					/>
				)}
			</FormControl>
			{description && (
				<FormDescription className="font-light text-xs">
					{description}
				</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	)
}

export default InputFileOriginController
