"use client"
import RemoveButton from "@/components/buttons/RemoveButton"
import InputController from "@/components/inputs/InputController"
import InputSelectController from "@/components/inputs/InputSelectController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { initialRiskBank, RiskBankSchema } from "@/schemas/RiskBankSchema"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { RiskBankSchemaForm } from "@/types/riskDataBank"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Save } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { parseRiskBankToPayload, parseRiskBanktoView } from "../parseRiskBank"
import SectionSafeguardRiskBank from "./SectionSafeguardRiskBank"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
}

const RiskBankForm: React.FC<IProps> = ({ isDetail, isEdit }) => {
	const {
		riskDataBankSelected,
		actions: { createData, updateData, fetchAllSupportData },
		supportData: { isFetchingSupportData, deviationItems },
		isSubmit,
	} = useRiskDataBankStore()
	const { toast } = useToast()
	const route = useRouter()
	const params = useParams<{ id: any }>()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])

	const handleSubmit = async (values: RiskBankSchemaForm) => {
		try {
			if (createData && !params?.id && !isEdit) {
				const formDataPayload = parseRiskBankToPayload(values)
				const result = await createData(formDataPayload)

				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...initialRiskBank })
					route.replace(basePathname)
				} else {
					throw new Error("Failed")
				}
			} else if (updateData && params.id && isEdit) {
				// const formDataPayload = parseRiskBankToPayload(values)
				const result = await updateData(params?.id, values)

				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...initialRiskBank })
					route.replace(basePathname)
				} else {
					throw new Error("Failed")
				}
			}
		} catch (error: any) {
			console.log({ error })
			toast({
				title: error?.message
					? error.message
					: "An unexpected error occurred",
				variant: "destructive",
			})
		}
	}

	const form = useForm<z.infer<typeof RiskBankSchema>>({
		resolver: zodResolver(RiskBankSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues:
			(isEdit || isDetail) && params?.id && riskDataBankSelected
				? {
						...parseRiskBanktoView(riskDataBankSelected),
						deviation_id: String(
							parseRiskBanktoView(riskDataBankSelected)
								.deviation_id
						),
						consequences: parseRiskBanktoView(
							riskDataBankSelected
						).consequences.map((consequence) => ({
							...consequence,
							id: String(consequence.id),
						})),
				  }
				: { ...initialRiskBank },
	})

	const consequences = form.watch("consequences")
	const fieldArrayConsequences = useFieldArray({
		control: form.control,
		name: "consequences",
		keyName: "idx",
	})
	const { append: appendConsequence, remove: removeConsequence } =
		fieldArrayConsequences

	const handleAddConsequence = () => {
		appendConsequence({
			consequence: "",
			safeguards: [],
		})
	}

	const diviationOptions = (deviationItems || [])?.map((x) => ({
		value: x.id?.toString(),
		label: x.name || x.deviation || "",
	}))

	useEffect(() => {
		fetchAllSupportData()
	}, [fetchAllSupportData])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name={"parameter"}
					render={({ field }) => (
						<InputController
							{...field}
							readOnly={isDetail}
							label="Parameter Name"
							placeholder="Enter Parameter"
							onChange={(e) => {
								form.setValue("parameter", e.target.value)
							}}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name={"cause"}
					render={({ field }) => (
						<InputController
							{...field}
							readOnly={isDetail}
							label="Cause"
							placeholder="Enter Cause"
							onChange={(e) => {
								form.setValue("cause", e.target.value)
							}}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name={"deviation_id"}
					render={({ field }) => (
						<InputSelectController
							field={field}
							label="Deviation"
							disabled={isDetail}
							placeholder="Select Deviation"
							loading={isFetchingSupportData}
							items={diviationOptions}
							onChange={(value) => {
								form.setValue("deviation_id", value)
							}}
						/>
					)}
				/>

				{(consequences || []).map((consequence, idxConsequence) => {
					return (
						<div
							key={idxConsequence}
							className="flex flex-row gap-4 items-end"
						>
							<div className="w-full" >

							<FormField
								control={form.control}
								name={`consequences.${idxConsequence}.id`}
								render={({ field }) => (
									<InputController
										{...field}
										type="hidden"
										placeholder="Enter Consequence"
									/>
								)}
							/>
							<FormField
								control={form.control}
								name={`consequences.${idxConsequence}.consequence`}
								render={({ field }) => (
									<InputController
										{...field}
										readOnly={isDetail}
										label="Consequence"
										placeholder="Enter Consequence"
										onChange={(e) => {
											form.setValue(
												`consequences.${idxConsequence}.consequence`,
												e.target.value
											)
										}}
									/>
								)}
							/>
							</div>
							{!isDetail && (
								<RemoveButton
									disabled={consequences.length <= 1}
									onClick={() => {
										removeConsequence(idxConsequence)
									}}
								/>
							)}
						</div>
					)
				})}
				{!isDetail && (
					<Button
						onClick={() => {
							handleAddConsequence()
						}}
						variant={"success"}
						type="button"
					>
						<Plus /> Add Consequence
					</Button>
				)}
				<SectionSafeguardRiskBank form={form} isDetail={isDetail} />
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

export default RiskBankForm
