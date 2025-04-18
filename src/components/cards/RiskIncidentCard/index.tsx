import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { getPropByPath } from "@/lib/utils"
import { Cause, Deviations } from "@/types/riskDataBank"
import { SquareRadical } from "lucide-react"
import React from "react"

type fileds = {
	deviations: Deviations
	incident_location: string
	incident_name: string
	incident_trigger: string
	causes: Cause
}

interface IProps {
	data: fileds
}

const fileds = [
	{
		title: "Deviation",
		field: "deviations.name",
	},
	{
		title: "Cause",
		field: "causes.cause",
	},
	{
		title: "Incident Name",
		field: "incident_name",
	},
	{
		title: "Incident Location",
		field: "incident_location",
	},
	{
		title: "Incident Trigger",
		field: "incident_trigger",
	},
]

const HeadTitle = () => (
	<div className="space-y-2">
		<div className="flex flex-row gap-2">
			<SquareRadical className="text-secondary" />
			<h4 className="text-secondary">Risk Incident Data</h4>
		</div>
		<Separator className="h-[2px] border-gray-200" />
	</div>
)

const RiskIncidentCardSkeleton = () => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<HeadTitle />
			<Table className="mt-2">
				<TableBody>
					{fileds.map((field) => {
						return (
							<TableRow className="border-0" key={field.field}>
								<TableCell className="text-gray-400 p-1 w-40">
									{field.title}
								</TableCell>
								<TableCell className=" p-1 w-4">:</TableCell>
								<TableCell className="p-1 w-full">
									<Skeleton className="w-full h-6" />
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

interface NodeDataCardComponent extends React.FC<IProps> {
	Skeleton: typeof RiskIncidentCardSkeleton
}

const RiskIncidentCard: NodeDataCardComponent = ({ data }) => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<HeadTitle />
			<Table className="mt-2">
				<TableBody>
					{fileds.map((field) => {
						const value = getPropByPath<any>(data, field.field)
						return (
							<TableRow className="border-0" key={field.field}>
								<TableCell className="text-gray-400 p-1 w-40">
									{field.title}
								</TableCell>
								<TableCell className=" p-1 w-4">:</TableCell>
								<TableCell className="p-1">{value}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

RiskIncidentCard.Skeleton = RiskIncidentCardSkeleton

export default RiskIncidentCard
