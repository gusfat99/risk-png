"use client"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { groupBy } from "@/lib/utils"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { RiskMonitoring } from "@/types/riskMonitoring"
import { ChartLine, SquareKanban } from "lucide-react"
import React from "react"

interface IProps {
	item: RiskMonitoring
}

const HeadTitle = () =><div className="space-y-2">
<div className="flex flex-row gap-2">
   <SquareKanban className="text-secondary" />
   <h4 className="text-secondary">Risk Ranking (Affected)</h4>
</div>
<Separator className="h-[2px] border-gray-200" />
</div>

const SeverityAffectedRiskCardSkeleton = () => {
	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<HeadTitle/>
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
		</div>
	)
}

interface SeverityAffectedRiskCardComponent extends React.FC<IProps> {
	Skeleton: typeof SeverityAffectedRiskCardSkeleton
}

const SeverityAffectedRiskCard: SeverityAffectedRiskCardComponent = ({
	item,
}) => {
	const {
		severity_map_options,
		severity_map: { isFetching: isFetchingSeverity },
	} = useSettingMatrixStore()

	const severities = groupBy(severity_map_options, "saverity_row_id")
	const entriesSeverity = Object.entries(severities)

	return (
		<div className="border-2 border-gray-200 rounded-lg py-4 px-6">
			<HeadTitle/>
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
													item.sp_affected?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("environment") &&
											severity.find(
												(x) =>
													x.value ===
													item.se_affected?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("finance") &&
											severity.find(
												(x) =>
													x.value ===
													item.sf_affected?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("reputation") &&
											severity.find(
												(x) =>
													x.value ===
													item.srl_affected?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("asset") &&
											severity.find(
												(x) =>
													x.value ===
													item.sa_affected?.toString()
											)?.label}
										{severtyRow
											?.toLowerCase()
											?.includes("notification") &&
											severity.find(
												(x) =>
													x.value ===
													item.spn_affected?.toString()
											)?.label}
									</TableCell>
								</TableRow>
							)
						})}
				</TableBody>
			</Table>
		</div>
	)
}

SeverityAffectedRiskCard.Skeleton = SeverityAffectedRiskCardSkeleton

export default SeverityAffectedRiskCard
