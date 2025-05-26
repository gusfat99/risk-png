"use client"
import ActionSave from "@/components/ActionSave"
import InputSelectController from "@/components/inputs/InputSelectController"
import { Form, FormField } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { fieldsInputSeverity, zeroValueOptionSeverity } from "@/data/severity"
import { useToast } from "@/hooks/use-toast"
import {
	initialDataSevertyExpect,
	RiskResponseSevertyExpectSchema,
} from "@/schemas/RiskResponseSchema"
import useRiskResponseStore from "@/store/riskResponseStore"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { SelectDataType } from "@/types/common"
import { RiskResponseSevertyExpectSchemaForm } from "@/types/riskResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, usePathname, useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"

interface IProps {
	isEdit?: boolean
}

const RiskResponseSeverityExpectedForm: React.FC<IProps> = ({ isEdit }) => {
	const { severity_map_options, likelyhood_options } = useSettingMatrixStore()
	const params = useParams()
	const router = useRouter()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])
	const { toast } = useToast()
	const {
		isSubmit,
		actions: { updateSavertyExpect },
	} = useRiskResponseStore()

	const form = useForm<RiskResponseSevertyExpectSchemaForm>({
		resolver: zodResolver(RiskResponseSevertyExpectSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: initialDataSevertyExpect,
	})

	const handleSubmit = async (
		values: RiskResponseSevertyExpectSchemaForm
	) => {
		try {
			if (updateSavertyExpect && params?.riskId && params.nodeId) {
				const result = await updateSavertyExpect(
					params.nodeId,
					params.riskId,
					values
				)
				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...initialDataSevertyExpect })
					router.replace(basePathname)
				} else {
					throw new Error("Failed")
				}
			} else {
				toast({
					title: "Update Saverty Expect Failed risk or node not found",
					variant: "destructive",
				})
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

	return (
		<div className="border-2 border-gray-200  rounded-lg p-4 space-y-4">
			<div className="text-center">
				<h5 className="text-secondary">Severity Expected</h5>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-4"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							{fieldsInputSeverity
								.filter((f) => f.group === 1)
								.map((fieldInput, index) => {
									const opts: SelectDataType[] = [
										zeroValueOptionSeverity,
										...severity_map_options.filter(
											(x) =>
												x.saverity_row_id?.toString() ===
												fieldInput.col_id?.toString()
										).map((x) => ({
											...x,
											value: parseInt(x.value),
										})),
									]
									return (
										<FormField
											key={index}
											control={form.control}
											name={
												fieldInput.field3 as keyof RiskResponseSevertyExpectSchemaForm
											}
											render={({ field }) => (
												<InputSelectController
													field={field}
													items={opts}
													label={fieldInput.label}
													placeholder={
														"Enter " +
														fieldInput.label
													}
													onChange={(value) => {
														form.setValue(
															fieldInput.field3 as keyof RiskResponseSevertyExpectSchemaForm,
															parseInt(value)
														)
													}}
												/>
											)}
										/>
									)
								})}
						</div>
						<div className="space-y-4">
							{fieldsInputSeverity
								.filter((f) => f.group === 2)
								.map((fieldInput, key) => {
									const opts: SelectDataType[] = [
										zeroValueOptionSeverity,
										...severity_map_options.filter(
											(x) =>
												x.saverity_row_id?.toString() ===
												fieldInput.col_id?.toString()
										).map((x) => ({
											...x,
											value: parseInt(x.value),
										})),
									]
									return (
										<FormField
											key={fieldInput.field3 + key}
											control={form.control}
											name={
												fieldInput.field3 as keyof RiskResponseSevertyExpectSchemaForm
											}
											render={({ field }) => (
												<InputSelectController
													field={field}
													items={opts}
													label={fieldInput.label}
													placeholder={
														"Enter " +
														fieldInput.label
													}
													onChange={(value) => {
														form.setValue(
															fieldInput.field3 as keyof RiskResponseSevertyExpectSchemaForm,
															parseInt(value)
														)
													}}
												/>
											)}
										/>
									)
								})}
						</div>
					</div>
					<Separator
						hidden={false}
						className="h-[2px] border border-gray-200"
					/>

					<FormField
						control={form.control}
						name={"l_frequency_expected"}
						render={({ field }) => (
							<InputSelectController
								field={field}
								items={likelyhood_options.map((x) => ({
									...x,
									value: parseInt(x.value),
								}))}
								// disabled={isDetail}
								label={
									"Likelyhood Frequency Kejadian (L) Expected"
								}
								placeholder={
									"Enter Likelyhood Frequency Kejadian (L) Expected"
								}
								onChange={(value) => {
									form.setValue("l_frequency_expected", parseInt(value))
								}}
							/>
						)}
					/>
					<ActionSave isSubmit={isSubmit} />
				</form>
			</Form>
		</div>
	)
}

export default RiskResponseSeverityExpectedForm
