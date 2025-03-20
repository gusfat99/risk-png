import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { Column } from "@tanstack/react-table"
import {
   AArrowDown,
   AArrowUp,
   ArrowDown,
   ArrowUp,
   ArrowUpDown,
} from "lucide-react"

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
}

function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>
	}

	return (
		<div className={cn("flex items-start  flex-col", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						{column.getIsSorted() === "desc" ? (
							<AArrowDown size={14} />
						) : // <ArrowDownIcon className="ml-2" />
						column.getIsSorted() === "asc" ? (
							<AArrowUp size={14} />
						) : (
							<ArrowUpDown size={14} />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="justify-center flex flex-col items-center"
				>
					<DropdownMenuItem
						onClick={() => column.toggleSorting(false)}
					>
						<ArrowUp
							size={14}
							className="mr-2  text-muted-foreground/70"
						/>
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => column.toggleSorting(true)}
					>
						<ArrowDown
							size={14}
							className="mr-2  text-muted-foreground/70"
						/>
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default DataTableColumnHeader
