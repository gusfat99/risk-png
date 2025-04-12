import DialogMain from "@/components/dialogs/DialogMain"
import LikelyhoodFrequencyTable from "@/components/tables/LikelyHoodFrequencyTable"
import { Button } from "@/components/ui/button"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { MatrixSchemaForm, MatrixSelectedRowCol } from "@/types/settingMatrix"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import FormInputMatrix from "../FormInputMatrix"
import { useToast } from "@/hooks/use-toast"
import RiskMapTable from "@/components/tables/RiskMapTable"
import SeverityMapTable from "@/components/tables/SeverityMapTable"

const RiskMap = () => {
	const {
		severity_map,
		isSubmitMatrixCell,
		actions: { updateColumnCell, updateRowCell, updateRowColCell },
	} = useSettingMatrixStore()
	const [severityMapSelected, setSeverityMapSelected] =
		useState<MatrixSelectedRowCol | null>(null)
	const { toast } = useToast()

	const handleSubmitCell = async (value: MatrixSchemaForm) => {
		try {
			if (severityMapSelected?.field === "frequency_name") {
				await updateColumnCell(
					severityMapSelected?.col_id,
					severityMapSelected?.field ?? "",
					value.value
				)
			} else if (severityMapSelected?.field === "explanation_name") {
				await updateRowCell(
					severityMapSelected.row_id,
					severityMapSelected?.field ?? "",
					value.value
				)
			} else if (severityMapSelected?.field === "matrix") {
				await updateRowColCell(
					severityMapSelected.col_id,
					severityMapSelected.row_id,
					value.value,
					"likelyhood"
				)
			}
			setSeverityMapSelected(null)
		} catch (error: any) {
			setSeverityMapSelected(null)
			toast({
				title: error.message ?? "",
				variant: "destructive",
			})
		}
	}

	return (
		<div className="rounded-md shadow-lg p-4 space-y-4">
			<h5 className="text-secondary font-semibold">
				Likelyhood Frequency
			</h5>
			{severity_map.item && <SeverityMapTable data={severity_map.item} />}

			<DialogMain
				open={severityMapSelected !== null}
				title="Value Matrix Severity Map"
				onOpenChange={(_) => {
					setSeverityMapSelected(null)
				}}
				size="md"
				className="space-y-4"
			>
				<FormInputMatrix
					label={severityMapSelected?.inputLabel || ""}
					defaultValue={severityMapSelected?.value}
					onCancel={() => {
						setSeverityMapSelected(null)
					}}
					onSubmit={handleSubmitCell}
					isSubmitProcess={isSubmitMatrixCell}
				/>
			</DialogMain>
		</div>
	)
}

export default RiskMap
