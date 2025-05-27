import DialogMain from "@/components/dialogs/DialogMain"
import LikelyhoodFrequencyTable from "@/components/tables/LikelyHoodFrequencyTable"
import { Button } from "@/components/ui/button"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { MatrixSchemaForm, MatrixSelectedRowCol } from "@/types/settingMatrix"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import FormInputMatrix from "../FormInputMatrix"
import { useToast } from "@/hooks/use-toast"

const LikelyhoodFrequency = () => {
	const {
		likelyhood_frequency,
		isSubmitMatrixCell,
		isProcessAddRowLikelyhood,
		actions: {
			updateColumnCell,
			updateRowCell,
			updateRowColCell,
			addRowLikelyhoodFrequency,
			deleteLastRowLikelyhoodFrequency,
		},
	} = useSettingMatrixStore()
	const [likelyhoodSelected, setLikelyhoodSelected] =
		useState<MatrixSelectedRowCol | null>(null)
	const { toast } = useToast()

	const handleSubmitCell = async (value: MatrixSchemaForm) => {
		try {
			if (likelyhoodSelected?.field === "frequency_name") {
				await updateColumnCell(
					likelyhoodSelected?.col_id,
					likelyhoodSelected?.field ?? "",
					value.value
				)
			} else if (likelyhoodSelected?.field === "explanation_name") {
				await updateRowCell(
					likelyhoodSelected.row_id,
					likelyhoodSelected?.field ?? "",
					value.value
				)
			} else if (likelyhoodSelected?.field === "matrix") {
				await updateRowColCell(
					likelyhoodSelected.col_id,
					likelyhoodSelected.row_id,
					value.value,
					"likelyhood"
				)
			}
			setLikelyhoodSelected(null)
		} catch (error: any) {
			setLikelyhoodSelected(null)
			toast({
				title: error.message ?? "",
				variant: "destructive",
			})
		}
	}

	const handleAddRow = () => {
		addRowLikelyhoodFrequency && addRowLikelyhoodFrequency()
	}
	const handleDeleteLastRow = () => {
		deleteLastRowLikelyhoodFrequency && deleteLastRowLikelyhoodFrequency()
	}

	return (
		<div className="rounded-md shadow-lg p-4 space-y-4">
			<h5 className="text-secondary font-semibold">
				Likelihood Frequency
			</h5>
			{likelyhood_frequency.item && (
				<LikelyhoodFrequencyTable
					data={likelyhood_frequency.item}
					onClick={(data) => {
						setLikelyhoodSelected(data)
					}}
				/>
			)}
			<div className="flex justify-center gap-2">
				<Button
					variant={"default"}
					disabled={isProcessAddRowLikelyhood}
					className="bg-secondary-300 hover:bg-secondary-400"
					onClick={() => {
						handleAddRow()
					}}
				>
					<Plus /> Add Row
				</Button>
				<Button
					variant={"outline"}
					disabled={isProcessAddRowLikelyhood}
					onClick={() => {
						handleDeleteLastRow()
					}}
				>
					<Minus /> Delete Row
				</Button>
			</div>
			<DialogMain
				open={likelyhoodSelected !== null}
				title="Value Matrix Likelihood Frequency"
				onOpenChange={(_) => {
					setLikelyhoodSelected(null)
				}}
				size="md"
				className="space-y-4"
			>
				<FormInputMatrix
					label={likelyhoodSelected?.inputLabel || ""}
					defaultValue={likelyhoodSelected?.value}
					onCancel={() => {
						setLikelyhoodSelected(null)
					}}
					onSubmit={handleSubmitCell}
					isSubmitProcess={isSubmitMatrixCell}
				/>
			</DialogMain>
		</div>
	)
}

export default LikelyhoodFrequency
