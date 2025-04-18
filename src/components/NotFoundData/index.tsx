import { FileWarning, LucideProps } from "lucide-react"
import React from "react"

interface NotFoundDataProps {
	title?: string
	description: string
	icon?: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>
}

const NotFoundData: React.FC<NotFoundDataProps> = ({
	title,
	description,
	icon,
}) => {
	let Icon = FileWarning
	if (icon) {
		Icon = icon
	}
	return (
		<div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
			<Icon className="w-16 h-16 mb-4 text-gray-400" />
			<h2 className="text-lg font-semibold">{title || "No Data Found"}</h2>
			<p className="mt-2 text-sm">{description}</p>
		</div>
	)
}

export default NotFoundData
