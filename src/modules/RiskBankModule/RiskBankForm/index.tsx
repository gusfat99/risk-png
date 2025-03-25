"use client"
import InputController from "@/components/inputs/InputController"
import InputFileContoller from "@/components/inputs/InputFileController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { API_URL } from "@/constants"
import { useToast } from "@/hooks/use-toast"
import { initialRiskBank, RiskBankSchema } from "@/schemas/RiskBankSchema"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Save } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { parseRiskBanktoView } from "../parseRiskBank"
import RemoveButton from "@/components/buttons/RemoveButton"
import SectionSafeguardRiskBank from "./SectionSafeguardRiskBank"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
}

const RiskBankForm: React.FC<IProps> = ({ isDetail, isEdit }) => {
	const {
		riskDataBankSelected,
		actions: { createData },
		isSubmit,
	} = useRiskDataBankStore()
	const { toast } = useToast()
	const route = useRouter()
	const params = useParams<{ id: any }>()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])

	const handleSubmit = (values: z.infer<typeof RiskBankSchema>) => {}

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
				  }
				: { ...initialRiskBank },
	})

	const consequences = form.watch("consequences")
	const fieldArrayConsequences = useFieldArray({
		control: form.control,
		name: "consequences",
		keyName: "idx",
	})
	const { append: appendConsequence, remove: removeConsequence, update : updateConsequence } =
		fieldArrayConsequences

	const handleAddConsequence = () => {
		appendConsequence({
			consequence: "",
			safeguards: [],
		})
	}
	const handleAddSafeguard = (idxConsequences: number) => {
		const consequencesCopy = [...consequences];
		let safeguard = consequencesCopy[idxConsequences].safeguards;
		safeguard = [
			...safeguard,
			{
				safeguard: "",
				safeguard_title: "",
			},
		]
		updateConsequence(idxConsequences, {
			...consequencesCopy[idxConsequences],
			safeguards : safeguard
		});
		
	}

	console.log({ consequences })

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
					name={"deviation"}
					render={({ field }) => (
						<InputController
							{...field}
							readOnly={isDetail}
							label="Deviation"
							placeholder="Enter Deviation"
							onChange={(e) => {
								form.setValue("deviation", e.target.value)
							}}
						/>
					)}
				/>

				{consequences.map((consequence, idxConsequence) => {
					return (
						<div
							key={idxConsequence}
							className="flex flex-row gap-4 items-end"
						>
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
							<RemoveButton
								disabled={consequences.length <= 1}
								onClick={() => {
									removeConsequence(idxConsequence)
								}}
							/>
						</div>
					)
				})}

				<Button
					onClick={() => {
						handleAddConsequence()
					}}
					variant={"success"}
					type="button"
				>
					<Plus /> Add Consequence
				</Button>
				<SectionSafeguardRiskBank form={form} />
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
