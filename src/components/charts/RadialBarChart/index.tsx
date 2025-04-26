import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import React from "react"
import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts"

// types/chart.ts
export type ChartDataItem = {
	name: string
	value: number
	fill?: string // Optional custom color
}

export interface PieChartDonutProps {
	data: ChartDataItem[]
	config: ChartConfig
	totalValue: number
}

export const RadialBarChartApp: React.FC<PieChartDonutProps> = ({
	config,
	data,
	totalValue,
}) => {
	const degree = (data[0].value / totalValue) * 360
	return (
		<ChartContainer
			config={config}
			className="mx-auto aspect-square max-h-[250px]"
		>
			<RadialBarChart
				data={[...data]}
				endAngle={parseFloat(degree.toFixed(2))}
				innerRadius={80}
				outerRadius={140}
			>
				<PolarGrid
					gridType="circle"
					radialLines={false}
					stroke="none"
					className="first:fill-muted last:fill-background"
					polarRadius={[86, 74]}
				/>
				<RadialBar dataKey="value" background />
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-4xl font-bold"
										>
											{data[0].value.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											Total Data
										</tspan>
									</text>
								)
							}
						}}
					/>
				</PolarRadiusAxis>
			</RadialBarChart>
		</ChartContainer>
	)
}
