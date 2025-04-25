import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Cause, Consequences, Deviations } from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"
import { SquareKanban } from "lucide-react"
import React from "react"

export type filedsRiskBankType = {
	title: string
	field: any
}

interface IProps {
	cause: Cause | null
	deviation: Deviations | null
	consequence: Consequences | null
	existing_safeguard: string[]
}

const RiskBankCardSkeleton = () => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<div className="space-y-2">
				<div className="flex flex-row gap-2">
					<SquareKanban className="text-secondary" />
					<h4 className="text-secondary">Risk Bank Data</h4>
				</div>
				<Separator className="h-[2px] border-gray-200" />
			</div>
			<Table className="mt-2">
				<TableBody>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Deviation
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">
							<Skeleton className="w-full" />
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Cause
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">
							<Skeleton className="w-full" />
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Consequence
						</TableCell>
						<TableCell className=" p-1 w-4">:</TableCell>
						<TableCell className="p-1">
							<Skeleton className="w-full" />
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Existing Safeguards
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">
							<Skeleton className="w-full" />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

interface RiskBankCardComponent extends React.FC<IProps> {
	Skeleton: typeof RiskBankCardSkeleton
}

const RiskBankCard: RiskBankCardComponent = ({
	cause,
	deviation,
	consequence,
	existing_safeguard,
}) => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<div className="space-y-2">
				<div className="flex flex-row gap-2">
					<SquareKanban className="text-secondary" />
					<h4 className="text-secondary">Risk Bank Data</h4>
				</div>
				<Separator className="h-[2px] border-gray-200" />
			</div>
			<Table className="mt-2">
				<TableBody>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Deviation
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">{deviation?.name}</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Cause
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">{cause?.cause}</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Consequence
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">
							{consequence?.consequence}
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Existing Safeguards
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">
							{existing_safeguard.length <= 0 ? (
								"-"
							) : (
								<ul>
									{existing_safeguard.map((safeguard, index) => (
										<li key={index}>
											{safeguard}
										</li>
									))}
								</ul>
							)}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

RiskBankCard.Skeleton = RiskBankCardSkeleton

export default RiskBankCard
