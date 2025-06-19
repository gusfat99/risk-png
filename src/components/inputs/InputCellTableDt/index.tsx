"use client"
import { FormField } from "@/components/ui/form"
import InputSelectController from "../InputSelectController"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { useDebounce } from "@/hooks/use-debounce"
import { fieldsInputSeverity } from "@/data/severity"
import { SelectDataType } from "@/types/common"
import React from "react"
import InputSelect from "../InputSelect"

export const CellInput = ({
	row,
	form,
	name,
	name_code,
	readOnly = false,
}: {
	row: any
	form: any
	name: any
	name_code: any
	readOnly?: boolean
}) => {
	const rowId = row.index
	const { likelyhood_options, severity_map_options } = useSettingMatrixStore()

	const debouncedUpdate = useDebounce((key: any, value: any) => {
		form.setValue(key, value)
	}, 100)

	const fieldSeverity = fieldsInputSeverity.find(
		(field) => field.name_code === name_code
	)

	let items: SelectDataType[] = [
		{
			label: "(0) not taken into considered",
			value: 0,
		},
		...severity_map_options.map((x) => ({
			...x,
			value: parseInt(x.value),
		})),
	]

	if (fieldSeverity) {
		items = items
			.filter(
				(item) =>
					item.saverity_row_id?.toString() ===
						fieldSeverity.col_id?.toString() || item.value === 0
			)
			.map((x) => ({
				...x,
				value: parseInt(x.value),
			}))
	}
	if (name.includes("l_frequency")) {
		items = likelyhood_options.map((x) => ({
			...x,
			value: parseInt(x.value),
		}))
	}

	return (
		<FormField
			control={form.control}
			name={`risks.${rowId}.${name}`}
			render={({ field }) => (
				<InputSelectController
					field={field}
					defaultValue={field.value}
					label={fieldSeverity?.label || ""}
					labelClassName="text-xs"
					placeholder="Select SP"
					itemClassName="text-xs"
					items={items}
					disabled={readOnly}
					onChange={(value) => {
						debouncedUpdate(
							`risks.${rowId}.${name}`,
							parseInt(value) as any
						)
					}}
				/>
			)}
		/>
	)
}

export const CellInputReadOnly = ({
	value,
	name,
	name_code,
}: {
	value: any
	name: any
	name_code: any
}) => {
	const { likelyhood_options, severity_map_options } = useSettingMatrixStore()

	const fieldSeverity = fieldsInputSeverity.find(
		(field) => field.name_code === name_code
	)

	let items: SelectDataType[] = [
		{
			label: "(0) not taken into considered",
			value: 0,
		},
		...severity_map_options.map((x) => ({
			...x,
			value: parseInt(x.value),
		})),
	]

	if (fieldSeverity) {
		items = items
			.filter(
				(item) =>
					item.saverity_row_id?.toString() ===
						fieldSeverity.col_id?.toString() || item.value === 0
			)
			.map((x) => ({
				...x,
				value: parseInt(x.value),
			}))
	}
	if (name.includes("l_frequency")) {
		items = likelyhood_options.map((x) => ({
			...x,
			value: parseInt(x.value),
		}))
   }

	return (
		<InputSelect
			defaultValue={value}
			label={fieldSeverity?.label || ""}
			labelClassName="text-xs"
			placeholder="Select SP"
			itemClassName="text-xs"
			items={items}
			disabled={true}
		/>
	)
}

export const MemoizedCellInput = React.memo(
	CellInput,
	(prev, next) => prev.row.id === next.row.id
)

