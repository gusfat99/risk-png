import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import {
	Cause,
	Consequences,
	Deviations,
	Parameter,
} from "@/types/riskDataBank"
import { Safeguard } from "@/types/safeguard"
import { SquareKanban } from "lucide-react"
import React from "react"

export type filedsRiskBankType = {
	title: string
	field: any
}

interface IProps {
	cause: Cause | null
	parameter: Parameter | null
	deviation: Deviations | null
	consequence: Consequences | null
	failed_safeguards: Safeguard[]
}

const RiskBankIncidentCardSkeleton = () => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<div className="space-y-2">
				<div className="flex flex-row gap-2">
					<SquareKanban className="text-secondary" />
					<h4 className="text-secondary">Risk Data Bank</h4>
				</div>
				<Separator className="h-[2px] border-gray-200" />
			</div>
			<Table className="mt-2">
				<TableBody>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 p-1">
							Parameter
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">
							<Skeleton className="w-full" />
						</TableCell>
					</TableRow>
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

interface RiskBankIncidentCardComponent extends React.FC<IProps> {
	Skeleton: typeof RiskBankIncidentCardSkeleton
}

const RiskBankIncidentCard: RiskBankIncidentCardComponent = ({
	cause,
	deviation,
	consequence,
	failed_safeguards,
	parameter,
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
							Parameter
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">{parameter?.name}</TableCell>
					</TableRow>
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
							Related Safeguard Failure
						</TableCell>
						<TableCell className=" p-1">:</TableCell>
						<TableCell className="p-1">
							{failed_safeguards.length <= 0 ? (
								"-"
							) : (
								<ul>
									{failed_safeguards.map(
										(safeguard, index) => (
											<li key={index}>
												{safeguard.safeguard}
											</li>
										)
									)}
								</ul>
							)}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

RiskBankIncidentCard.Skeleton = RiskBankIncidentCardSkeleton

export default RiskBankIncidentCard
