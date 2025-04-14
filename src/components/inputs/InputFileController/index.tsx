import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { API_URL } from "@/constants"
import { useToast } from "@/hooks/use-toast"
import { cn, shortenFileName } from "@/lib/utils"
import { MimeTypes } from "@/types/common"
import { File, UploadIcon } from "lucide-react"
import React, { useEffect, useState } from "react"

interface IProps extends InputProps {
	labelClassName?: string
	fileUrl?: string
	label: string
	isRequired?: boolean
	readOnly?: boolean
	sizeInput?: "sm" | "md"
	fileValidations?: {
		allowMimeTypes?: Array<MimeTypes>
		maxSizeMb?: number //in Megabit
	}
	onChangeHandler?(file: File | null): void
}

export const defaultAllowMimeTypes = ["docx", "jpg", "pdf", "png", "xlsx"]

const InputFileContoller: React.FC<IProps> = ({
	labelClassName,
	isRequired,
	label,
	fileUrl,
	readOnly,
	onChangeHandler,
	fileValidations,
	sizeInput = "md",
	...restProps
}) => {
	const { toast } = useToast()
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [existingFile, setExistingFile] = useState<string | null>(null)
	const allowMimeTypes =
		fileValidations?.allowMimeTypes || defaultAllowMimeTypes
	const maxSizeMb = fileValidations?.maxSizeMb || 10 //default set 10 MB
	
	const handleFileChange = (file: File, cb: (file: File) => void) => {
		if (file) {
			// Validasi file
			const mimeTypes = [
				{
					mime: "application/pdf",
					mime_name: "pdf",
				},
				{
					mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					mime_name: "docx",
				},
				{
					mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
					mime_name: "xlxs",
				},
				{
					mime: "image/png",
					mime_name: "png",
				},
				{
					mime: "image/jpeg",
					mime_name: "jpeg",
				},
				{
					mime: "image/jpeg",
					mime_name: "jpg",
				},
			]

			const maxSize = maxSizeMb * 1024 * 1024 // 10MB

			const foundMimeType = mimeTypes.find(
				(x) => x.mime === file.type
			)?.mime_name
			if (!foundMimeType || !allowMimeTypes.includes(foundMimeType)) {
				return (
					"Invalid file type. Only " +
					allowMimeTypes.join(", ")?.toUpperCase() +
					" allowed"
				)
			}
			if (file.size > maxSize) {
				return "File size exceeds " + maxSizeMb + "MB limit"
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

	let sizeIcon = 24
	if (sizeInput === "sm") {
		sizeIcon = 16
	}

	return (
		<FormItem>
			<FormLabel className={cn("tracking-wider", labelClassName)}>
				{label}{" "}
				{isRequired && <span className="text-destructive">*</span>}
			</FormLabel>
			<FormControl>
				<div className="bg-white rounded-xl border-2 border-gray-300 flex flex-row gap-4 py-3 px-4 items-center w-fit xl:min-w-[340px]">
					<div
						className={cn(
							"border-2 border-gray-300 rounded-full text-gray-700",
							{
								"p-4": sizeInput === "md" ? true : false,
								"p-2": sizeInput === "sm" ? true : false,
							}
						)}
					>
						{readOnly && (
							<File
								className={cn("text-gray-400 font-medium")}
								size={sizeIcon}
							/>
						)}
						{!readOnly && (
							<UploadIcon
								className={cn("text-gray-400 font-medium")}
								size={sizeIcon}
							/>
						)}
					</div>
					<div className="flex flex-col w-full ">
						<div className="flex flex-row gap-4 items-center justify-between">
							<h3 className="font-medium  mb-1">Upload File</h3>
							{!readOnly && (
								<label
									className={cn(
										"inline-block border-gray-300 rounded-lg hover:bg-secondary cursor-pointer border text-sm hover:text-white transition-colors self-end",
										{
											"p-4": sizeInput === "md",
											"p-2": sizeInput === "sm",
										}
									)}
								>
									{existingFile && typeof existingFile === "string" ? "Update " : "Choose "} File
									<Input
										type="file"
										className="hidden"
										accept={allowMimeTypes
											.map((x) => `.${x}`)
											.join(",")}
										onChange={(e) => {
											const file = e.target.files?.[0]
											if (file) {
												const error = handleFileChange(
													file,
													onChangeHandler ||
														(() => {})
												)
												if (error) {
													// Handle error
													toast({
														title: "Warning",
														description: error,
														variant: "warning",
													})
												}
											} else {
												setSelectedFile(null)
												onChangeHandler &&
													onChangeHandler(null)
											}
										}}
										{...restProps}
									/>
								</label>
							)}
						</div>
						<div>
							{/* Existing file preview */}
							{existingFile && typeof existingFile === "string" && (
								<div className="mb-2">
									{sizeInput === "md" && (
										<p className="text-sm text-gray-600">
											Current file:
										</p>
									)}
									<a
										href={API_URL+"/storage/safeguards/"+existingFile}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline text-sm"
									>
										{shortenFileName(
											existingFile
												?.split("/")
												?.pop()
												?.split("_")
												?.join(" ") || ""
										)}
									</a>
								</div>
							)}
							{sizeInput !== "sm" && (
								<p className="text-sm text-gray-500">
									(Only{" "}
									{allowMimeTypes.join(", ").toUpperCase()}{" "}
									files are allowed)
								</p>
							)}
							<p className="text-sm text-gray-500 ">
								(Max. File size: {maxSizeMb} Mb)
							</p>
						</div>
						{selectedFile && (
							<p className="text-sm text-gray-600">
								Selected file:{" "}
								<span className="font-semibold text-secondary">
									{shortenFileName(selectedFile.name)}
								</span>
							</p>
						)}
					</div>
				</div>
			</FormControl>
			<FormMessage />
		</FormItem>
	)
}

export default InputFileContoller
