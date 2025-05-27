"use client"
import { PaginationType } from "@/types/common"
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	OnChangeFn,
	PaginationState,
	Row,
	SortingState,
	TableOptions,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table"
import React, { useState } from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table"
import { DataTablePagination } from "./DataTablePagination"
import { cn } from "@/lib/utils"
import Spinner from "../ui/spinner"

interface AppDataTableProps<T> {
	tableClassName?: string
	enableOnHoverIndicator?: boolean
	columns: ColumnDef<T>[]
	data: T[]
	loading: boolean
	manualPagination?: boolean
	rowCount?: number
	onPaginationChange?: OnChangeFn<PaginationState>
	pagination?: PaginationType
	tbodyWithCell?: boolean
	config?: {
		getRowKey: (row: T, index: number) => string
	}
}

export interface ColumnMetaDef {
	className: string | undefined
}

const DataTable = <T,>({
	enableOnHoverIndicator = true,
	tableClassName,
	columns,
	data,
	loading,
	rowCount,
	manualPagination = false,
	onPaginationChange,
	pagination,
	tbodyWithCell = true,
	config = {
		getRowKey: (row, index) => index.toString(),
	},
}: AppDataTableProps<T>) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	)
	const [rowSelection, setRowSelection] = useState({})

	// Enhanced row key handling
	const getRowKey = (row: Row<T>) => {
		return config.getRowKey(row.original, row.index)
	}

	const handlePaginationChange: OnChangeFn<PaginationState> = (
		updaterOrValue
	) => {
		if (typeof updaterOrValue === "function") {
			// If updaterOrValue is a function (updater function)
			onPaginationChange?.((oldPagination) => {
				const newPagination = (
					updaterOrValue as (old: PaginationState) => PaginationState
				)(oldPagination)

				if (newPagination.pageIndex === 0) {
					return { ...newPagination, pageIndex: 1 }
				}
				return newPagination
			})
		} else {
			// If updaterOrValue is a direct PaginationState object
			const newPagination = updaterOrValue
			if (newPagination.pageIndex === 0) {
				onPaginationChange?.({ ...newPagination, pageIndex: 1 })
			} else {
				onPaginationChange?.(newPagination)
			}
		}
	}

	const options: TableOptions<T> = {
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		autoResetAll: false,
		autoResetPageIndex: true,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	}
	if (manualPagination) {
		options.manualPagination = manualPagination
	}
	if (onPaginationChange) {
		options.onPaginationChange = handlePaginationChange
	}
	if (rowCount) {
		options.rowCount = rowCount
	}
	if (pagination) {
		options.state = {
			...options.state,
			pagination,
		}
	}

	const table = useReactTable(options)

	return (
		<div className="w-full overflow-auto">
			<div className="relative rounded-md border overflow-hidden">
				<div className="md:max-h-[580px] max-h-[390px] overflow-auto max-w-[calc(100vw-62px)] md:max-w-[calc(100vw-386px)] ">
					<Table
						className={cn(
							"table-fixed caption-bottom text-sm w-full border-collapse",
							tableClassName
						)}
					>
						<TableHeader
							style={{
								position: "sticky",
								top: 0,
								zIndex: 10,
							}}
						>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									className={cn({
										"hover:bg-transparent":
											!enableOnHoverIndicator,
									})}
									key={headerGroup.id}
								>
									{headerGroup.headers.map((header) => {
										const meta = header.column.columnDef
											.meta as ColumnMetaDef

										return (
											<TableHead
												key={header.id}
												className={cn(
													"text-wrap font-semibold overflow-hidden text-ellipsis whitespace-nowrap sticky top-0 z-10 bg-gray-100 [&>tr]:first:shadow-sm",
													meta?.className
												)}
												style={{
													width: header.getSize(), // <-- Ini penting!!
												}}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column
																.columnDef
																.header,
															header.getContext()
													  )}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow
									className={cn("md:h-[520px] h-[180px]", {
										"hover:bg-transparent":
											!enableOnHoverIndicator,
									})}
								>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center relative"
									>
										{/* <AppLoader /> */}
										<Spinner className="w-4 h-4" />
									</TableCell>
								</TableRow>
							) : (
								<>
									{(table?.getRowModel()?.rows || [])
										.length ? (
										table
											?.getRowModel()
											?.rows.map((row) => (
												<TableRow
													key={getRowKey(row)}
													data-state={
														row.getIsSelected() &&
														"selected"
													}
													className={cn({
														"hover:bg-transparent":
															!enableOnHoverIndicator,
													})}
												>
													{row
														.getVisibleCells()
														.map((cell) => (
															<React.Fragment
																key={`${getRowKey(
																	row
																)}_${
																	cell.column
																		.id
																}`}
															>
																{tbodyWithCell ? (
																	<TableCell>
																		{flexRender(
																			cell
																				.column
																				.columnDef
																				.cell,
																			cell.getContext()
																		)}
																	</TableCell>
																) : (
																	flexRender(
																		cell
																			.column
																			.columnDef
																			.cell,
																		cell.getContext()
																	)
																)}
															</React.Fragment>
														))}
												</TableRow>
											))
									) : (
										<TableRow>
											<TableCell
												colSpan={columns.length}
												className="h-24 text-center"
											>
												No results.
											</TableCell>
										</TableRow>
									)}
								</>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
			<DataTablePagination
				table={table}
				isServerSide={manualPagination}
			/>
		</div>
	)
}

export default DataTable
