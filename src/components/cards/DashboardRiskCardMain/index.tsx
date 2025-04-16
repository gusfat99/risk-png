import { cn } from "@/lib/utils"
import React from "react"

export interface DashboardRiskCardMainProps {
	title?: string
	content: {
		label: string
		value: any
	}

	icon: React.ReactElement
}

const DashboardRiskCardMain: React.FC<DashboardRiskCardMainProps> = ({
	title,
	content,
	icon,
}) => {
	return (
		<div className="bg-gradient-to-b from-[#7BCCFE] to-[#4A7A98] shadow-md rounded-lg p-4 flex flex-col gap-6 justify-center">
			<div className="flex items-center justify-between">
				<div
					className={cn([
						'bg-white/80',
						"p-2 rounded-lg",
					])}
				>
					{icon}
				</div>
				{/* <div className="bg-secondary-100 rounded-lg p-2 mr-4 text-secondary">
         <SquareKanbanIcon />
      </div> */}
				<div>
					<p className="text-white">{title}</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="mt-4">
					<p className="text-white font-light">{content.label}</p>
					<p className="text-2xl font-semibold text-white">
						{content.value}
					</p>
				</div>
			</div>
		</div>
	)
}

export default DashboardRiskCardMain
