// import { RiskMatrixTable } from "@/components/tables/RiskMatrixTable"
import RiskMapTable from "@/components/tables/RiskMapTable"
import { Button } from "@/components/ui/button"
import {
	LikelyhoodFrequency,
	RiskMap,
	SeverityMap,
} from "@/types/settingMatrix"
import { Settings } from "lucide-react"
import React from "react"

interface DashboardRiskMatrixCardProps {
	riskMapItems: RiskMap[]
	loading: boolean
	severityMapGrouped: Record<any, SeverityMap[]>
	likelyhoodFrequencyItems: LikelyhoodFrequency | null
	onClickSetting? : () => void
}

const DashboardRiskMatrixCard: React.FC<DashboardRiskMatrixCardProps> = ({
	riskMapItems,
	loading,
	severityMapGrouped,
	likelyhoodFrequencyItems,
	onClickSetting
}) => {
	
	return (
		<div className="shadow-md p-3 rounded-lg space-y-4">
			<div className="flex flex-row justify-between">
				<div className="bg-primary-100 rounded-md p-2 text-center text-primary font-semibold max-w-[254px] w-full m-auto">
					HEAT MAP
				</div>
				<Button variant={"ghost"} size={"sm"} onClick={() => {onClickSetting && onClickSetting()}} >
					<Settings size={50} />
				</Button>
			</div>
			{likelyhoodFrequencyItems && (
				<RiskMapTable
					data={riskMapItems}
					columns={Object.entries(severityMapGrouped)}
					rowsMain={likelyhoodFrequencyItems}
				/>
			)}
		</div>
	)
}

export default DashboardRiskMatrixCard
