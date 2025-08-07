import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader"
import { Button } from "@/components/ui/button"
import { SAFEGUARDS_PATHNAME_STORAGE } from "@/constants"
import { UseColumnsProps } from "@/hooks/use-columns-severty"
import { SafeguardReport } from "@/types/safeguard"
import { ColumnDef } from "@tanstack/react-table"
import { Download } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

interface ColumnsProps extends UseColumnsProps {}

export const useColumnsReportSafeguardRegister = ({
	onAction,
}: ColumnsProps) => {
	const column: ColumnDef<SafeguardReport>[] = useMemo(() => {
		const cols: ColumnDef<SafeguardReport>[] = [
			{
				header: "No",
				cell: ({ row, table }) => {
					const { pageIndex, pageSize } = table.getState().pagination

					return (pageIndex - 1) * pageSize + row.index + 1
				},
				size: 60,
				enableSorting: false,
			},

			{
				id: "node",
				accessorFn: (row) => row.node,
				
				header: () => {
					return (
						<div >Node</div>
					)
				},
				cell: ({ row }) => (
					<div >{row.original.node}</div>
				),
			},
			{
				id: "safeguard",
				accessorFn: (row) => row.safeguard,
			
				header: () => {
					return (
						<div>Safeguard Name</div>
					)
				},
				cell: ({ row }) => (
					<div>{row.original.safeguard}</div>
				),
			},
			{
				id: "title",
				accessorFn: (row) => row.safeguard_title ?? "",

				header: ({ column }) => {
					return (
						<DataTableColumnHeader
							column={column}
							title="Title of Document Safeguard"
						/>
					)
				},
				size: 180,
				enableSorting: false,
				cell: ({ row }) => row.getValue("title"),
			},
			{
				id: "file_path",
				size: 120,
				meta: {
					className: "text-center",
				},

				accessorFn: (row) => row.file_path,
				header: "Document",
				cell: ({ row }) => (
					<div className="text-center w-full">
						<Link
							download={true}
							target="_blank"
							href={`${SAFEGUARDS_PATHNAME_STORAGE}/${row.getValue(
								"file_path"
							)}`}
						>
							<Button size={"sm"} variant={"link"}>
								<Download /> Download
							</Button>
						</Link>
					</div>
				),
			},
			
			
		]

	return cols
	}, [onAction])

	return { column }
}
