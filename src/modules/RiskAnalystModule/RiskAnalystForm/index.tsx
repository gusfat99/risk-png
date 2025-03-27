"use client"
import NodeDataCard from "@/components/cards/NodeDataCard"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import {
	initialRiskAnalyst,
	RiskAnalysisSchema,
} from "@/schemas/RiskAnalystSchema"
import { initialRiskBank } from "@/schemas/RiskBankSchema"
import useRiskAnalysStore from "@/store/riksAnalysStore"
import useRiskDataBankStore from "@/store/riskDataBankStore"
import { RiskAnalysisForm } from "@/types/riksAnalys"
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
		actions: { createData, updateData },

		isSubmit,
	} = useRiskDataBankStore()
	const {
		nodeSelected,
		
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
				// const formDataPayload = parseRiskBankToPayload(values)
				const result = await createData(values)

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

	const form = useForm<RiskAnalysisForm>({
		resolver: zodResolver(RiskAnalysisSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: initialRiskAnalyst,
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

export default RiskAnalystForm
