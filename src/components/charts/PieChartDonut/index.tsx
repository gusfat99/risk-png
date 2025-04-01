import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"
import { Pie, PieChart } from "recharts"

// types/chart.ts
export type ChartDataItem = {
	name: string
	value: number
	fill?: string // Optional custom color
}

export interface PieChartDonutProps {
	data: ChartDataItem[]
	config: ChartConfig
}

export const PieChartDonut: React.FC<PieChartDonutProps> = ({
	config,
	data,
}) => {
	return (
		<ChartContainer
			config={config}
			className="mx-auto aspect-square max-h-[250px]"
		>
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					enableBackground={1}
					innerRadius={60} // Radius dalam untuk efek donut
				/>
			</PieChart>
		</ChartContainer>
	)
}
