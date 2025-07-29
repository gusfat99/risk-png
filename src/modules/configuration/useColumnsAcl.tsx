"use client"
import InputCheckboxController from "@/components/inputs/InputCheckboxController"
import InputController from "@/components/inputs/InputController"
import { FormField } from "@/components/ui/form"
import { AssignedMenuUser, RoleAclMenuForm } from "@/types/configAclMenu"
import { useMemo } from "react"
import { UseFormReturn } from "react-hook-form"

export interface UseColumnsRiskAnalystProps {
	onAction?: (actionName: string, value: any, value2?: any) => void
	form: UseFormReturn<RoleAclMenuForm>
	readOnly? : boolean
}
export const useColumnsAcl = ({
	onAction,
	form,
	readOnly
}: UseColumnsRiskAnalystProps) => {
	const column = useMemo(() => {
		const cols = [
			{
				id: "menu_name",
				accessorKey: "name",

				meta: {
					className: "text-center",
				},
				size: 80,
				header: "Menu",
				cell: (row: AssignedMenuUser, index: number) => (
					<div>
						<FormField
							control={form.control}
							name={`permissions.${index}.menu_id`}
							render={({ field }) => (
								<InputController
									{...field}
									type="hidden"
									placeholder="Enter"
									readOnly={readOnly}
								/>
							)}
						/>
						<span className="break-words">{row.name}</span>
					</div>
				),
			},
			{
				id: "read",
				accessorKey: "read",
				size: 128,
				enableSorting: false,
				header: "Read",
				cell: (row: AssignedMenuUser, index: number) => {
					// console.log({index, row})
					return (
					<div className="flex items-center justify-center">
						<FormField
							control={form.control}
							name={`permissions.${index}.read`}
							render={({ field }) => (
								<InputCheckboxController
									{...field}
									value={field.value ? "true" : "false"}
									onCheckedChange={(checked) => {
									
										field.onChange(checked)
									}}
									checked={field.value ? true : false}
									disabled={readOnly}
								/>
							)}
						/>
					</div>
				)},
			},
			{
				id: "create",
				accessorKey: "create",
				size: 128,
				enableSorting: false,
				header: "Create",
				cell: (row: AssignedMenuUser, index: number) => (
					<div className="flex items-center justify-center">
						<FormField
							control={form.control}
							name={`permissions.${index}.create`}
							render={({ field }) => (
								<InputCheckboxController
									{...field}
									value={field.value ? "true" : "false"}
									onCheckedChange={(checked) => {
										console.log("checked", checked)
										field.onChange(checked)
									}}
									checked={field.value ? true : false}
									disabled={readOnly}
								/>
							)}
						/>
					</div>
				),
			},
			{
				id: "edit",
				accessorKey: "edit",

				size: 128,
				enableSorting: false,
				header: "Edit",
				cell: (row: AssignedMenuUser, index: number) => (
					<div className="flex items-center justify-center">
						<FormField
							control={form.control}
							name={`permissions.${index}.edit`}
							render={({ field }) => (
								<InputCheckboxController
									{...field}
									value={field.value ? "true" : "false"}
									onCheckedChange={(checked) => {
										// console.log("checked", checked)
										field.onChange(checked)
									}}
									checked={field.value ? true : false}
									disabled={readOnly}
								/>
							)}
						/>
					</div>
				),
			},
			{
				id: "detail",
				accessorKey: "detail",

				size: 128,
				enableSorting: false,
				header: "Detail",
				cell: (row: AssignedMenuUser, index: number) => (
					<div className="flex items-center justify-center">
						<FormField
							control={form.control}
							name={`permissions.${index}.detail`}
							render={({ field }) => (
								<InputCheckboxController
									{...field}
									value={field.value ? "true" : "false"}
									onCheckedChange={(checked) => {
										// console.log("checked", checked)
										field.onChange(checked)
									}}
									checked={field.value ? true : false}
									disabled={readOnly}
								/>
							)}
						/>
					</div>
				),
			},
			{
				id: "delete",
				accessorKey: "delete",
				size: 128,
				enableSorting: false,
				header: "Delete",
				cell: (row: AssignedMenuUser, index: number) => (
					<div className="flex items-center justify-center">
						<FormField
							control={form.control}
							name={`permissions.${index}.delete`}
							render={({ field }) => (
								<InputCheckboxController
									{...field}
									value={field.value ? "true" : "false"}
									onCheckedChange={(checked) => {
										// console.log("checked", checked)
										field.onChange(checked)
									}}
									checked={field.value ? true : false}
									disabled={readOnly}
								/>
							)}
						/>
					</div>
				),
			},
		]
		return cols
	}, [form])

	return {
		column,
	}
}
