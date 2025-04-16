"use client"
import DashboardChartDonutCard from "@/components/cards/DashboardChartDonutCard"
import DashboardRiskCard from "@/components/cards/DashboardRiskCard"
import DashboardRiskCardMain from "@/components/cards/DashboardRiskCardMain"
import DashboardRiskMatrixCard from "@/components/cards/DashboardRiskMatrixCard"
import InputSelect from "@/components/inputs/InputSelect"
import { cn, groupBy } from "@/lib/utils"
import useDashboardStore from "@/store/dashboard"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { SelectDataType } from "@/types/common"
import { CopyCheck, LineChart, SquareKanbanIcon } from "lucide-react"
import { useEffect } from "react"

const DashboardMain = () => {
	const {
		severity_map,
		likelyhood_frequency,
		risk_map,

		actions: { fetchRiskMap, fetchLikelyhood, fetchSeverityMap },
	} = useSettingMatrixStore()
	const {
		isFetching,
		dashboardItem,
		nodeSelected,
		supportData: {
			node: { nodeItems, isFetching: isFetchingNode },
		},
		actions: { fetchDashboard, fetchNodeData, setNodeSelected },
	} = useDashboardStore()

	const itemsCounting = [
		{
			label: "Risk Analyst",
			icon: LineChart,
			iconBgColor: "bg-primary-100",
			iconTextColor: "text-primary",
			content: [
				{
					label: "Amount of Risk Above Appetite",
					field: "amount_above_apetite",
				},
				{
					label: "Total Data",
					field: "total_risk",
				},
			],
		},
		{
			label: "Risk Response",
			icon: CopyCheck,
			iconBgColor: "bg-warning",
			iconTextColor: "text-warning-foreground",
			content: [
				{
					label: "Safeguards Implemented",
					field: "implemented_safeguard",
				},
				{
					label: "Safeguards Total",
					field: "total_safeguard",
				},
			],
		},
	]

	const severityMapGrouped = groupBy(severity_map.item || [], "column_value")

	useEffect(() => {
		fetchRiskMap()
		fetchLikelyhood()
		fetchSeverityMap()
		if (nodeItems.length === 0) {
			fetchNodeData()
		}
	}, [
		fetchRiskMap,
		fetchLikelyhood,
		fetchSeverityMap,

		fetchNodeData,
		nodeItems.length,
	])

	useEffect(() => {
		fetchDashboard()
	}, [nodeSelected, fetchDashboard])
	
	const nodeOptions: SelectDataType[] = nodeItems.map((node) => ({
		label: node.node,
		value: node.id?.toString(),
	}))

	return (
		<div className="max-w-full mt-4 space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<DashboardRiskCardMain
					title="Risk Data Bank"
					content={{
						label: "Total Data Registered",
						value: dashboardItem?.total_risk || 0,
					}}
					icon={<SquareKanbanIcon />}
				/>
				<div className="grid grid-cols-1 col-span-2 md:grid-cols-2 gap-2">
					<div className="w-full col-span-2">
						<InputSelect
							label="Filter by Node"
							placeholder="Select Node"
							items={nodeOptions}
							loading={isFetchingNode}
							className="w-full"
							value={nodeSelected?.id?.toString()}
							onValueChange={(value) => {
								setNodeSelected(value)
							}}
						/>
					</div>
					{itemsCounting.map((item, i) => (
						<DashboardRiskCard
							key={i}
							title={item.label}
							content={item.content}
							dashboardItem={dashboardItem}
							icon={
								<div
									className={cn([
										item.iconBgColor,
										item.iconTextColor,
										"p-2 rounded-lg",
									])}
								>
									{<item.icon />}
								</div>
							}
						/>
					))}
				</div>
			</div>
			<div className="grid md:grid-cols-3 grid-cols-1 gap-2">
				<div className="space-y-4">
					<DashboardChartDonutCard title="RISK" />
					<DashboardChartDonutCard title="SAFEGUARDS" />
				</div>
				<div className="col-span-2">
					<DashboardRiskMatrixCard
						likelyhoodFrequencyItems={likelyhood_frequency.item}
						severityMapGrouped={severityMapGrouped}
						loading={risk_map.isFetching}
						riskMapItems={risk_map.item || []}
					/>
				</div>
			</div>
		</div>
	)
}

export default DashboardMain
