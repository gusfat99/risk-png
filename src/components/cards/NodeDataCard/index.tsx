import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Node } from "@/types/node"
import { SquareSquare } from "lucide-react"
import React from "react"

export type filedsNodeType = {
	title: string
	field: keyof Node
	group: number
}

interface IProps {
	nodeSelected: Node
}

const filedsNode: filedsNodeType[] = [
	{
		title: "Node",
		field: "node",
		group: 1,
	},
	{
		title: "Node Description",
		field: "node_description",
		group: 1,
	},
	{
		title: "Node Location",
		field: "node_location",
		group: 1,
	},
	{
		title: "Drawing Reference",
		field: "drawing_reference",
		group: 1,
	},
	{
		title: "Inlet Pressure",
		field: "inlet_pressure",
		group: 2,
	},
	{
		title: "Outlet Pressure",
		field: "outlet_pressure",
		group: 2,
	},
	{
		title: "Remaks",
		field: "remark_node",
		group: 2,
	},
]

const NodeDataCardSkeleton = () => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<div className="space-y-2">
				<div className="flex flex-row gap-2">
					<SquareSquare className="text-secondary" />
					<h4 className="text-secondary">Node Data</h4>
				</div>
				<Separator className="h-[2px] border-gray-200" />
			</div>
			<div className="grid grid-cols-2 gap-1">
				<Table className="mt-2">
					<TableBody>
						{filedsNode
							.filter((field) => field.group === 1)
							.map((fieldNode) => (
								<TableRow
									className="border-0"
									key={fieldNode.field}
								>
									<TableCell className=" p-1 w-40 ">
										{fieldNode.title}
									</TableCell>

									<TableCell className=" p-1 w-4">
										:
									</TableCell>
									<TableCell className="p-1">
										<Skeleton className="w-full h-6" />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<Table className="mt-2">
					<TableBody>
						{filedsNode
							.filter((field) => field.group === 2)
							.map((fieldNode) => (
								<TableRow
									className="border-0"
									key={fieldNode.field}
								>
									<TableCell className=" p-1 w-40 ">
										{fieldNode.title}
									</TableCell>

									<TableCell className=" p-1 w-4">
										:
									</TableCell>
									<TableCell className="p-1">
										<Skeleton className="w-full h-6" />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

interface NodeDataCardComponent extends React.FC<IProps> {
	Skeleton: typeof NodeDataCardSkeleton
}

const NodeDataCard: NodeDataCardComponent = ({ nodeSelected }) => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<div className="space-y-2">
				<div className="flex flex-row gap-2">
					<SquareSquare className="text-secondary" />
					<h4 className="text-secondary">Node Data</h4>
				</div>
				<Separator className="h-[2px] border-gray-200" />
			</div>
			<div className="grid grid-cols-2 gap-1" >

			<Table className="mt-2">
				<TableBody>
					{filedsNode.filter(field => field.group === 1).map((fieldNode) => (
						<TableRow className="border-0" key={fieldNode.field}>
							<TableCell className="text-gray-400 w-40 p-1">
								{fieldNode.title}
							</TableCell>
							<TableCell className=" p-1">:</TableCell>
							<TableCell className="p-1">
								{nodeSelected?.[fieldNode.field]}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Table className="mt-2">
				<TableBody>
					{filedsNode.filter(field => field.group === 2).map((fieldNode) => (
						<TableRow className="border-0" key={fieldNode.field}>
							<TableCell className="text-gray-400 w-40 p-1">
								{fieldNode.title}
							</TableCell>
							<TableCell className=" p-1">:</TableCell>
							<TableCell className="p-1">
								{nodeSelected?.[fieldNode.field]}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			</div>
		</div>
	)
}

NodeDataCard.Skeleton = NodeDataCardSkeleton

export default NodeDataCard
