"use client"
import DataTable from "@/components/DataTable"
import DialogMain from "@/components/dialogs/DialogMain"
import InputSearch from "@/components/inputs/InputSearch"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useColumnsRiskResponse } from "@/hooks/use-columns-severty"
import { useToast } from "@/hooks/use-toast"
// import useColumnsRiskAnalyst from "@/modules/RiskAnalystModule/columns"
import { RiskResponseSevertyExpectMultipleSchema } from "@/schemas/RiskResponseSchema"
import useRiskResponseStore from "@/store/riskResponseStore"
import {
	RiskResponse,
	RiskResponseSevertyExpectMultipleSchemaForm,
} from "@/types/riskResponse"
// import { RiskAnalysisSevertyMultipleForm } from "@/schemas/RiskAnalystSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import HazopRecomendationsForm from "../HazopRecomendationsForm"

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
	const [hazopOpen, setHazopOpen] = React.useState<{
		hazop_id: any | null
		rysk_analyst_id: any | null
		open: boolean
	}>({
		hazop_id: null,
		rysk_analyst_id: null,
		open: false,
	})

	const defaultValues: RiskResponseSevertyExpectMultipleSchemaForm =
		React.useMemo(() => {
			// console.log
			return {
				risks: riskResponseItems.map((item) => ({
					sp_expected: item.sp_expected,
					sf_expected: item.sf_expected,
					se_expected: item.se_expected,
					srl_expected: item.srl_expected,
					sa_expected: item.sa_expected,
					spn_expected: item.spn_expected,
					l_frequency_expected: item.l_frequency_expected,
					risk_analyst_id: item.risk_analyst.id.toString(),
				})),
			}
		}, [riskResponseItems])

	const form = useForm<RiskResponseSevertyExpectMultipleSchemaForm>({
		resolver: zodResolver(RiskResponseSevertyExpectMultipleSchema),
		progressive: false,
		mode: "onChange",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: defaultValues,
	})

	const handleAction = useCallback(
		(actionName: string, row: RiskResponse) => {
			
			if (actionName === "hazop") {
				// setSelectedId(id)
				setHazopOpen((prev) => ({
					...prev,
					hazop_id: row.id,
					rysk_analyst_id: row.risk_analyst.id,
					open: true,
				}))
			}
		},
		[]
	)

	const handleSubmit = useCallback(
		async (values: RiskResponseSevertyExpectMultipleSchemaForm) => {
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
		},
		[updateSavertyExpectMultiple, nodeSelected, toast]
	)

	const { column } = useColumnsRiskResponse({
		onAction: handleAction,
		form,
	})

	return (
		<React.Fragment>
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
							<Save /> Save Changes Severity
						</Button>
					</div>
					<DataTable<RiskResponse>
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
			<DialogMain
				open={hazopOpen.open}
				onOpenChange={(value) => {
					setHazopOpen((prev) => ({
						...prev,
						open: value,
					}))
				}}
				title="Hazop Recomendation"
				size="7xl"
			>
				<HazopRecomendationsForm/>
			</DialogMain>
		</React.Fragment>
	)
}

export default RiskResponseFormMultiple
