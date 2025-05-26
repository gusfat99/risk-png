"use client"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Spinner from "../ui/spinner"
import { cn } from "@/lib/utils"

export interface ActionSaveProps {
	isSubmit?: boolean
	labelSave?: string
	labelCancel?: string
	onSave?: () => void
	onCancel?: () => void
	shownCancel?: boolean
	classNameWrapper?: string
}

const ActionSave: React.FC<ActionSaveProps> = ({
	isSubmit = false,
	labelSave = "Save Data",
	labelCancel = "Cancel",
	onSave,
	onCancel,
	shownCancel = true,
	classNameWrapper = "",
}) => {
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])

	return (
		<div className={cn("flex justify-end gap-4", classNameWrapper)}>
			{shownCancel && (
				<Link href={onCancel ? "" : basePathname}>
					{" "}
					<Button
						onClick={() => onCancel && onCancel}
						variant={"outline"}
						disabled={isSubmit}
					>
						{labelCancel}
					</Button>
				</Link>
			)}
			<Button
				disabled={isSubmit}
				onClick={() => onSave && onSave}
            variant={"secondary"}
            type="submit"
			>
				{isSubmit && <Spinner className="w-4 h-4" />}
				{!isSubmit && <Save />}
				{labelSave}
			</Button>
		</div>
	)
}

export default ActionSave
