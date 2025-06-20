// components/GeneralTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface ColumnDef<T> {
  accessorKey: keyof T | string
  header: string
  cell?: (row: T) => React.ReactNode
  className?: string
}

export interface GeneralTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  className?: string
  onRowClick?: (row: T) => void
}

export default function GeneralTable<T>({
  data,
  columns,
  className = "",
  onRowClick,
}: GeneralTableProps<T>) {
  return (
    <div className={cn(`rounded-md border`, className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey as string} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <TableCell key={column.accessorKey as string} className={column.className}>
                    {column.cell
                      ? column.cell(row)
                      : (row[column.accessorKey as keyof T] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}