"use client"
import DashboardChartDonutCard from "@/components/cards/DashboardChartDonutCard"
import DashboardRiskCard, {
	DashboardRiskCardProps,
} from "@/components/cards/DashboardRiskCard"
import { DashbaordRiskMatrixCard } from "@/components/cards/DashboardRiskMatrixCard"
import PieChartDonut from "@/components/charts/PieChartDonutExample"
import { cn } from "@/lib/utils"
import { CopyCheck, LineChart, SquareKanbanIcon } from "lucide-react"
import React from "react"

const DashboardMain = () => {
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
					<DashbaordRiskMatrixCard />
				</div>
			</div>
		</div>
	)
}

export default DashboardMain
