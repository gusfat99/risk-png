import SafeguardList from "@/components/Items/SafeguardsList"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { RiskBank } from "@/types/riskDataBank"
import { File, SquareKanban } from "lucide-react"
import React from "react"

export type filedsRiskBankType = {
	title: string
	field: any
}

interface IProps {
	data: RiskBank
}

const HeadTitle = ({ title }: { title: string }) => (
	<div className="space-y-2">
		<div className="flex flex-row gap-2">
			{title.includes("Safeguards") && (
				<>
					<File className="text-secondary" />
					<h4 className="text-secondary">{title}</h4>
				</>
			)}
			{!title.includes("Safeguards") && (
				<>
					<SquareKanban className="text-secondary" />
					<h4 className="text-secondary">Risk Bank Data</h4>
				</>
			)}
		</div>
		<Separator className="h-[2px] border-gray-200" />
	</div>
)

const RiskBankMasterCardSkeleton = () => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<HeadTitle title="Risk Data Bank" />
			<Table className="mt-2">
				<TableBody>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1 w-32">
							Deviation
						</TableCell>
						<TableCell className=" p-1 w-3">:</TableCell>
						<TableCell className="p-1">
							<Skeleton className="w-full h-6" />
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1 w-32">
							Cause
						</TableCell>
						<TableCell className="p-1 w-3">:</TableCell>
						<TableCell className="p-1 w-full">
							<Skeleton className="w-full h-6" />
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1 !align-top w-32">
							Consequence
						</TableCell>
						<TableCell className=" p-1 !align-top w-3">:</TableCell>
						<TableCell className="p-1 ">
							<Skeleton className="w-full h-6" />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			{Array.from({ length: 1 }).map((_, index1) => (
				<div
					key={index1}
					className="border-2 border-gray-200 rounded-lg py-4 px-6"
				>
					<div>
						<h6>Consequence</h6>
						<Skeleton className="w-6/12 h-6" />
						<h6 className="font-semibold">Safeguards List</h6>
					</div>
					<ul className="space-y-2">
						{Array.from({ length: 3 }).map((_, index2) => (
							<SafeguardList.ItemSkeleton key={index2} />
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

const RiskBankSafeguardsCard: React.FC<IProps> = ({ data }) => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6 mt-2">
			<HeadTitle title="Safeguards" />
			<div className="flex flex-col gap-2 mt-2">
				{data.consequences.map((consequence, key1) => (
					<Card key={key1} className="py-4 px-6 border-0">
						<div className="space-y-2">
							<span className="text-gray-400 ">Consequence</span>
							<h6>{consequence.consequence}</h6>
							<h6 className="text-gray-400">Safeguards List</h6>
						</div>
						<SafeguardList safeguards={consequence.safeguards} />
					</Card>
				))}
			</div>
		</div>
	)
}

interface RiskBankMasterCardComponent extends React.FC<IProps> {
	Skeleton: typeof RiskBankMasterCardSkeleton
	Safeguars: typeof RiskBankSafeguardsCard
}

const RiskBankMasterCard: RiskBankMasterCardComponent = ({ data }) => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<HeadTitle title="Risk Data Bank" />
			<Table className="mt-2">
				<TableBody>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Deviation
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">
							{data.deviations.name}
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Cause
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">{data.cause}</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1 !align-top">
							Consequence
						</TableCell>
						<TableCell className=" p-1 !align-top">:</TableCell>
						<TableCell className="p-1 ">
							<ol className="list-decimal ml-4">
								{data.consequences.map((consequence, key) => (
									<li key={key}>{consequence.consequence}</li>
								))}
							</ol>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<RiskBankSafeguardsCard data={data} />
		</div>
	)
}

RiskBankMasterCard.Skeleton = RiskBankMasterCardSkeleton
RiskBankMasterCard.Safeguars = RiskBankSafeguardsCard

export default RiskBankMasterCard
