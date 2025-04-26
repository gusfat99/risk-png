import { ChartDataItem, PieChartDonut } from "@/components/charts/PieChartDonut"
import { RadialBarChartApp } from "@/components/charts/RadialBarChart"
import { ChartConfig } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import React from "react"

interface IProps {
	title: string
	data: ChartDataItem[]
	totalValue: number
}

const config: ChartConfig = {
	value: {
		label: "Risk",
	},
}

const DashboardChartDonutCardSkeleton = () => {
	return (
		<div className="shadow-md rounded-lg flex flex-col p-4">
			<Skeleton className="w-full rounded-md h-10" />
			<div className="flex flex-row justify-evenly w-full">
				<Skeleton className="h-4 w-full mt-4 mb-8" />
			</div>
			<div className="flex-1 flex justify-center items-center">
				<Skeleton className="h-[172px] w-[172px] rounded-full" />
			</div>
		</div>
	)
}

interface DashboardChartDonutCardType extends React.FC<IProps> {
	Skeleton: typeof DashboardChartDonutCardSkeleton
}

const DashboardChartDonutCard: DashboardChartDonutCardType = ({
	title,
	data,
	totalValue,
}) => {
	return (
		<div className="shadow-md rounded-lg flex flex-col p-4">
			<div className="bg-primary-100 rounded-md p-2 text-center text-primary font-semibold">
				{title}
			</div>
			<div className="flex flex-row justify-evenly w-full flex-wrap">
				{data.map((item, key) => {
					return (
						<div
							key={key}
							className="flex flex-row gap-2 items-center p-2 rounded-md mt-2"
						>
							<div
								className={cn("rounded-full w-2 h-2")}
								style={{
									backgroundColor: item.fill,
								}}
							/>
							<p className="text-sm text-gray-400 font-light">
								{item.name}
							</p>
						</div>
					)
				})}
			</div>
			<div className="flex-1">
				<RadialBarChartApp
					data={data}
					config={config}
					totalValue={totalValue}
				/>
			</div>
		</div>
	)
}

DashboardChartDonutCard.Skeleton = DashboardChartDonutCardSkeleton

export default DashboardChartDonutCard
