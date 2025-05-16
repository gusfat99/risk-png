"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import {
	initialRiskAnalyst,
	RiskAnalysisSchema,
} from "@/schemas/RiskAnalystSchema"
import useRiskAnalysStore from "@/store/risksAnalystStore"
import { RiskAnalysisForm } from "@/types/riksAnalyst"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { RiskDataBankSection } from "./RiskDataBankSection"
import RiskRankSection from "./RiskRankSection"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
}

const RiskAnalystForm: React.FC<IProps> = ({ isDetail, isEdit }) => {
	const {
		nodeSelected,
		riskAnalysSelected,
		isSubmit,
		actions: { updateData, createData },
	} = useRiskAnalysStore()

	const { toast } = useToast()
	const route = useRouter()
	const params = useParams<{ id: any }>()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])

	const handleSubmit = async (values: RiskAnalysisForm) => {
		try {
			if (createData && !params?.id && !isEdit) {
				if (nodeSelected?.id) {
					const result = await createData(values, nodeSelected?.id)

					if (result) {
						toast({
							title: result.message ?? "",
							variant: "success",
						})
						form.reset({ ...initialRiskAnalyst })
						route.replace(basePathname)
					} else {
						throw new Error("Failed")
					}
				} else {
					throw new Error("Please Select Node before!")
				}
			} else if (updateData && params.id && isEdit) {
				const result = await updateData(
					params?.id,
					nodeSelected?.id,
					values
				)

				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...initialRiskAnalyst })
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

	const form = useForm<RiskAnalysisForm>({
		resolver: zodResolver(RiskAnalysisSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues:
			riskAnalysSelected && isEdit
				? {
						...riskAnalysSelected,
						parameter_id:
							riskAnalysSelected.parameter_id.toString(),
						deviation_id:
							riskAnalysSelected.deviation_id.toString(),
						consequence_id:
							riskAnalysSelected.consequence_id.toString(),
						risk_bank_id:
							riskAnalysSelected.risk_bank_id.toString(),
						l_frequency_current:
							riskAnalysSelected.l_frequency_current.toString(),
						risk_rank:
							riskAnalysSelected.risk_ranking_current.toString(),
						spn_current: riskAnalysSelected.spn_current.toString(),
						sa_current: riskAnalysSelected.sa_current.toString(),
						srl_current: riskAnalysSelected.srl_current.toString(),
						se_current: riskAnalysSelected.se_current.toString(),
						sf_current: riskAnalysSelected.sf_current.toString(),
						sp_current: riskAnalysSelected.sp_current.toString(),
				  }
				: initialRiskAnalyst,
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				{nodeSelected && <NodeDataCard nodeSelected={nodeSelected} />}
				<RiskDataBankSection
					form={form}
					isEdit={isEdit}
					isDetail={isDetail}
				/>
				<RiskRankSection
					form={form}
					isEdit={isEdit}
					isDetail={isDetail}
				/>
				<FormField
					control={form.control}
					name={"remark_analyst"}
					render={({ field }) => (
						<InputController
							{...field}
							readOnly={isDetail}
							label={"Notes Special Condition / Remarks"}
							placeholder={
								"Enter Notes Special Condition / Remarks"
							}
							onChange={(e) => {
								const value = e.target.value
								form.setValue("remark_analyst", value)
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
							{!isSubmit && <Save />}
							Save Data
						</Button>
					</div>
				)}
			</form>
		</Form>
	)
}

export default RiskAnalystForm
