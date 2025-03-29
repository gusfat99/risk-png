import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export const RiskAnalystListTableSkeleton = () => {
	return (
		<div className="max-w-full space-y-4">
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-2 items-end">
					<Skeleton className="w-[180px] h-10" />
					<Skeleton className="w-[180px] h-10" />
				</div>
				<Skeleton className="w-[217px] h-10" />
			</div>
			<Skeleton className="w-full h-[280px]" />
		</div>
	)
}
