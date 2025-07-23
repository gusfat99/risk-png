import InputController from "@/components/inputs/InputController"
import LoadingIndicator from "@/components/LoadingIndicator"
import GeneralTable from "@/components/tables/GeneralTable"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { RoleAclMenuSchema } from "@/schemas/ConfAclMenu"
import useConfigAclMenu from "@/store/configAclMenu"
import {
	AssignedMenuUser,
	RoleAclMenuForm,
	RoleDetails
} from "@/types/configAclMenu"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useParams, usePathname, useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { useColumnsAcl } from "../../useColumnsAcl"
import {
	defaultValueRoleAclMenu,
	parseRoleAclMenuToView,
	parseRoleAclToPayload,
} from "../parseRoleAclToView"

interface ConfigRoleAccessMenuForm {
	isEdit?: boolean
}

export const comparingMenus = ({
	isEdit,
	menus,
	rolePermissionDetails,
}: {
	isEdit?: boolean
	menus: AssignedMenuUser[]
	rolePermissionDetails: RoleDetails | null
}) => {
	const menusData = [...menus]
	if (isEdit && rolePermissionDetails) {
		const combined: AssignedMenuUser[] = [
			...menus,
			...(rolePermissionDetails?.assigned_menus || []),
		]
		// Buat map pakai id sebagai key
		const map = new Map<any, AssignedMenuUser>()
		combined.forEach((item) => {
			map.set(item.id, item)
		})

		const unionMenu = Array.from(map.values())
	
		return unionMenu
	} else {
		return menusData
	}
}

const ConfigRoleAccessMenuForm: React.FC<ConfigRoleAccessMenuForm> = ({
	isEdit = false,
}) => {
	const params = useParams<{ id: any }>()
	const pathname = usePathname()
	const route = useRouter()
	const splitPathname = pathname.split("/")
	const { toast } = useToast()

	const basePathname = "/".concat(splitPathname[1])
	const {
		menuItems,
		isFetchingMenu,
		rolePermissionDetails,
		isFetchingRolePermissionDetails,
		isSubmit,
		actions: { createRolePemissions, updateRolePemissions },
	} = useConfigAclMenu()

	const menus: AssignedMenuUser[] = menuItems
		.filter((x) => x.type === "item")
		.map((x) => ({
			permissions: [],
			name: x.name,
			type: "item",
			id: x.id,
		}))

	const form = useForm<RoleAclMenuForm>({
		resolver: zodResolver(RoleAclMenuSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues:
			isEdit && rolePermissionDetails
				? parseRoleAclMenuToView(rolePermissionDetails, menus)
				: defaultValueRoleAclMenu(menuItems),
	})

	const { column } = useColumnsAcl({
		onAction: () => {},
		form,
	})

	const handleSubmit = async (values: RoleAclMenuForm) => {
		try {
			if (createRolePemissions && !params?.id && !isEdit) {
				const formDataPayload = parseRoleAclToPayload(values)
				const result = await createRolePemissions(formDataPayload)
				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset({ ...defaultValueRoleAclMenu(menuItems) })
					route.replace(basePathname)
				} else {
					throw new Error("Failed")
				}
			} else if (updateRolePemissions && params.id && isEdit) {
				// const formDataPayload = parseRiskBankToPayload(values)
				const payload = parseRoleAclToPayload(values)
				const result = await updateRolePemissions(params?.id, payload)
				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					// form.reset({ ...defaultValueRoleAclMenu })
					route.replace(basePathname)
				} else {
					throw new Error("Failed")
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

	const compareMenusData = comparingMenus({
		isEdit,
		menus,
		rolePermissionDetails,
	})

	const isLoadingMenus =
		isFetchingMenu || (isEdit && isFetchingRolePermissionDetails)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<div className="space-y-4">
					<FormField
						control={form.control}
						name={`name`}
						render={({ field }) => (
							<InputController
								{...field}
								label="Role Name"
								placeholder="Enter Role Name"
								onChange={(e) => {
									form.setValue("name", e.target.value)
								}}
							/>
						)}
					/>
					<div className="flex items-center justify-end space-x-2">
						<Button disabled={isSubmit} variant={"secondary"}>
							{isSubmit && <Spinner className="w-4 h-4" />}
							<Save /> Save Changes
						</Button>
					</div>

					{isLoadingMenus ? (
						<LoadingIndicator />
					) : (
						<GeneralTable<AssignedMenuUser>
							columns={column}
							data={compareMenusData}
						/>
					)}
				</div>
			</form>
		</Form>
	)
}

export default ConfigRoleAccessMenuForm
