"use client"
import AddButton from "@/components/buttons/AddButton"
import DataTable from "@/components/DataTable"
import InputSearch from "@/components/inputs/InputSearch"
import InputSelect from "@/components/inputs/InputSelect"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useColumnsMonitoring } from "@/hooks/use-columns-severty"
import { useToast } from "@/hooks/use-toast"
import { RiskMonitoringSeverityMultpleSchema } from "@/schemas/RiskMonitoringSchema"
import useRiskMonitoringStore from "@/store/riskMonitoringStore"
import { SelectDataType } from "@/types/common"
import {
	RiskMonitoring,
	RiskMonitoringSevertyMultipleForm,
} from "@/types/riskMonitoring"
// import { RiskAnalysisSevertyMultipleForm } from "@/schemas/RiskAnalystSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { useForm } from "react-hook-form"

interface IProps {
	basePathname: string
}

const RiskMonitoringFormMultiple: React.FC<IProps> = ({ basePathname }) => {
	const { toast } = useToast()
	const router = useRouter()

	const {
		actions: { setPagination, setNodeSelected },
		nodeSelected,
		isFetching,
		riskMonitoringItems,
		meta,
		isSubmit,
		pagination_tanstack,
		supportData: {
			node: { nodeItems, isFetching: isFetchingNode },
		},
	} = useRiskMonitoringStore()
	const total = meta?.total || 0

	const defaultValues: RiskMonitoringSevertyMultipleForm =
		React.useMemo(() => {
			// console.log
			return {
				risks: riskMonitoringItems.map((item) => ({
					sp_affected: item.sp_affected, // Assuming sp_affected is a numeric property of item
					sf_affected: item.sf_affected,
					se_affected: item.se_affected,
					srl_affected: item.srl_affected,
					sa_affected: item.sa_affected,
					spn_affected: item.spn_affected,
					risk_monitoring_id: item.id.toString(),
				})),
			}
		}, [riskMonitoringItems])

	const form = useForm<RiskMonitoringSevertyMultipleForm>({
		resolver: zodResolver(RiskMonitoringSeverityMultpleSchema),
		progressive: false,
		mode: "onChange",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: defaultValues,
	})

	const handleAction = useCallback(
		(actionName: string, id: any) => {
			if (actionName === "update") {
				router.push(basePathname + "/update/" + id)
			} else if (actionName === "detail") {
				router.push(basePathname + "/detail/" + id)
			} else if (actionName === "delete") {
				//
				// setShownAlertDel({
				// 	id,
				// 	shown: true,
				// })
			}
		},
		[basePathname]
	)

	// const handleSubmit = async (values: RiskMonitoringSevertyMultipleForm) => {
	// 	try {
	// 		if (nodeSelected?.id && updateSavertyMultiple) {
	// 			const result = await updateSavertyMultiple(
	// 				nodeSelected?.id,
	// 				values
	// 			)
	// 			if (!result.errors) {
	// 				toast({
	// 					title: result.message ?? "",
	// 					variant: "success",
	// 				})
	// 			} else {
	// 				throw new Error(result.errors)
	// 			}
	// 		} else {
	// 			throw new Error("Please Select Node before")
	// 		}
	// 	} catch (error: any) {
	// 		console.log({ error })
	// 		toast({
	// 			title: error?.message
	// 				? error.message
	// 				: "An unexpected error occurred",
	// 			variant: "destructive",
	// 		})
	// 	}
	// }

	const handleSubmit = useCallback(() => {}, [])

	const { column } = useColumnsMonitoring({
		onAction: handleAction,
		form,
	})

	const nodeOptions: SelectDataType[] = nodeItems.map((node) => ({
		label: node.node,
		value: node.id?.toString(),
	}))

	return (
		<Form {...form}>
			<form
				className="space-y-4 max-w-full "
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<div className="flex flex-row justify-between items-end">
					<div className="flex flex-row gap-2 items-end">
						<InputSelect
							label="Filter by Node"
							placeholder="Select Node"
							items={nodeOptions}
							loading={isFetchingNode}
							className="w-[264px]"
							value={nodeSelected?.id?.toString() ?? ""}
							onValueChange={(value) => {
								setNodeSelected(parseInt(value))
							}}
						/>
						<Link href={basePathname + "/add"}>
							<AddButton label="Add Risk Incidence" />
						</Link>
					</div>
					<Button disabled={isSubmit} variant={"secondary"}>
						{isSubmit && <Spinner className="w-4 h-4" />}
						<Save /> Save Changes Severity
					</Button>
				</div>
				<DataTable<RiskMonitoring>
					columns={column}
					data={riskMonitoringItems}
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

export default RiskMonitoringFormMultiple
