// import { RiskMatrixTable } from "@/components/tables/RiskMatrixTable"
import RiskMatrixTable from "@/components/tables/RiskMatrixTable"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export const DashbaordRiskMatrixCard = () => {
	// Data dinamis untuk risk levels

	return (
		<div className="shadow-md p-3 rounded-lg space-y-4">
			<div className="flex flex-row justify-between" >
				<div className="bg-primary-100 rounded-md p-2 text-center text-primary font-semibold max-w-[254px] w-full m-auto">
					HEAT MAP
            </div>
            <Button variant={"ghost"} size={"sm"}  >
               <Settings size={50}  />
            </Button>
			</div>
			<RiskMatrixTable />
		</div>
	)
}
