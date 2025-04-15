"use client"
import DashboardChartDonutCard from "@/components/cards/DashboardChartDonutCard"
import DashboardRiskCard from "@/components/cards/DashboardRiskCard"
import DashboardRiskMatrixCard from "@/components/cards/DashboardRiskMatrixCard"
import { cn, groupBy } from "@/lib/utils"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { CopyCheck, LineChart, SquareKanbanIcon } from "lucide-react"
import { useEffect } from "react"

const DashboardMain = () => {
	const {
		severity_map,
		likelyhood_frequency,
		risk_map,
		actions: { fetchRiskMap },
	} = useSettingMatrixStore()

	const itemsCounting = [
		{
			label: "Risk Data Bank",
			icon: SquareKanbanIcon,
			iconBgColor: "bg-secondary-100",
			iconTextColor: "text-secondary",
			content: [
				{
					label: "Total Data",
					value: 1401,
				},
			],
		},
		{
			label: "Risk Data Bank",
			icon: LineChart,
			iconBgColor: "bg-primary-100",
			iconTextColor: "text-primary",
			content: [
				{
					label: "Amount of Risk Above Appetite",
					value: 1401,
				},
				{
					label: "Total Data",
					value: 1401,
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
					value: 1401,
				},
				{
					label: "Safeguards Total",
					value: 1401,
				},
			],
		},
	]

	const severityMapGrouped = groupBy(severity_map.item || [], "column_value")

	useEffect(() => {
		fetchRiskMap()
	}, [fetchRiskMap])

	return (
		<div className="max-w-full mt-4 space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{itemsCounting.map((item, i) => (
					<DashboardRiskCard
						key={i}
						title={item.label}
						content={item.content}
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
