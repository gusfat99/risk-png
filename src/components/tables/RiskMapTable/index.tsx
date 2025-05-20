import { Skeleton } from "@/components/ui/skeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { HeatMap } from "@/types/dashboard"
import {
	LikelyhoodFrequency,
	MatrixSelectedRowCol,
	RiskMap,
	SeverityMap,
} from "@/types/settingMatrix"
import React from "react"

interface RiskMapTableProps {
	data: RiskMap[]
	columns: [title: string, SeverityMap[]][]
	rowsMain: LikelyhoodFrequency
	onClick?(data: MatrixSelectedRowCol): void
	forDashboard?: boolean
	heatmap?: HeatMap[]
}

const RiskMapTableSkeleton = () => {
	return (
		<div className="w-full overflow-x-auto">
			<Table>
				{/* Header */}
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						{/* Kolom Frequency Level */}
						<TableCell
							rowSpan={3}
							colSpan={3}
							className="border-2 text-center"
						>
							Risk MAP
						</TableCell>
						<TableCell colSpan={5} className="border-2 text-center">
							Deviation
						</TableCell>
					</TableRow>

					<TableRow className="border-2 text-center hover:bg-transparent">
						{Array.from({ length: 5 }).map((_, col) => (
							<TableCell
								key={col}
								className="border-2 text-center"
							>
								{col}
							</TableCell>
						))}
					</TableRow>
					<TableRow className="border-2 text-center hover:bg-transparent">
						{Array.from({ length: 5 }).map((_, col) => (
							<TableCell
								key={col}
								className="border-2 text-center"
							>
								<Skeleton className="h-4 w-20 m-auto" />
							</TableCell>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="border-2 hover:bg-transparent">
						{/* Kolom Frequency Level */}
						<TableCell
							rowSpan={6}
							className="border-2 text-center [writing-mode:vertical-rl]"
						>
							Frequency Level
						</TableCell>
					</TableRow>
					{Array.from({ length: 5 }).map((_, row) => (
						<TableRow
							key={row}
							className="border-2 text-center hover:bg-transparent"
						>
							<TableCell className={cn("border-2 text-center")}>
								{row + 1}
							</TableCell>
							<TableCell className={cn("border-2 text-center ")}>
								<Skeleton className="h-10 w-32 m-auto" />
							</TableCell>
							{Array.from({ length: 5 }).map((_, col) => (
								<TableCell
									key={col + row}
									className={cn(
										`border-2 text-center relative`
									)}
								>
									<Skeleton className="h-10 w-20 m-auto" />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

const RiskMapTable: React.FC<RiskMapTableProps> & {
	Skeleton: typeof RiskMapTableSkeleton
} = ({ columns, rowsMain, data, forDashboard, heatmap = [], onClick }) => {
	return (
		<div className="w-full overflow-x-auto">
			<Table>
				{/* Header */}
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						{/* Kolom Frequency Level */}
						<TableCell
							rowSpan={3}
							colSpan={3}
							className="border-2 text-center"
						>
							Risk MAP
						</TableCell>
						<TableCell colSpan={5} className="border-2 text-center">
							Deviation
						</TableCell>
					</TableRow>

					<TableRow className="border-2 text-center hover:bg-transparent">
						{columns
							// .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
							.map(([_, col]) => (
								<TableCell
									key={col?.[0].column_value}
									className="border-2 text-center"
								>
									{col?.[0].column_value}
								</TableCell>
							))}
					</TableRow>
					<TableRow className="border-2 text-center hover:bg-transparent">
						{columns
							// .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
							.map(([_, col]) => (
								<TableCell
									key={col?.[0].column_value}
									className="border-2 text-center hover:bg-muted"
								>
									{col?.[0].column_deviation}
								</TableCell>
							))}
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="border-2 hover:bg-transparent">
						{/* Kolom Frequency Level */}
						<TableCell
							rowSpan={6}
							className="border-2 text-center [writing-mode:vertical-rl]"
						>
							Frequency Level
						</TableCell>
					</TableRow>
					{rowsMain.column
						.sort((a, b) => b.id - a.id)
						.map((frequency, rowKey) => {
							return (
								<TableRow
									key={rowKey}
									className="border-2 text-center hover:bg-transparent"
								>
									<TableCell
										className={cn("border-2 text-center")}
									>
										{frequency.id}
									</TableCell>
									<TableCell
										className={cn(
											"border-2 text-center  hover:bg-muted"
										)}
									>
										{frequency.frequency_name}
									</TableCell>
									{columns
										// .sort(
										// 	(a, b) =>
										// 		parseInt(b[0]) - parseInt(a[0])
										// )
										.map(([colId, col], keyDeviation) => {
										
											const matchingCell = data.find(
												(x) =>
													x.frequency?.toString() ===
														frequency.id?.toString() &&
													x.deviation?.toString() ===
														col[0].column_value?.toString()
											)
											const matchingHeatMap =
												heatmap.find(
													(x) =>
														matchingCell?.value?.toString() ===
														x.risk_ranking?.toString()
												)

											return (
												<TableCell
													key={keyDeviation + rowKey}
													className={cn(
														`border-2 text-center hover:bg-muted`,
														{
															"hover:cursor-pointer":
																onClick
																	? true
																	: false,
															"p-2": forDashboard,
															"p-4": !forDashboard,
															relative:
																forDashboard,
															// 'flex flex-col' : forDashboard
														}
													)}
													style={{
														backgroundColor:
															matchingCell?.color,
													}}
													onClick={() => {
														onClick &&
															onClick({
																field: "matrix",
																inputLabel: `Deviation x Frequency (${colId}x${frequency.id})`,
																row_id: frequency.id,
																col_id: colId,
																value:
																	matchingCell?.value ||
																	"",
																color:
																	matchingCell?.color ||
																	"",
															})
													}}
												>
													{forDashboard && (
														<>
															<div className="text-2xl absolute inset-0 left-2 top-2 flex   font-semibold">
																{matchingHeatMap?.total ||
																	0}
															</div>
															<div className="absolute bottom-1 right-4 text-xs font-semibold">
																{
																	matchingCell?.value
																}
															</div>
														</>
													)}
													{!forDashboard &&
														matchingCell?.value}
												</TableCell>
											)
										})}
								</TableRow>
							)
						})}
				</TableBody>
			</Table>
		</div>
	)
}

RiskMapTable.Skeleton = RiskMapTableSkeleton

export default RiskMapTable
