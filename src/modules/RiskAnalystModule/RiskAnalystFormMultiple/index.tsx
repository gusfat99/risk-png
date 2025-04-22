"use client"
import DataTable from "@/components/DataTable"
import { Form } from "@/components/ui/form"
import { useColumnsRiskAnalyst } from "@/hooks/use-columns-severty"
import { useToast } from "@/hooks/use-toast"
import { RiskAnalysisSeverityMultpleSchema } from "@/schemas/RiskAnalystSchema"
import useRiskAnalystStore from "@/store/risksAnalystStore"
import { FormRefType } from "@/types/common"
import {
	RiskAnalysis,
	RiskAnalysisSevertyMultipleForm,
} from "@/types/riksAnalyst"
// import { RiskAnalysisSevertyMultipleForm } from "@/schemas/RiskAnalystSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React, { forwardRef, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"

interface IProps {
	basePathname: string
}


const RiskAnalystFormMultiple = forwardRef<FormRefType, IProps>(
	({ basePathname }, ref) => {
		const { toast } = useToast()
		const router = useRouter()
		const {
			actions: { setPagination, updateSavertyMultiple },
			isFetching,
			riskAnalysItems,
			meta,
			pagination_tanstack,
			nodeSelected,
		} = useRiskAnalystStore()
		const total = meta?.total || 0

		const defaultValues: RiskAnalysisSevertyMultipleForm =
			React.useMemo(() => {
				// console.log
				return {
					risks: riskAnalysItems.map((item) => ({
						sp_current: item.sp_current,
						sf_current: item.sf_current,
						se_current: item.se_current,
						srl_current: item.srl_current,
						sa_current: item.sa_current,
						spn_current: item.spn_current,
						l_frequency_current: item.l_frequency_current,
						risk_analyst_id: item?.id?.toString(),
					})),
				}
			}, [riskAnalysItems])

		const form = useForm<RiskAnalysisSevertyMultipleForm>({
			resolver: zodResolver(RiskAnalysisSeverityMultpleSchema),
			progressive: false,
			mode: "onChange",
			reValidateMode: "onSubmit",
			shouldFocusError: true,
			shouldUnregister: true,
			defaultValues: defaultValues,
		})

		const handleAction = (actionName: string, id: any) => {
			if (actionName === "update") {
				router.push(`${basePathname}/update/${id}`)
			} else if (actionName === "detail") {
				router.push(`${basePathname}/detail/${nodeSelected?.id}/${id}`)
			}
		}


		const onSubmit = async (values: RiskAnalysisSevertyMultipleForm) => {
			try {
				if (nodeSelected?.id && updateSavertyMultiple) {
					const result = await updateSavertyMultiple(
						nodeSelected?.id,
						values
					)
					if (!result.errors) {
						toast({
							title: result.message ?? "",
							variant: "success",
						})
					} else {
						throw new Error(result.errors)
					}
				} else {
					throw new Error("Please Select Node before")
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

		const { column } = useColumnsRiskAnalyst({
			onAction: handleAction,
			form,
		})

		// Expose submit to parent
		useImperativeHandle(ref, () => ({
			submit: form.handleSubmit(onSubmit),
		}))

		return (
			<Form {...form}>
				<form
					className="space-y-4 max-w-full  "
					// onSubmit={form.handleSubmit(handleSubmit)}
				>
					{riskAnalysItems && riskAnalysItems.length > 0 && (
						<DataTable<RiskAnalysis>
							columns={column}
							data={riskAnalysItems}
							loading={isFetching}
							rowCount={total}
							manualPagination={true}
							onPaginationChange={setPagination}
							pagination={pagination_tanstack}
						/>
					)}
				</form>
			</Form>
		)
	}
)

export default RiskAnalystFormMultiple
