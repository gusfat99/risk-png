"use client"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import {
	initialRiskMonitoring,
	RiskMonitoringSchema,
} from "@/schemas/RiskMonitoringSchema"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { RiskMonitoringSchemaForm } from "@/types/riskMonitoring"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import RiskDataBankSection from "./RiskDataBankSection"
import RiskIncidentSection from "./RiskIncidentSection"
import RiskRankSection from "./RiskRankSection"

interface IProps {
	isDetail?: boolean
	isEdit?: boolean
}

const RiskMonitoringForm: React.FC<IProps> = ({ isDetail, isEdit }) => {
	const {
		isSubmit,
		riskMonitoringSelected,
		actions: { createData, updateData },
	} = useRiskMonitoringStore()

	const { toast } = useToast()
	const route = useRouter()
	const params = useParams<{ id: any }>()
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])
	console.log({ riskMonitoringSelected })
	const form = useForm<RiskMonitoringSchemaForm>({
		resolver: zodResolver(RiskMonitoringSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues:
			isEdit && riskMonitoringSelected
				? {
						...riskMonitoringSelected,
						nip: riskMonitoringSelected.nip,
						name: riskMonitoringSelected.name,
						evidence:
							`${riskMonitoringSelected.evidence}` as unknown as File,
						incident_date: riskMonitoringSelected.incident_date,
						incident_time: riskMonitoringSelected.incident_time,
						consequence_id: Number(
							riskMonitoringSelected.consequence_id
						),
						safeguard_failure:
							riskMonitoringSelected.failed_safeguards.map(
								(x) => ({
									label: x.safeguard,
									value: x.id.toString(),
								})
							),
						node_id: String(riskMonitoringSelected.node_id),
						deviation_id: String(
							riskMonitoringSelected.deviation_id
						),
						parameter_id: String(
							riskMonitoringSelected.parameter_id
						),
						risk_bank_id: String(
							riskMonitoringSelected.risk_bank_id
						),
						sp_affected: String(riskMonitoringSelected.sp_affected),
						sf_affected: String(riskMonitoringSelected.sf_affected),
						se_affected: String(riskMonitoringSelected.se_affected),
						srl_affected: String(
							riskMonitoringSelected.srl_affected
						),
						sa_affected: String(riskMonitoringSelected.sa_affected),
						spn_affected: String(
							riskMonitoringSelected.spn_affected
						),
				  }
				: {
						...initialRiskMonitoring,
				  },
	})

	const handleSubmit = async (values: RiskMonitoringSchemaForm) => {
		try {
			if (createData && !params?.id && !isEdit) {
				const result = await createData(values)

				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...initialRiskMonitoring })
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
					form.reset({ ...initialRiskMonitoring })
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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<RiskDataBankSection
					form={form}
					isEdit={isEdit}
					isDetail={isDetail}
				/>
				<RiskIncidentSection
					form={form}
					isEdit={isEdit}
					isDetail={isDetail}
				/>
				<RiskRankSection
					form={form}
					isEdit={isEdit}
					isDetail={isDetail}
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

export default RiskMonitoringForm
