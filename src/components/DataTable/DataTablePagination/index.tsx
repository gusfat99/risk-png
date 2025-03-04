import { Table } from "@tanstack/react-table"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"

interface DataTablePaginationProps<TData> {
	table: Table<TData>
	perpageList?: Array<number>
	isServerSide?: boolean
}

export function DataTablePagination<TData>({
	table,
	perpageList = [10, 20, 30, 40, 50],
	isServerSide,
}: DataTablePaginationProps<TData>) {
	const currentPage = table.getState().pagination.pageIndex
	const totalPage = table.getPageCount()
	let canPrev = false
	let canNext = false

	if (isServerSide) {
		canPrev = !(currentPage <= 1)
		canNext = !(currentPage >= totalPage)
	} else {
		canPrev = table.getCanPreviousPage()
		canNext = table.getCanNextPage()
	}
	return (
		<div className="flex items-center justify-between px-2 mt-2">
			<div className="flex-1 text-sm text-muted-foreground">
				Total {table.getRowCount()} data
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue
								placeholder={
									table.getState().pagination.pageSize
								}
							/>
						</SelectTrigger>
						<SelectContent side="top">
							{perpageList.map((pageSize) => (
								<SelectItem
									key={pageSize}
									value={`${pageSize}`}
								>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex} of{" "}
					{table.getPageCount() - (isServerSide ? 0 : 1)}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(isServerSide ? 1 : 0)}
						disabled={
							table.getState().pagination.pageIndex ===
							(isServerSide ? 1 : 0)
						}
					>
						<span className="sr-only">Go to first page</span>
						{/* <DoubleArrowLeftIcon size={16} /> */}
						<ChevronsLeft size={6} />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!canPrev}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft size={16} />
						{/* <AppIcon2/> */}
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!canNext}
					>
						<span className="sr-only">Go to next page</span>

						<ChevronRight size={16} />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() =>
							table.setPageIndex(
								table.getPageCount() - (isServerSide ? 0 : 1)
							)
						}
						disabled={
							table.getState().pagination.pageIndex ===
							table.getPageCount() - (isServerSide ? 0 : 1)
						}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight size={16} />
					</Button>
				</div>
			</div>
		</div>
	)
}
