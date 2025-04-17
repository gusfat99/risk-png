"use client"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { groupBy } from "@/lib/utils"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { RiskAnalysis } from "@/types/riksAnalyst"
import { ChartLine, SquareKanban } from "lucide-react"
import React from "react"

interface IProps {
	item: RiskAnalysis
}

const SeverityRiskCardSkeleton = () => {
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
						<TableCell className="text-gray-400  w-60 p-1">
							Likelyhood Frequency (L)
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

const SeverityRiskCard: SeverityRiskCardComponent = ({ item }) => {
	const {
		severity_map_options,
		severity_map: { isFetching: isFetchingSeverity },
	} = useSettingMatrixStore()

	const severities = groupBy(severity_map_options, "saverity_row_id")
	const entriesSeverity = Object.entries(severities)

	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<div className="space-y-2">
				<div className="flex flex-row gap-2">
					<ChartLine className="text-secondary" />
					<h4 className="text-secondary">Initial Risk Ranking</h4>
				</div>
				<Separator className="h-[2px] border-gray-200" />
			</div>
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
										{severtyRow
											?.toLowerCase()
											?.includes("personel") &&
											severity.find(
												(x) =>
													x.value ===
													item.sp_current?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("environment") &&
											severity.find(
												(x) =>
													x.value ===
													item.se_current?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("finance") &&
											severity.find(
												(x) =>
													x.value ===
													item.sf_current?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("reputation") &&
											severity.find(
												(x) =>
													x.value ===
													item.srl_current?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("asset") &&
											severity.find(
												(x) =>
													x.value ===
													item.sa_current?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("notification") &&
											severity.find(
												(x) =>
													x.value ===
													item.spn_current?.toString()
											)?.label}
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
							Likelyhood Frequency (L)
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className=" p-1">
							{item.l_frequency_current}
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400  w-60 p-1">
							Risk Ranking (RR)
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className=" p-1">
							{item.risk_ranking_current}
						</TableCell>
					</TableRow>
					<TableRow className="border-0">
						<TableCell className="text-gray-400 w-60 p-1">
							Notes Special Condition/Remarks
						</TableCell>
						<TableCell className="w-4 p-1">:</TableCell>
						<TableCell className="p-1">
							{item.remark_analyst}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

SeverityRiskCard.Skeleton = SeverityRiskCardSkeleton

export default SeverityRiskCard
