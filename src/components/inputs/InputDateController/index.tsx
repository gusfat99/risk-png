import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import React from "react"

interface InputDateControllerProps {
	label: string
	description?: string
	field: any
	onSelect: (value: any) => void
	disabled? : boolean
}

const InputDateContoller: React.FC<InputDateControllerProps> = ({
	label,
	description,
	field,
	onSelect,
	disabled
}) => {
	return (
		<FormItem className="flex flex-col">
			<FormLabel>{label}</FormLabel>
			<Popover>
				<PopoverTrigger asChild>
					<FormControl className="w-full" >
						<Button
							variant={"outline"}
							className={cn(
								"w-full pl-3 text-left font-normal",
								!field.value && "text-muted-foreground"
							)}
							disabled={disabled}
						>
							{field.value ? (
								format(field.value, "P")
							) : (
								<span>Pilih Tanggal</span>
							)}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						className="w-full"
						selected={field.value}
						onSelect={(value) => value && onSelect(format(value, 'P'))}
						disabled={(date) =>
							date > new Date() || date < new Date("1900-01-01")
						}
						
					/>
				</PopoverContent>
			</Popover>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</FormItem>
	)
}

export default InputDateContoller
