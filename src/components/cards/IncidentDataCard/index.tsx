import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Node } from "@/types/node"
import { SquareRadical, SquareSquare } from "lucide-react"
import React from "react"

type fileds = {
	node: string
	deviation: string
	cause: string
	incident_count: number
	parameter : string
}

type Rows = {
	title: string
	field: keyof fileds
}

interface IProps {
	data: fileds
}

const IncidentDataCard: React.FC<IProps> = ({ data }) => {
	const fileds: Rows[] = [
		{
			title: "Node",
			field: "node",
		},
		{
			title: "Parameter",
			field: "parameter",
		},
		{
			title: "Deviation",
			field: "deviation",
		},
		{
			title: "Cause",
			field: "cause",
		},
		{
			title: "Incident Count",
			field: "incident_count",
		},
	]

	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<div className="space-y-2">
				<div className="flex flex-row gap-2">
					<SquareRadical className="text-secondary" />
					<h4 className="text-secondary">Incident Data</h4>
				</div>
				<Separator className="h-[2px] border-gray-200" />
			</div>
			<Table className="mt-2">
				<TableBody>
					{fileds.map((field) => (
						<TableRow className="border-0" key={field.field}>
							<TableCell className="text-gray-400 p-1">
								{field.title}
							</TableCell>
							<TableCell className=" p-1">:</TableCell>
							<TableCell className="p-1">
								{data?.[field.field]}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default IncidentDataCard
