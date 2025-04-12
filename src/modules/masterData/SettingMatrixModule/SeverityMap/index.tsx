import DialogMain from "@/components/dialogs/DialogMain"
import SeverityMapTable from "@/components/tables/SeverityMapTable"
import { useToast } from "@/hooks/use-toast"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { MatrixSchemaForm, MatrixSelectedRowCol } from "@/types/settingMatrix"
import { useState } from "react"
import FormInputMatrix from "../FormInputMatrix"

const SeverityMap = () => {
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
			if (severityMapSelected?.field === "deviation") {
				await updateColumnCell(
					severityMapSelected?.col_id,
					severityMapSelected?.field ?? "",
					value.value
				)
			} else if (severityMapSelected?.field === "severity") {
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
					"severity"
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
			<h5 className="text-secondary font-semibold">Severity MAP</h5>
			{severity_map.item && (
				<SeverityMapTable
					data={severity_map.item}
					onClick={(data) => {
						setSeverityMapSelected(data)
					}}
				/>
			)}

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

export default SeverityMap
