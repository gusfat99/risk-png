import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { cn, shortenFileName } from "@/lib/utils"
import { UploadIcon } from "lucide-react"
import React, { useEffect, useState } from "react"

interface IProps extends InputProps {
	labelClassName?: string
	fileUrl?: string
	label: string
	isRequired?: boolean
	onChangeHandler?(file: File): void
}

const InputFileContoller: React.FC<IProps> = ({
	labelClassName,
	isRequired,
	label,
	fileUrl,
	onChangeHandler,
	...restProps
}) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [existingFile, setExistingFile] = useState<string | null>(null)

	const handleFileChange = (file: File, cb: any) => {
		if (file) {
			// Validasi file
			const validTypes = [
				"application/pdf",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			]
			const maxSize = 10 * 1024 * 1024 // 10MB

			if (!validTypes.includes(file.type)) {
				return "Invalid file type. Only PDF, DOCX, XLSX allowed"
			}
			if (file.size > maxSize) {
				return "File size exceeds 10MB limit"
			}

			setSelectedFile(file)
			cb(file)
			setExistingFile(null) // Reset existing file jika upload baru
		}
	}

	useEffect(() => {
		if (fileUrl) {
			setExistingFile(fileUrl)
		}
	}, [fileUrl])

	return (
		<FormItem>
			<FormLabel
				className={cn("font-semibold tracking-wider", labelClassName)}
			>
				{label}{" "}
				{isRequired && <span className="text-destructive">*</span>}
			</FormLabel>
			<FormControl>
				<div className="bg-white rounded-xl border-2  border-gray-300 flex flex-row gap-4 py-3 px-4 items-center w-fit">
					<div className="border-2 border-gray-300 rounded-full text-gray-700 p-4">
						<UploadIcon className="text-gray-400 font-medium" />
					</div>
					<div>
						<h3 className="font-medium  mb-2">Upload File</h3>
						{/* Existing file preview */}
						{existingFile && (
							<div className="mb-4">
								<p className="text-sm text-gray-600">
									Current file:
								</p>
								<a
									href={existingFile}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									{existingFile.split("/").pop()}
								</a>
							</div>
						)}
						<p className="text-sm text-gray-500">
							(Only PDF, DOCX, and XLSX files are allowed)
						</p>
						<p className="text-sm text-gray-500 ">
							(Max. File size: 10 Mb)
						</p>
						{selectedFile && (
							<p className="text-sm text-gray-600">
								Selected file:{" "}
								<span className="font-semibold text-secondary">
									{shortenFileName(selectedFile.name)}
								</span>
							</p>
						)}
					</div>

					<label className="inline-block p-4  border-gray-300 rounded-lg hover:bg-secondary cursor-pointer border hover:text-white  transition-colors">
						{existingFile ? "Update " : "Choose "} File
						<Input
							type="file"
							className="hidden"
							accept=".pdf,.docx,.xlsx"
							onChange={(e) => {
								const file = e.target.files?.[0]
								if (file) {
									const error = handleFileChange(
										file,
										onChangeHandler
									)
									if (error) {
										// Handle error
									}
								}
							}}
							{...restProps}
						/>
					</label>
				</div>
			</FormControl>
		</FormItem>
	)
}

export default InputFileContoller
