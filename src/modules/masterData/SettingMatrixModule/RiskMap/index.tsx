import DialogMain from "@/components/dialogs/DialogMain"
import RiskMapTable from "@/components/tables/RiskMapTable"
import { useToast } from "@/hooks/use-toast"
import { groupBy } from "@/lib/utils"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import {
	MatrixRiskMapSchemaForm,
	MatrixSelectedRowCol,
} from "@/types/settingMatrix"
import { useState } from "react"
import FormInputMatrixRiskMap from "../FormInputMatrixRiskMap"
import RiskApetite from "../RiskApetite"

const RiskMap = () => {
	const {
		isFetching,
		severity_map,
		likelyhood_frequency,
		isSubmitMatrixCell,
		risk_map,
		actions: { updateRowColCell },
	} = useSettingMatrixStore()
	const [riskMapCellSelected, setRiskMapCellSelected] =
		useState<MatrixSelectedRowCol | null>(null)
	const { toast } = useToast()

	const handleSubmitCell = async (value: MatrixRiskMapSchemaForm) => {
		try {
			if (riskMapCellSelected?.field === "matrix") {
				await updateRowColCell(
					riskMapCellSelected.col_id,
					riskMapCellSelected.row_id,
					value.value,
					"risk-map",
					value.color
				)
			}
			setRiskMapCellSelected(null)
		} catch (error: any) {
			setRiskMapCellSelected(null)
			toast({
				title: error.message ?? "",
				variant: "destructive",
			})
		}
	}

	const severityMapGrouped = groupBy(severity_map.item || [], "column_value")

	return (
		<div className="rounded-md shadow-lg p-4 space-y-4">
			<h5 className="text-secondary font-semibold">Risk Map</h5>
			{risk_map.item && risk_map.item.length
				 > 0 && !risk_map.isFetching && (
				<RiskApetite
					riskApetiteDefault={risk_map.item[0].risk_apetite?.toString()}
				/>
			)}
			{risk_map.isFetching && <RiskApetite.Skeleton />}
			{severity_map.item &&
				severity_map.item &&
				likelyhood_frequency.item && (
					<RiskMapTable
						data={risk_map.item || []}
						columns={Object.entries(severityMapGrouped)}
						rowsMain={likelyhood_frequency.item}
						onClick={setRiskMapCellSelected}
					/>
				)}

			<DialogMain
				open={riskMapCellSelected !== null}
				title="Value Matrix HEATMAP"
				onOpenChange={(_) => {
					setRiskMapCellSelected(null)
				}}
				size="md"
				className="space-y-4"
			>
				<FormInputMatrixRiskMap
					label={riskMapCellSelected?.inputLabel || ""}
					defaultValue={{
						value: riskMapCellSelected?.value || "",
						color: riskMapCellSelected?.color || "",
					}}
					onCancel={() => {
						setRiskMapCellSelected(null)
					}}
					onSubmit={handleSubmitCell}
					isSubmitProcess={isSubmitMatrixCell}
				/>
			</DialogMain>
		</div>
	)
}

export default RiskMap
