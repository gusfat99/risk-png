import DialogMain from "@/components/dialogs/DialogMain"
import InputWithLabel from "@/components/inputs/Input"
import LikelyhoodFrequencyTable from "@/components/tables/LikelyHoodFrequencyTable"
import RiskMatrixTable from "@/components/tables/RiskMatrixTable"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { MatrixSelectedRowCol } from "@/types/settingMatrix"
import { Plus, Save } from "lucide-react"
import React, { useState } from "react"
import FormInputMatrix from "../FormInputMatrix"

const LikelyhoodFrequency = () => {
	const { likelyhood_frequency } = useSettingMatrixStore()
	const [valueInput, setValueInput] = useState("")
	const [likelyhoodSelected, setLikelyhoodSelected] =
		useState<MatrixSelectedRowCol | null>(null)

	const handleChange = useDebounce((value: string) => {
		setValueInput(value)
	})
	console.log({ likelyhood_frequency });
	return (
		<div className="rounded-md shadow-lg p-4 space-y-4">
			<h5 className="text-secondary font-semibold">
				Likelyhood Frequency
			</h5>
			{likelyhood_frequency.item && (
				<LikelyhoodFrequencyTable
					data={likelyhood_frequency.item}
					onClick={(data) => {
						setLikelyhoodSelected(data)
					}}
				/>
			)}
			<div className="flex justify-center">
				<Button color="bg-warning">
					<Plus /> Add
				</Button>
			</div>
			<DialogMain
				open={likelyhoodSelected !== null}
				title="Value Matrix Likelyhood Frequency"
				onOpenChange={(_) => {
					setLikelyhoodSelected(null)
				}}
				size="md"
			>
				<FormInputMatrix
					label={likelyhoodSelected?.inputLabel || ""}
					onCancel={() => {
						setLikelyhoodSelected(null)
					}}
				/>
			</DialogMain>
		</div>
	)
}

export default LikelyhoodFrequency
