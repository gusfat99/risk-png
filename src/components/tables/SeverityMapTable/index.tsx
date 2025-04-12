import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { cn, groupBy } from "@/lib/utils"
import {
   MatrixSelectedRowCol,
   SeverityMap
} from "@/types/settingMatrix"
import React from "react"

interface SeverityMapTableProps {
	data: SeverityMap[]
	onClick?(data: MatrixSelectedRowCol): void
}

const SeverityMapTable: React.FC<SeverityMapTableProps> = ({
	data,
	onClick,
}) => {
	// Group data by row_value (1-6)

	const columns = Object.entries(groupBy(data, "column_deviation"))
	const rows = Object.entries(groupBy(data, "row_severity"))

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
						{columns.map(([_, valueCol]) => (
							<TableCell
								key={valueCol[0].column_value}
								className="border-2 text-center"
							>
								{valueCol[0].column_value}
							</TableCell>
						))}
					</TableRow>
					<TableRow className="border-2 text-center hover:bg-transparent">
						{columns.map(([colName, valueCol]) => (
							<TableCell
								key={valueCol[0].column_value}
								className="border-2 text-center hover:bg-muted  hover:cursor-pointer bg-secondary-200"
								onClick={() => {
									onClick &&
										onClick({
											field: "deviation",
											inputLabel: `Devation`,
											col_id: valueCol[0].column_value,
											value: "",
										})
								}}
							>
								{colName}
							</TableCell>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="border-2 hover:bg-transparent">
						{/* Kolom Frequency Level */}
						<TableCell
							rowSpan={rows.length + 1}
							className="border-2 text-center [writing-mode:vertical-rl]"
						>
							Severity
						</TableCell>
					</TableRow>
					{rows.map(([severityName, severityValue]) => (
						<TableRow
							key={severityValue[0].row_value}
							className="border-2 hover:bg-transparent"
						>
							<TableCell className={cn("border-2 text-center")}>
								{severityValue[0].row_value}
							</TableCell>
							{/* Kolom Frequency Level */}
							<TableCell
								className={cn(
									"border-2 text-center  hover:bg-muted  hover:cursor-pointer bg-secondary-200"
								)}
								onClick={() => {
									onClick &&
										onClick({
											field: "severity",
											inputLabel: `Severity`,
											row_id: severityValue[0].row_value,
											value: severityName,
										})
								}}
							>
								{severityName}
							</TableCell>
							{severityValue.map((severity) => (
								<TableCell
									key={
										severityValue[0].row_value +
										severity.severity_map_value
									}
									className={cn(
										"border-2 text-center hover:bg-muted  hover:cursor-pointer bg-secondary-200"
									)}
									onClick={() => {
										onClick &&
											onClick({
												field: "matrix",
												inputLabel: `Deviation x Severity (${severity.column_value}x${severity.row_value})`,
												row_id: severity.row_value,
												col_id: severity.column_value,
												value:
													severity.severity_map_value ||
													"",
											})
									}}
								>
									{severity.severity_map_value || ""}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default SeverityMapTable
