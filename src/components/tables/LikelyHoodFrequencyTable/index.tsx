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
} from "@/types/settingMatrix"
import React from "react"

interface LikelyhoodFrequencyTableProps {
	data: LikelyhoodFrequency
	onClick?(data: MatrixSelectedRowCol): void
}

const LikelyhoodFrequencyTable: React.FC<LikelyhoodFrequencyTableProps> = ({
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
							Likelihood Frequency
						</TableCell>
						<TableCell colSpan={5} className="border-2 text-center">
							Frequency
						</TableCell>
						
					</TableRow>

					<TableRow className="border-2 text-center hover:bg-transparent">
						{data.column.map((col) => (
							<TableCell
								key={col.id}
								className="border-2 text-center"
							>
								{col.id}
							</TableCell>
						))}
					</TableRow>
					<TableRow className="border-2 text-center hover:bg-transparent">
						{data.column.map((col) => (
							<TableCell
								key={col.id}
								className="border-2 text-center hover:bg-muted  hover:cursor-pointer bg-secondary-200"
								onClick={() => {
									onClick &&
										onClick({
											field: "frequency_name",
											inputLabel: `Frequency`,
											col_id: col.id,
											value: col.frequency_name,
										})
								}}
							>
								{col.frequency_name}
							</TableCell>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="border-2 hover:bg-transparent">
						{/* Kolom Frequency Level */}
						<TableCell
							rowSpan={data.row.length + 1}
							className="border-2 text-center [writing-mode:vertical-rl]"
						>
							Explanation
						</TableCell>
					</TableRow>
					{data.row.map((row, key) => {
						return (
							<TableRow
								key={key}
								className="border-2 text-center hover:bg-transparent"
							>
								<TableCell
									className={cn("border-2 text-center")}
								>
									{key+1}
								</TableCell>
								<TableCell
									className={cn(
										"border-2 text-center  hover:bg-muted  hover:cursor-pointer bg-secondary-200"
									)}
									onClick={() => {
										onClick &&
											onClick({
												field: "explanation_name",
												inputLabel: `Explanation`,
												row_id: row.id,
												value:
													row.explanation_name || "",
											})
									}}
								>
									{row.explanation_name}
								</TableCell>
								{row.cells.map((cell, colIdx) => (
									<TableCell
										key={cell.column_id + colIdx + key}
										className={cn(
											"border-2 text-center hover:bg-muted  hover:cursor-pointer bg-secondary-200"
										)}
										onClick={() => {
											onClick &&
												onClick({
													field: "matrix",
													inputLabel: `Frequency x Explantion (${cell.column_id}x${key+1})`,
													row_id: row.id,
													col_id: cell.column_id,
													value: cell.value || "",
												})
										}}
									>
										{cell.value}
									</TableCell>
								))}
								
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

export default LikelyhoodFrequencyTable
