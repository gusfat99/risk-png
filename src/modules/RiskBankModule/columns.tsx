import TableRowActions from "@/components/TableRowActions"
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { SAFEGUARDS_PATHNAME_STORAGE } from "@/constants"
import { RiskBankFlat, RiskBankFlatByConsequence } from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"
import { ColumnDef } from "@tanstack/react-table"
import { FileDown, FolderOpen } from "lucide-react"
import Link from "next/link"

export const columnRiskBank = (
	onAction: (actionName: string, id: any) => void,
	isReport = false
): ColumnDef<RiskBankFlat>[] => {
	const columns: ColumnDef<RiskBankFlat>[] = [
		{
			accessorKey: "no",
			header: () => <div className="text-center">No</div>,
			size: 40,
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border text-center"
						rowSpan={row.original.mainRowspan}
					>
						{row.original.no}
					</TableCell>
				) : null,
		},

		{
			accessorKey: "parameter",
			size: 68,
			header: "Parameter",
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border break-words"
						rowSpan={row.original.mainRowspan}
					>
						{row.original.parameter}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "deviation",
			header: "Deviation",
			size: 80,
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border"
						rowSpan={row.original.mainRowspan}
					>
						{row.original.deviation}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "cause",
			header: "Cause",
			size: 110,
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border"
						rowSpan={row.original.mainRowspan}
					>
						{row.original.cause}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "consequence",
			header: "Consequence",
			cell: ({ row }) =>
				row.original.isFirstConsequence ? (
					<TableCell
						className="border"
						rowSpan={row.original.consequenceRowspan}
					>
						{row.original.consequence}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "safeguard",
			header: "Safeguards",
			size: 110,
			cell: ({ row }) => (
				<TableCell className="border">
					{row.original.safeguard || "-"}{" "}
					{/* Menampilkan '-' jika safeguard kosong */}
				</TableCell>
			),
		},
		{
			accessorKey: "document",
			size: 80,
			header: () => (
				<div className="text-center">Safeguards Document</div>
			),
			cell: ({ row }) => (
				<TableCell className="border text-center">
					{row.original.safeguard_link ? (
						<Link
							target="_blank"
							href={`${SAFEGUARDS_PATHNAME_STORAGE}/${row.original.safeguard_link}`}
						>
							<Button size={"sm"} variant={"warning"}>
								<FileDown /> View
							</Button>
						</Link>
					) : (
						"-" // Menampilkan '-' jika tidak ada dokumen
					)}
				</TableCell>
			),
		},
	]

	if (!isReport) {
		columns.splice(1, 0, {
			id: "id",
			accessorFn: (row) => row.id,
			meta: {
				className: "text-center",
			},
			header: () => {
				return <div className="text-center">Action</div>
			},
			size: 40,
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border text-center"
						rowSpan={row.original.mainRowspan}
					>
						<TableRowActions
							onAction={(actionName: string) => {
								onAction(actionName, row.getValue("id"))
							}}
						/>
					</TableCell>
				) : null,
		})
	}

	return columns
}

export const columnRiskBankFlatByConsequences = (
	onAction: (
		actionName: string,
		id: any,
		item?: RiskBankFlatByConsequence
	) => void,
	isReport = false
): ColumnDef<RiskBankFlatByConsequence>[] => {
	const columns: ColumnDef<RiskBankFlatByConsequence>[] = [
		{
			accessorKey: "no",
			header: () => <div className="text-center">No</div>,
			size: 40,
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border text-center"
						rowSpan={row.original.mainRowspan}
					>
						{row.original.no}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "parameter",
			size: 68,
			header: "Parameter",
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border break-words"
						rowSpan={row.original.mainRowspan}
					>
						{row.original.parameter}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "deviation",
			header: "Deviation",
			size: 80,
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border"
						rowSpan={row.original.mainRowspan}
					>
						{row.original.deviation}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "cause",
			header: "Cause",
			size: 110,
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border"
						rowSpan={row.original.mainRowspan}
					>
						{row.original.cause}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "consequence",
			header: "Consequence",
			cell: ({ row }) =>
				row.original.isFirstConsequence ? (
					<TableCell
						className="border"
						rowSpan={row.original.consequenceRowspan}
					>
						{row.original.consequence}
					</TableCell>
				) : null,
		},
		{
			accessorKey: "document",
			size: 80,
			header: () => <div className="text-center">Safeguards</div>,
			cell: ({ row }) => (
				<TableCell className="border text-center">
					<Button
						size={"sm"}
						variant={"warning"}
						onClick={() => {
							onAction(
								"view_safeguards",
								row.original.id,
								row.original
							)
						}}
					>
						<FolderOpen /> View
					</Button>
				</TableCell>
			),
		},
	]

	if (!isReport) {
		columns.splice(1, 0, {
			id: "id",
			accessorFn: (row) => row.id,
			meta: {
				className: "text-center",
			},
			header: () => {
				return <div className="text-center">Action</div>
			},
			size: 40,
			cell: ({ row }) =>
				row.original.isFirstMain ? (
					<TableCell
						className="border text-center"
						rowSpan={row.original.mainRowspan}
					>
						<TableRowActions
							onAction={(actionName: string) => {
								onAction(actionName, row.getValue("id"))
							}}
						/>
					</TableCell>
				) : null,
		})
	}

	return columns
}

export const columnSafeguard = () => {
	const columns = [
		{
			accessorKey: "safeguard",
			header: "Safeguard Name",
		},
		{
			accessorKey: "safeguard_doc",
			header: "Safeguard Doc.",
			cell: (row: Safeguard) => (
				<div className="max-w-[300px] truncate">
					<Link
						target="_blank"
						href={`${SAFEGUARDS_PATHNAME_STORAGE}/${row.file_path}`}
					>
						<Button size={"sm"} variant={"warning"}>
							<FileDown /> Preview
						</Button>
					</Link>
				</div>
			),
		},
	]

	return columns
}
