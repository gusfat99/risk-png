import React from "react"

export interface DashboardRiskCardProps {
	title?: string
	content: Array<{
		label: string
		value: any
	}>

	icon: React.ReactElement
}

const DashboardRiskCard: React.FC<DashboardRiskCardProps> = ({
	title,
	content,
	icon,
}) => {
	const Icon = icon
	return (
		<div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
			<div className="flex items-center justify-between">
				{Icon}
				{/* <div className="bg-secondary-100 rounded-lg p-2 mr-4 text-secondary">
					<SquareKanbanIcon />
				</div> */}
				<div>
					<p className="">{title}</p>
				</div>
			</div>
			<div className="flex justify-between">
				{content.map((item, index) => (
					<div className="mt-4" key={index}>
						<p className="text-gray-500">{item.label}</p>
						<p className="text-xl font-semibold ">{item.value}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default DashboardRiskCard
