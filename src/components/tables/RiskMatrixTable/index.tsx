import React from "react"
import {
	Table,
	TableCell,
	TableRow,
	TableHeader,
	TableBody,
} from "@/components/ui/table" // Pastikan path ke komponen Table sesuai dengan proyek Anda

// Interface untuk nilai deviasi
interface Deviation {
	value: number
	color: string // Warna Tailwind CSS
}

// Interface untuk baris data
interface TableRow {
	frequency: number
	riskLevel: string
	insignificant: Deviation
	minor: Deviation
	moderate: Deviation
	significant: Deviation
	verySignificant: Deviation
}

// Interface untuk kolom tabel
interface TableColumn {
	header: string
	key: string
	subHeaders?: string[] // Untuk kolom dengan sub-header
}

// Data tabel
const data: TableRow[] = [
	{
		frequency: 5,
		riskLevel: "Almost Certain to Happens (5)",
		insignificant: { value: 9, color: "bg-green-500" },
		minor: { value: 1, color: "bg-yellow-500" },
		moderate: { value: 4, color: "bg-orange-500" },
		significant: { value: 2, color: "bg-red-500" },
		verySignificant: { value: 2, color: "bg-red-700" },
	},
	{
		frequency: 4,
		riskLevel: "Often Happens (4)",
		insignificant: { value: 16, color: "bg-blue-500" },
		minor: { value: 42, color: "bg-yellow-500" },
		moderate: { value: 46, color: "bg-orange-500" },
		significant: { value: 18, color: "bg-red-500" },
		verySignificant: { value: 5, color: "bg-red-700" },
	},
	{
		frequency: 3,
		riskLevel: "Sometimes Happens (3)",
		insignificant: { value: 26, color: "bg-blue-500" },
		minor: { value: 234, color: "bg-yellow-500" },
		moderate: { value: 442, color: "bg-orange-500" },
		significant: { value: 143, color: "bg-red-500" },
		verySignificant: { value: 8, color: "bg-red-700" },
	},
	{
		frequency: 2,
		riskLevel: "Rarely Happens (2)",
		insignificant: { value: 100, color: "bg-blue-500" },
		minor: { value: 692, color: "bg-green-500" },
		moderate: { value: 1165, color: "bg-yellow-500" },
		significant: { value: 649, color: "bg-red-500" },
		verySignificant: { value: 24, color: "bg-red-700" },
	},
	{
		frequency: 1,
		riskLevel: "Almost Didn't Happen (1)",
		insignificant: { value: 437, color: "bg-blue-500" },
		minor: { value: 655, color: "bg-green-500" },
		moderate: { value: 981, color: "bg-orange-500" },
		significant: { value: 1025, color: "bg-red-500" },
		verySignificant: { value: 76, color: "bg-red-700" },
	},
]

// Kolom tabel
const columns: TableColumn[] = [
	{ header: "Frequency Level", key: "frequency" },
	{ header: "Risk MAP", key: "riskLevel" },
	{
		header: "Deviation",
		key: "deviation",
		subHeaders: [
			"Insignificant (1)",
			"Minor (2)",
			"Moderate (3)",
			"Significant (4)",
			"Very Significant (5)",
		],
	},
]

const RiskMatrixTable: React.FC = () => {
	return (
		<div className="w-full overflow-x-auto">
			<Table>
				{/* Header */}
				<TableHeader>
					<TableRow>
						{/* Kolom Frequency Level */}
						<TableCell rowSpan={3} colSpan={2} className="border-2 text-center">
							Risk MAP
						</TableCell>
						<TableCell colSpan={5} className="border-2 text-center">
							Deviation
						</TableCell>

						{/* Kolom Risk MAP */}

						{/* Kolom Deviation */}
					</TableRow>

					{/* Sub-header untuk Risk MAP */}
					<TableRow className="border-2 text-center">
						<TableCell className="border-2 text-center">
							Insignificant (1)
						</TableCell>
						<TableCell className="border-2 text-center">Minor (2)</TableCell>
						<TableCell className="border-2 text-center">Moderate (3)</TableCell>
						<TableCell className="border-2 text-center">
							Significant (4)
						</TableCell>
						<TableCell className="border-2 text-center">
							Very Significant (5)
						</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody className="border-2" >
					<TableRow className="border-2">
						{/* Kolom Frequency Level */}
						<TableCell rowSpan={6} className="border-2 text-center">
							Frequency Level
						</TableCell>
					</TableRow>
					{data.map((row, index) => (
						<TableRow key={index} className="boder-2">
							{/* Kolom Risk MAP */}
							<TableCell>{row.riskLevel}</TableCell>

							{/* Kolom Insignificant */}
							<TableCell
								className={`${row.insignificant.color} text-white text-center border-2`}
							>
								{row.insignificant.value}
							</TableCell>

							{/* Kolom Minor */}
							<TableCell
								className={`${row.minor.color} text-white text-center border-2`}
							>
								{row.minor.value}
							</TableCell>

							{/* Kolom Moderate */}
							<TableCell
								className={`${row.moderate.color} text-white text-center border-2`}
							>
								{row.moderate.value}
							</TableCell>

							{/* Kolom Significant */}
							<TableCell
								className={`${row.significant.color} text-white text-center border-2`}
							>
								{row.significant.value}
							</TableCell>

							{/* Kolom Very Significant */}
							<TableCell
								className={`${row.verySignificant.color} text-white text-center border-2`}
							>
								{row.verySignificant.value}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default RiskMatrixTable
