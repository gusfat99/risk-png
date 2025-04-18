"use client"
import InputController from "@/components/inputs/InputController"
import InputFileContoller from "@/components/inputs/InputFileController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { API_URL, SAFEGUARDS_PATHNAME_STORAGE } from "@/constants"
import { useToast } from "@/hooks/use-toast"
import { SafeguardSchema, initialSafeguard } from "@/schemas/SafeguardSchema"
import useSafeguardStore from "@/store/safeguradStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React, { useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { parseSafeguardDataToView } from "../parsingData"

interface IProps {
	isEdit?: boolean
	isDetail?: boolean
}

const SafeguardForm: React.FC<IProps> = ({ isEdit, isDetail }) => {
	const {
		isSubmit,
		actions: { createData, updateData, deleteData },
		safeguardItems,
	} = useSafeguardStore()
	const { toast } = useToast()
	const route = useRouter()
	const params = useParams<{ id: any }>()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])

	const safeguardSelected = useMemo(
		() =>
			isEdit || isDetail
				? safeguardItems.find(
						(x) => x.id?.toString() === params.id?.toString()
				  )
				: null,
		[params?.id, isEdit, isDetail, safeguardItems]
	)

	const form = useForm<z.infer<typeof SafeguardSchema>>({
		resolver: zodResolver(SafeguardSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues:
			(isEdit || isDetail) && params?.id && safeguardSelected
				? parseSafeguardDataToView(safeguardSelected)
				: { ...initialSafeguard},
	})

	const handleSubmit = async (values: z.infer<typeof SafeguardSchema>) => {
		try {
			if (createData && !params?.id && !isEdit) {
				const result = await createData(values)

				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...initialSafeguard, file_path: undefined })
					route.replace(basePathname)
				} else {
					throw new Error("Failed")
				}
			} else if (updateData && params.id && isEdit) {
				const result = await updateData(params?.id, values)

				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...initialSafeguard, file_path: undefined })
					route.replace(basePathname)
				} else {
					throw new Error("Failed")
				}
			}
		} catch (error) {
			toast({
				title:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
				variant: "destructive",
			})
		}
	} 
	
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name={"safeguard"}
					render={({ field }) => (
						<InputController
							{...field}
							readOnly={isDetail}
							label="Safeguard Name"
							placeholder="Enter Safeguard"
							onChange={(e) => {
								form.setValue("safeguard", e.target.value)
							}}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name={"safeguard_title"}
					render={({ field }) => (
						<InputController
							{...field}
							readOnly={isDetail}
							label="Safeguard Doucument Title"
							placeholder="Enter Safeguard Document Title"
							onChange={(e) => {
								form.setValue("safeguard_title", e.target.value)
							}}
						/>
					)}
				/>
				
				<FormField
					control={form.control}
					name={"file_path"}
					render={({ field }) => (
						<InputFileContoller
							fileUrl={safeguardSelected ? `${SAFEGUARDS_PATHNAME_STORAGE}/${safeguardSelected.file_path}` : undefined}
							label="Safeguard Document"
							isRequired
							readOnly={isDetail}
							fileValidations={{
								maxSizeMb: 5,
							}}
							sizeInput="md"
							onChangeHandler={(file) => {
								if (file) {
									form.setValue("file_path", file)
								} else {
									form.setValue("file_path", undefined as any)
								}
							}}
						/>
					)}
				/>

				{!isDetail && (
					<div className="flex justify-end gap-4">
						<Link href={basePathname}>
							{" "}
							<Button variant={"outline"} disabled={isSubmit}>
								Cancel
							</Button>
						</Link>
						<Button disabled={isSubmit} variant={"secondary"}>
							{isSubmit && <Spinner className="w-4 h-4" />}
							<Save /> Save Data
						</Button>
					</div>
				)}
			</form>
		</Form>
	)
}

export default SafeguardForm
