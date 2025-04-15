import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
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
}

const RiskMapTable: React.FC<RiskMapTableProps> = ({
	columns,
	rowsMain,
	data,
	onClick,
}) => {
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
						{columns.map(([_, col]) => (
							<TableCell
								key={col?.[0].column_value}
								className="border-2 text-center"
							>
								{col?.[0].column_value}
							</TableCell>
						))}
					</TableRow>
					<TableRow className="border-2 text-center hover:bg-transparent">
						{columns.map(([_, col]) => (
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
							Frequency
						</TableCell>
					</TableRow>
					{rowsMain.column.map((frequency, rowKey) => {
						return (
							<TableRow
								key={rowKey}
								className="border-2 text-center hover:bg-transparent"
							>
								<TableCell
									className={cn("border-2 text-center")}
								>
									{rowKey + 1}
								</TableCell>
								<TableCell
									className={cn(
										"border-2 text-center  hover:bg-muted",
										
									)}
								>
									{frequency.frequency_name}
								</TableCell>
								{columns.map(([_, col], keyDeviation) => {
									const matchingCell = data.find(
										(x) =>
											x.frequency?.toString() ===
												frequency.id?.toString() &&
											x.deviation?.toString() ===
												col[0].column_value?.toString()
									)

									return (
										<TableCell
											key={
												col?.[0].column_value +
												rowKey +
												keyDeviation
											}
											className={cn(
												`border-2 text-center hover:bg-muted`,
												{
													"hover:cursor-pointer": onClick
														? true
														: false,
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
														inputLabel: `Deviation x Frequency (${
															keyDeviation + 1
														}x${rowKey + 1})`,
														row_id: rowKey + 1,
														col_id: col[0]
															.column_value,
														value:
															matchingCell?.value ||
															"",
														color:
															matchingCell?.color ||
															"",
													})
											}}
										>
											{matchingCell?.value || "-"}
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

export default RiskMapTable
