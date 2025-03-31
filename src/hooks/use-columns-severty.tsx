import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import InputController from "@/components/inputs/InputController"
import TableRowActions from "@/components/TableRowActions"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form"
import { useDebounce } from "@/hooks/use-debounce"
import {
	RiskAnalysis,
	RiskAnalysisSevertyMultipleForm,
} from "@/types/riksAnalyst"
import { RiskMonitoring, RiskMonitoringSevertyMultipleForm } from "@/types/riskMonitoring"
import {
	RiskResponseParent,
	RiskResponseSevertyExpectMultipleSchemaForm,
} from "@/types/riskResponse"
import { ColumnDef } from "@tanstack/react-table"
import React, { useMemo } from "react"
import { UseFormReturn } from "react-hook-form"

interface UseColumnsProps {
	onAction?: (actionName: string, id: any) => void
}

interface UseColumnsRiskAnalystProps extends UseColumnsProps {
	form: UseFormReturn<RiskAnalysisSevertyMultipleForm>
}

interface UseColumnsRiskMonitoringProps extends UseColumnsProps {
	form: UseFormReturn<RiskMonitoringSevertyMultipleForm>
}

interface UseColumnsRiskResponseProps extends UseColumnsProps {
	form: UseFormReturn<RiskResponseSevertyExpectMultipleSchemaForm>
}

const CellInput = ({ row, form, name }: { row: any; form: any; name: any }) => {
	const rowId = row.index

	const debouncedUpdate = useDebounce((key: any, value: any) => {
		form.setValue(key, value)
	})

	return (
		<FormField
			control={form.control}
			name={`risks.${rowId}.${name}`}
			render={({ field }) => (
				<InputController
					defaultValue={field.value}
					type="number"
					placeholder="Enter SP"
					onChange={(e) => {
						debouncedUpdate(
							`risks.${rowId}.${name}`,
							parseInt(e.target.value) as any
						)
					}}
				/>
			)}
		/>
	)
}

const MemoizedCellInput = React.memo(
	CellInput,
	(prev, next) => prev.row.id === next.row.id
)

export const useColumnsRiskAnalyst = ({
	onAction,
	form,
}: UseColumnsRiskAnalystProps): {
	column: ColumnDef<RiskAnalysis>[]
} => {
	const column: ColumnDef<RiskAnalysis>[] = useMemo(() => {
		const cols: ColumnDef<RiskAnalysis>[] = [
			{
				header: "No",
				cell: ({ row, table }) => {
					const { pageIndex, pageSize } = table.getState().pagination

					return (pageIndex - 1) * pageSize + row.index + 1
				},
			},
			{
				id: "id",
				accessorFn: (row) => row.id,
				meta: {
					hiddenFilter: true,
				},
				header: () => {
					return <div className="flex justify-start">Action</div>
				},
				cell: ({ row }) => (
					<TableRowActions
						onAction={(actionName: string) => {
							onAction && onAction(actionName, row.getValue("id"))
						}}
					/>
				),
			},
			{
				id: "deviation",
				accessorFn: (row) => row.deviations.deviation ?? "",
				meta: {
					hiddenFilter: true,
				},
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Deviation"
						/>
					)
				},
				cell: ({ row }) => row.getValue("deviation"),
			},
			{
				id: "cause",
				accessorFn: (row) => `${row.causes.cause}`,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader column={column} title="Cause" />
					)
				},
				cell: ({ row }) => <div>{row.getValue("cause")}</div>,
			},
			{
				id: "consequence",
				accessorFn: (row) => row.consequences.consequence,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Consequence"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("consequence")}</div>
					// <></>
				),
			},
			{
				id: "existing_safeguard",
				accessorFn: (row) => row.existing_safeguard,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Existing safeguard"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("existing_safeguard")}</div>
				),
			},
			{
				id: "sp_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Personel (SP)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<React.Fragment>
							<FormField
								control={form.control}
								name={`risks.${row.index}.risk_analyst_id`}
								render={({ field }) => (
									<InputController
										{...field}
										type="hidden"
										placeholder="Enter SP"
										readOnly
										hidden
									/>
								)}
							/>
							<MemoizedCellInput
								row={row}
								form={form}
								name="sp_current"
							/>
						</React.Fragment>
					)
				},
			},
			{
				id: "se_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Environment (EP)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="se_current"
						/>
					)
				},
			},
			{
				id: "sf_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Finance (SF)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sf_current"
						/>
					)
				},
			},
			{
				id: "srl_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Reputation & Ilegal (SRL)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="srl_current"
						/>
					)
				},
			},
			{
				id: "sa_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Asset (SA)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sa_current"
						/>
					)
				},
			},
			{
				id: "spn_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Public Notification (SPN)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="spn_current"
						/>
					)
				},
			},
			{
				id: "l_frequency_current_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Likelihood Frequency Kejadian (L)"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="l_frequency_current"
						/>
					)
				},
			},
			{
				id: "risk_rank",
				accessorFn: (row) => row.risk_ranking_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Risk Ranking (RR)"
						/>
					)
				},
				cell: ({ row }) => {
					const severty = form.watch("risks")[row.index]
					const severties = [
						severty["sa_current"],
						severty["sp_current"],
						severty["se_current"],
						severty["spn_current"],
						severty["srl_current"],
					]
					const maxValSeverty = Math.max(...severties)
					const risk_ranking_current =
						maxValSeverty * severty["l_frequency_current"]
					return (
						<div className="font-semibold text-center">
							{risk_ranking_current}
						</div>
						// <></>
					)
				},
			},
			{
				id: "remark_analyst",
				accessorFn: (row) => row.remark_analyst,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Notes Special Condition / Remarks"
						/>
					)
				},
				cell: ({ row }) => <div>{row.getValue("remark_analyst")}</div>,
			},
		]
		return cols
	}, [form])

	return {
		column,
	}
}

export const useColumnsRiskResponse = ({
	onAction,
	form,
}: UseColumnsRiskResponseProps): {
	column: ColumnDef<RiskResponseParent>[]
} => {
	const column: ColumnDef<RiskResponseParent>[] = useMemo(() => {
		const cols: ColumnDef<RiskResponseParent>[] = [
			{
				header: "No",
				cell: ({ row, table }) => {
					const { pageIndex, pageSize } = table.getState().pagination

					return (pageIndex - 1) * pageSize + row.index + 1
				},
			},
			{
				id: "id",
				accessorFn: (row) => row.id,
				meta: {
					hiddenFilter: true,
				},
				header: () => {
					return (
						<div className="flex justify-start">
							HAZOP Recomendation
						</div>
					)
				},
				cell: ({ row }) => (
					<Button variant={"secondary_300"}>Hazop</Button>
				),
			},
			{
				id: "deviation",
				accessorFn: (row) => row.deviations.name ?? "",
				meta: {
					hiddenFilter: true,
				},
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Deviation"
						/>
					)
				},
				cell: ({ row }) => row.getValue("deviation"),
			},
			{
				id: "cause",
				accessorFn: (row) => `${row.causes.cause}`,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader column={column} title="Cause" />
					)
				},
				cell: ({ row }) => <div>{row.getValue("cause")}</div>,
			},
			{
				id: "consequence",
				accessorFn: (row) => row.consequences.consequence,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Consequence"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("consequence")}</div>
					// <></>
				),
			},
			{
				id: "existing_safeguard",
				accessorFn: (row) => row.existing_safeguard,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Existing safeguard"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("existing_safeguard")}</div>
				),
			},
			{
				id: "sp_current",
				accessorFn: (row) => row.sp_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Personel (SP) Current"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{" "}
							{row.getValue("sp_current")}
						</div>
					)
				},
			},
			{
				id: "se_current",
				accessorFn: (row) => row.se_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Environment (EP) Current"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{" "}
							{row.getValue("se_current")}
						</div>
					)
				},
			},
			{
				id: "sf_current",
				accessorFn: (row) => row.sf_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Finance (SF) Current"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{" "}
							{row.getValue("sf_current")}
						</div>
					)
				},
			},
			{
				id: "srl_current",
				accessorFn: (row) => row.srl_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Saverty to Reputation & Ilegal (SRL) Current"
							}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{" "}
							{row.getValue("srl_current")}
						</div>
					)
				},
			},
			{
				id: "sa_current",
				accessorFn: (row) => row.sa_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Asset (SA) Current"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{" "}
							{row.getValue("sa_current")}
						</div>
					)
				},
			},
			{
				id: "spn_current",
				accessorFn: (row) => row.spn_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Saverty to Public Notification (SPN) Current"
							}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{row.getValue("spn_current")}
						</div>
					)
				},
			},
			{
				id: "l_frequency_current",
				accessorFn: (row) => row.l_frequency_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Likelihood Frequency Kejadian (L) Current"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{row.getValue("l_frequency_current")}
						</div>
					)
				},
			},
			{
				id: "risk_ranking_current",
				accessorFn: (row) => row.risk_ranking_current,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Rank Risk (RR) Current"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="text-center">
							{row.getValue("risk_ranking_current")}
						</div>
					)
				},
			},
			{
				id: "sp_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Personel (SP) Expected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<React.Fragment>
							<FormField
								control={form.control}
								name={`risks.${row.index}.risk_analyst_id`}
								render={({ field }) => (
									<InputController
										{...field}
										type="hidden"
										placeholder="Enter SP"
										readOnly
										hidden
									/>
								)}
							/>
							<MemoizedCellInput
								row={row}
								form={form}
								name="sp_expect"
							/>
						</React.Fragment>
					)
				},
			},
			{
				id: "se_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Environment (EP) Expected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="se_expect"
						/>
					)
				},
			},
			{
				id: "sf_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Finance (SF) Expected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sf_expect"
						/>
					)
				},
			},
			{
				id: "srl_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Saverty to Reputation & Ilegal (SRL) Expected"
							}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="srl_expect"
						/>
					)
				},
			},
			{
				id: "sa_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Asset (SA) Expected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sa_expect"
						/>
					)
				},
			},
			{
				id: "spn_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={
								"Saverty to Public Notification (SPN) Expected"
							}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="spn_expect"
						/>
					)
				},
			},
			{
				id: "l_frequency_expect_risk_analyst_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Likelihood Frequency Kejadian (L) Expected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="l_frequency_expect"
						/>
					)
				},
			},
			{
				id: "risk_ranking_expected",
				accessorFn: (row) => row.risk_response.risk_ranking_expected,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Risk Ranking (RR) Expected"
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<div className="font-semibold text-center">
							{row.getValue("risk_ranking_expected")}
						</div>
						// <></>
					)
				},
			},
			{
				id: "remark_analyst",
				accessorFn: (row) => row.remark_analyst,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Notes Special Condition / Remarks"
						/>
					)
				},
				cell: ({ row }) => <div>{row.getValue("remark_analyst")}</div>,
			},
		]
		return cols
	}, [form])

	return {
		column,
	}
}

export const useColumnsMonitoring = ({ 
	onAction,
	form,
}: UseColumnsRiskMonitoringProps): {
	column: ColumnDef<RiskMonitoring>[]
} => {
	const column: ColumnDef<RiskMonitoring>[] = useMemo(() => {
		const cols: ColumnDef<RiskMonitoring>[] = [
			{
				header: "No",
				cell: ({ row, table }) => {
					const { pageIndex, pageSize } = table.getState().pagination

					return (pageIndex - 1) * pageSize + row.index + 1
				},
			},
			{
				id: "id",
				accessorFn: (row) => row.id,
				meta: {
					hiddenFilter: true,
				},
				header: () => {
					return <div className="flex justify-start">Action</div>
				},
				cell: ({ row }) => (
					<TableRowActions
						onAction={(actionName: string) => {
							onAction && onAction(actionName, row.getValue("id"))
						}}
					/>
				),
			},
			{
				id: "deviation",
				accessorFn: (row) => row.deviations.deviation ?? "",
				meta: {
					hiddenFilter: true,
				},
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Deviation"
						/>
					)
				},
				cell: ({ row }) => row.getValue("deviation"),
			},
			{
				id: "cause",
				accessorFn: (row) => `${row.causes.cause}`,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader column={column} title="Cause" />
					)
				},
				cell: ({ row }) => <div>{row.getValue("cause")}</div>,
			},
			{
				id: "incident_name",
				accessorFn: (row) => row.incident_name,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Incident Name"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("incident_name")}</div>
					// <></>
				),
			},
			{
				id: "incident_location",
				accessorFn: (row) => row.incident_location,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Incident Location"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("incident_location")}</div>
				),
			},
			{
				id: "incident_trigger",
				accessorFn: (row) => row.incident_trigger,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Incident Trigger"
						/>
					)
				},
				cell: ({ row }) => (
					<div>{row.getValue("incident_trigger")}</div>
				),
			},
			{
				id: "sp_affected_monitoring_id",
				accessorFn: (row) => row.sp_affected,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Personel (SP) Affected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<React.Fragment>
							<FormField
								control={form.control}
								name={`risks.${row.index}.risk_monitoring_id`}
								render={({ field }) => (
									<InputController
										{...field}
										type="hidden"
										placeholder="Enter"
										readOnly
										hidden
									/>
								)}
							/>
							<MemoizedCellInput
								row={row}
								form={form}
								name="sp_affected"
							/>
						</React.Fragment>
					)
				},
			},
			{
				id: "se_affected_monitoring_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Environment (EP) Affected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="se_affected"
						/>
					)
				},
			},
			{
				id: "sf_affected_monitoring_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Finance (SF) Affected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sf_affected"
						/>
					)
				},
			},
			{
				id: "srl_affected_monitoring_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Reputation & Ilegal (SRL) Affected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="srl_affected"
						/>
					)
				},
			},
			{
				id: "sa_affected_monitoring_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Asset (SA) Affected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="sa_affected"
						/>
					)
				},
			},
			{
				id: "spn_affected_monitoring_id",
				accessorFn: (row) => row.id,
				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title={"Saverty to Public Notification (SPN) Affected"}
						/>
					)
				},
				cell: ({ row }) => {
					return (
						<MemoizedCellInput
							row={row}
							form={form}
							name="spn_affected"
						/>
					)
				},
			},
		
		
			
		]
		return cols
	}, [form])

	return {
		column,
	}
}
