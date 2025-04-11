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
	const columns = Object.entries(data.column)
		.filter(([key]) => key !== "id")
		.map(([key, value]) => ({
			id: key.split("_")[1],
			value,
		}))

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
							Likelyhood Frequency
						</TableCell>
						<TableCell colSpan={5} className="border-2 text-center">
							Frequency
						</TableCell>

						{/* Kolom Likelyhood Frequency */}

						{/* Kolom Deviation */}
					</TableRow>

					<TableRow className="border-2 text-center hover:bg-transparent">
						{columns.map((col) => (
							<TableCell
								key={col.id}
								className="border-2 text-center"
							>
								{col.id}
							</TableCell>
						))}
					</TableRow>
					<TableRow className="border-2 text-center hover:bg-transparent">
						{columns.map((col) => (
							<TableCell
								key={col.id}
								className="border-2 text-center hover:bg-muted  hover:cursor-pointer bg-secondary-200"
							>
								{col.value}
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
					{data.row.map((row, key) => {
						const cols = Object.entries(row)

						return (
							<TableRow
								key={key}
								className="border-2 text-center hover:bg-transparent"
							>
								{cols.map(([key_col, col_val]) => (
									<TableCell
										key={key_col}
										className={cn("border-2 text-center ", {
											"hover:cursor-pointer":
												key_col !== "id",
											"hover:bg-muted": key_col !== "id",
											"bg-secondary-200 ":
												key_col !== "id",
											"font-light":
												key_col !== "id" &&
												!key_col.includes("name"),
											"font-medium":
												key_col === "id" ||
												key_col.includes("name"),
										})}
										onClick={() => {
											onClick &&
												onClick({
													isRow: true,
													field: key_col,
													inputLabel: `Frequency x Explantion (${key_col}x${row.id})`,
													row_id: row.id,
												})
										}}
									>
										{col_val}
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
