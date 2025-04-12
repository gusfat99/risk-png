import TableRowActions from "@/components/TableRowActions"
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { API_URL } from "@/constants"
import { RiskBankFlat } from "@/types/riskDataBank"
import { ColumnDef } from "@tanstack/react-table"
import { FileDown } from "lucide-react"
import Link from "next/link"

export const columnRiskBank = (
	onAction: (actionName: string, id: any) => void
): ColumnDef<RiskBankFlat>[] => {
	const columns: ColumnDef<RiskBankFlat>[] = [
		 {
			  accessorKey: "no",
			  header: "No",
			  cell: ({ row }) =>
					row.original.isFirstMain ? (
						 <TableCell
							  className="border"
							  rowSpan={row.original.mainRowspan}
						 >
							  {row.original.no}
						 </TableCell>
					) : null,
		 },
		 {
			  id: "id",
			  accessorFn: (row) => row.id,
			  header: () => {
					return <div className="flex justify-start">Action</div>
			  },
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
		 },
		 {
			  accessorKey: "parameter",
			  header: "Parameter",
			  cell: ({ row }) =>
					row.original.isFirstMain ? (
						 <TableCell
							  className="border"
							  rowSpan={row.original.mainRowspan}
						 >
							  {row.original.parameter}
						 </TableCell>
					) : null,
		 },
		 {
			  accessorKey: "deviation",
			  header: "Deviation",
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
			  cell: ({ row }) => (
					<TableCell className="border">
						 {row.original.safeguard || "-"} {/* Menampilkan '-' jika safeguard kosong */}
					</TableCell>
			  ),
		 },
		 {
			  accessorKey: "document",
			  header: "Safeguards Document",
			  cell: ({ row }) => (
					<TableCell className="border text-center">
						 {row.original.safeguard_link ? (
							  <Link
									target="_blank"
									href={`${API_URL}/storage/safeguards/${row.original.safeguard_link}`}
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
	];

	return columns;
};