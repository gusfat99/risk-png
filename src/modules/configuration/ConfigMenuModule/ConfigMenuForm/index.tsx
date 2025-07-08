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
import { useParams, usePathname, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ConfigMenuFormProps {
	isEdit?: boolean
}

const ConfigMenuForm: React.FC<ConfigMenuFormProps> = ({ isEdit = false }) => {
	const pathname = usePathname()
	const params = useParams<{ id: any }>()
	const route = useRouter();
	const splitPathname = pathname.split("/")
	const { toast } = useToast()

	const basePathname = "/".concat(splitPathname[1])
	const {
		menuItems,
		isFetching,
		isSubmit,
		menuItem,

		actions: { createMenu, updateMenu },
	} = useConfigAclMenu()

	const form = useForm<MenuForm>({
		resolver: zodResolver(MenuSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues:
			isEdit && params.id && menuItem
				? {
						...menuItem,
						icon: menuItem.icon ?? undefined,
						parent_id:
							menuItem.parent_id !== null &&
							menuItem.parent_id !== undefined
								? String(menuItem.parent_id)
								: undefined,
						available_actions: Array.isArray(
							menuItem.available_actions
						)
							? (menuItem.available_actions as any[])
									.map((a) =>
										typeof a === "string"
											? a
											: a?.action ?? undefined
									)
									.filter(Boolean)
							: undefined,
				  }
				: defaultValueMenu,
	})

	const menuOptions = menuItems.map((x) => ({
		label: x.name,
		value: x.id?.toString() || "",
	}))

	const handleSubmit = async (values: MenuForm) => {
		try {
			if (createMenu && !params?.id && !isEdit) {
				const formDataPayload = {
					...values,
					parent_id: values.parent_id ? values.parent_id : undefined,
				}

				const result = await createMenu(formDataPayload)
				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...defaultValueMenu })
					route.replace(basePathname)
					// window.location.replace(basePathname)
				} else {
					throw new Error("Failed to create menu")
				}
			} else if (updateMenu && params.id && isEdit) {
				const formDataPayload = {
					...values,
					parent_id: values.parent_id ? values.parent_id : undefined,
				}
				const result = await updateMenu(params?.id, formDataPayload)
				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...defaultValueMenu })
					route.replace(basePathname)
				} else {
					throw new Error("Failed to update menu")
				}
			}
		} catch (error: any) {
			toast({
				title: error?.message
					? error.message
					: "An unexpected error occurred",
				variant: "destructive",
			})
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
								placeholder="Select Menu Type"
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
					<div className="flex flex-row gap-2 items-center">
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
								placeholder="Select Parent Menu"
								loading={isFetching}
								items={menuOptions}
								onChange={(value) => {
									console.log("selected parent id", value)
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
								defaultValue={field.value}
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
