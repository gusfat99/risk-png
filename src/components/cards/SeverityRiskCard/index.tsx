"use client"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { zeroValueOptionSeverity } from "@/data/severity"
import { groupBy } from "@/lib/utils"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { RiskAnalysis } from "@/types/riksAnalyst"
import { SquareKanban } from "lucide-react"
import React from "react"

interface IProps {
	item: {
		sp: any
		se: any
		sf: any
		srl: any
		sa: any
		spn: any
		l_frequency: any
		risk_ranking: any
		remark: string
	}
	title?: string
}

const HeadTitle = ({ title = "Initial Risk Ranking" }: { title?: string }) => (
	<div className="space-y-2">
		<div className="flex flex-row gap-2">
			<SquareKanban className="text-secondary" />
			<h4 className="text-secondary">{title}</h4>
		</div>
		<Separator className="h-[2px] border-gray-200" />
	</div>
)

const SeverityRiskCardSkeleton = () => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<HeadTitle />
			<Table className="mt-2">
				<TableBody>
					{Array(6).map((x) => (
						<TableRow className="border-0" key={x}>
							<TableCell className="text-gray-400 w-48 p-1">
								<Skeleton className="w-full" />
							</TableCell>
							<TableCell className=" w-4 p-1">:</TableCell>
							<TableCell className=" p-1">
								<Skeleton className="w-full" />
							</TableCell>
							{/* <TableCell className="p-1">{deviation?.name}</TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Separator className="my-2" />
			<Table>
				<TableBody>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 w-60 p-1">
							Likelihood Frequency (L)
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className=" p-1">
							<Skeleton className="w-full" />
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400  w-60 p-1">
							Risk Ranking (RR)
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className=" p-1">
							<Skeleton className="w-full" />
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 w-60 p-1">
							Notes Special Condition/Remarks
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className="p-1">
							<Skeleton className="w-full" />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

interface SeverityRiskCardComponent extends React.FC<IProps> {
	Skeleton: typeof SeverityRiskCardSkeleton
}

const SeverityRiskCard: SeverityRiskCardComponent = ({ item, title }) => {
	const {
		severity_map_options,
		severity_map: { isFetching: isFetchingSeverity },
	} = useSettingMatrixStore()

	const severities = groupBy(severity_map_options, "saverity_row_id")
	const entriesSeverity = Object.entries(severities)

	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<HeadTitle title={title} />
			<Table className="mt-2">
				<TableBody>
					{isFetchingSeverity &&
						Array(6).map((x) => (
							<TableRow className="border-0" key={x}>
								<TableCell className="text-gray-400 w-48 p-1">
									<Skeleton className="w-full" />
								</TableCell>
								<TableCell className=" w-4 p-1">:</TableCell>
								<TableCell className=" p-1">
									<Skeleton className="w-full" />
								</TableCell>
								{/* <TableCell className="p-1">{deviation?.name}</TableCell> */}
							</TableRow>
						))}

					{!isFetchingSeverity &&
						entriesSeverity.map(([columnId, severity]) => {
							const severtyRow = severity[0].row_severity

							return (
								<TableRow className="border-0" key={columnId}>
									<TableCell className="text-gray-400 p-1 w-60">
										{severtyRow}
									</TableCell>
									<TableCell className=" w-4 p-1">
										:
									</TableCell>
									<TableCell className=" p-1">
										{(() => {
											const mapping: Record<string, any> =
												{
													personel: item.sp,
													environment: item.se,
													finance: item.sf,
													reputation: item.srl,
													asset: item.sa,
													notification: item.spn,
												}

											const key = Object.keys(
												mapping
											).find((k) =>
												severtyRow
													?.toLowerCase()
													?.includes(k)
											)

											if (!key) return null

											const value =
												mapping[key]?.toString()

											return value === "0"
												? zeroValueOptionSeverity.label
												: (severity.find(
														(x) => x.value === value
												  )?.label || "No Selected")
										})()}
									</TableCell>
								</TableRow>
							)
						})}
				</TableBody>
			</Table>
			<Separator className="my-2" />
			<Table>
				<TableBody>
					<TableRow className="border-0">
						<TableCell className="text-gray-400  w-60 p-1">
							Likelihood Frequency (L)
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className=" p-1">
							{item.l_frequency}
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400  w-60 p-1">
							Risk Ranking (RR)
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className=" p-1">
							{item.risk_ranking}
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 w-60 p-1">
							Notes Special Condition/Remarks
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className="p-1">{item.remark}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

SeverityRiskCard.Skeleton = SeverityRiskCardSkeleton

export default SeverityRiskCard
