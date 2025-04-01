import { ChartDataItem, PieChartDonut } from "@/components/charts/PieChartDonut"
import {
   ChartConfig
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import React from "react"

interface IProps {
	title: string
}

const browserData: ChartDataItem[] = [
	{
		name: "Amount of Risk Above Appetite",
		value: 20,
		fill: "hsl(var(--secondary-400))",
	},
	
	{ name: "Total Data", value: 80, fill: "#FFCC91" },
]

const config: ChartConfig = {
	value: {
		label: "Risk",
	},
}

const DashboardChartDonutCard: React.FC<IProps> = ({ title }) => {
	return (
		<div className="shadow-md rounded-lg flex flex-col p-4">
			<div className="bg-primary-100 rounded-md p-2 text-center text-primary font-semibold">
				{title}
			</div>
			<div className="flex flex-row justify-evenly w-full flex-wrap">
				{browserData.map((item, key) => {
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
				<PieChartDonut data={browserData} config={config} />
			</div>
		</div>
	)
}

export default DashboardChartDonutCard
