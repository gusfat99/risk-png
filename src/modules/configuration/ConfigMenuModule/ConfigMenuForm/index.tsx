import React from "react"
import { defaultValueMenu, MenuSchema } from "@/schemas/ConfAclMenu"
import { MenuForm } from "@/types/configAclMenu"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import InputController from "@/components/inputs/InputController"
import InputSelectController from "@/components/inputs/InputSelectController"
import { typeMenuOptions } from "@/data/enumetions"
import LucideIcon from "@/components/LucideIcon"
import useConfigAclMenu from "@/store/configAclMenu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/ui/spinner"
import { Save } from "lucide-react"
import { usePathname } from "next/navigation"

interface ConfigMenuFormProps {
	isEdit: boolean
}

const ConfigMenuForm: React.FC<ConfigMenuFormProps> = ({ isEdit }) => {
	const pathname = usePathname()
	const splitPathname = pathname.split("/")

	const basePathname = "/".concat(splitPathname[1])
	const { menuItems, isFetching, isSubmit } = useConfigAclMenu()
	const form = useForm<MenuForm>({
		resolver: zodResolver(MenuSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: defaultValueMenu,
	})

	const menuOptions = menuItems.map((x) => ({
		label: x.name,
		value: x.id,
	}))

	const handleSubmit = async (values: MenuForm) => {
		try {
			// if (createData && !params?.id && !isEdit) {
			//   const formDataPayload = parseRiskBankToPayload(values)
			//   const result = await createData(formDataPayload)
			//   if (result) {
			//     toast({
			//       title: result.message ?? "",
			//       variant: "success",
			//     })
			//     form.reset({ ...initialRiskBank })
			//     route.replace(basePathname)
			//   } else {
			//     throw new Error("Failed")
			//   }
			// } else if (updateData && params.id && isEdit) {
			//   // const formDataPayload = parseRiskBankToPayload(values)
			//   const result = await updateData(params?.id, values)
			//   if (result) {
			//     toast({
			//       title: result.message ?? "",
			//       variant: "success",
			//     })
			//     form.reset({ ...initialRiskBank })
			//     route.replace(basePathname)
			//   } else {
			//     throw new Error("Failed")
			//   }
			// }
		} catch (error: any) {
			// console.log({ error })
			// toast({
			//   title: error?.message
			//     ? error.message
			//     : "An unexpected error occurred",
			//   variant: "destructive",
			// })
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="grid grid-cols-1 gap-4 md:grid-cols-2"
			>
				<div className="space-y-4">
					<FormField
						control={form.control}
						name={`name`}
						render={({ field }) => (
							<InputController
								{...field}
								label="Menu Name"
								placeholder="Enter Menu Name"
								onChange={(e) => {
									form.setValue("name", e.target.value)
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={`type`}
						render={({ field }) => (
							<InputSelectController
								field={field}
								label="Menu Type"
								// disabled={isDetail}
								placeholder="Select Menu Type"
								// loading={isFetchingSupportData}
								items={typeMenuOptions}
								onChange={(value) => {
									form.setValue("type", value)
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={`path`}
						render={({ field }) => (
							<InputController
								{...field}
								label="Path Url"
								placeholder="Ex. /example"
								onChange={(e) => {
									form.setValue("path", e.target.value)
								}}
							/>
						)}
					/>
				</div>
				<div className="space-y-4">
					<div className="flex flex-row gap-2 items-end">
						<FormField
							control={form.control}
							name={`icon`}
							render={({ field }) => (
								<InputController
									{...field}
									label="Icon Name"
									isRequired={false}
									description="icon only show if the menu is parent menu"
									placeholder="reference icon from lucide icon"
									onChange={(e) => {
										form.setValue("icon", e.target.value)
									}}
								/>
							)}
						/>
						{form.watch("icon") && (
							<LucideIcon
								iconName={form.getValues("icon") || ""}
								className="mb-2"
							/>
						)}
					</div>
					<FormField
						control={form.control}
						name={"parent_id"}
						render={({ field }) => (
							<InputSelectController
								field={field}
								label="Parent Menu"
								isRequired={false}
								// disabled={isDetail}
								placeholder="Select Parent Menu"
								loading={isFetching}
								items={menuOptions}
								onChange={(value) => {
									form.setValue("parent_id", value)
								}}
								description="Please select when menu is children of parent menu"
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"order"}
						render={({ field }) => (
							<InputController
								label="Order Number"
								type="number"
								placeholder="Enter Order Number Menu"
								onChange={(e) => {
									form.setValue(
										"order",
										parseInt(e.target.value)
									)
								}}
							/>
						)}
					/>
					<div className="flex justify-end gap-4">
						<Link href={basePathname}>
							{" "}
							<Button variant={"outline"} disabled={isSubmit}>
								Cancel
							</Button>
						</Link>
						<Button disabled={isSubmit} variant={"secondary"}>
							{isSubmit && <Spinner className="w-4 h-4" />}
							<Save /> Save Data
						</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}

export default ConfigMenuForm
