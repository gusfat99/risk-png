"use client"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useColumnsRiskResponse } from "@/hooks/use-columns-severty"
import { useToast } from "@/hooks/use-toast"
// import useColumnsRiskAnalyst from "@/modules/RiskAnalystModule/columns"
import { RiskAnalysisSeverityMultpleSchema } from "@/schemas/RiskAnalystSchema"
import useRiskResponseStore from "@/store/riskResponseStore"
import { RiskAnalysisSevertyMultipleForm } from "@/types/riksAnalyst"
import {
	RiskResponseParent,
	RiskResponseSevertyExpectMultipleSchemaForm,
} from "@/types/riskResponse"
// import { RiskAnalysisSevertyMultipleForm } from "@/schemas/RiskAnalystSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"

interface IProps {
	basePathname: string
}

const RiskResponseFormMultiple: React.FC<IProps> = ({ basePathname }) => {
	const { toast } = useToast()
	const {
		actions: { setPagination, updateSavertyExpectMultiple },
		isFetching,
		riskResponseItems,
		meta,
		isSubmit,
		pagination_tanstack,
		nodeSelected,
	} = useRiskResponseStore()
	const total = meta?.total || 0

	const defaultValues: RiskAnalysisSevertyMultipleForm = React.useMemo(() => {
		// console.log
		return {
			risks: riskResponseItems.map((item) => ({
				sp_current: item.sp_current,
				sf_current: item.sf_current,
				se_current: item.se_current,
				srl_current: item.srl_current,
				sa_current: item.sa_current,
				spn_current: item.spn_current,
				l_frequency_current: item.l_frequency_current,
				risk_analyst_id: item.id.toString(),
			})),
		}
	}, [riskResponseItems])

	const form = useForm<RiskResponseSevertyExpectMultipleSchemaForm>({
		resolver: zodResolver(RiskAnalysisSeverityMultpleSchema),
		progressive: false,
		mode: "onChange",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: defaultValues,
	})

	const handleAction = (actionName: string, id: any) => {}

	const handleSubmit = async (
		values: RiskResponseSevertyExpectMultipleSchemaForm
	) => {
		try {
			if (nodeSelected?.id && updateSavertyExpectMultiple) {
				const result = await updateSavertyExpectMultiple(
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

	const { column } = useColumnsRiskResponse({
		onAction: handleAction,
		form,
	})

	return (
		<Form {...form}>
			<form
				className="space-y-4 max-w-full "
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<div className="flex flex-row justify-between items-end">
					<div className="flex flex-row gap-2 items-end">
						<InputSearch
							label="Filter Data"
							isRequired={false}
							placeholder="Search..."
							// className="max-w-sm"
						/>
					</div>
					<Button disabled={isSubmit} variant={"secondary"}>
						{isSubmit && <Spinner className="w-4 h-4" />}
						<Save /> Save Changes Severty
					</Button>
				</div>
				<DataTable<RiskResponseParent>
					columns={column}
					data={riskResponseItems}
					loading={isFetching}
					rowCount={total}
					manualPagination={true}
					onPaginationChange={setPagination}
					pagination={pagination_tanstack}
				/>
			</form>
		</Form>
	)
}

export default RiskResponseFormMultiple
