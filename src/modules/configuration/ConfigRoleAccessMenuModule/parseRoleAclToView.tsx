import { RoleAclMenuSchema } from "@/schemas/ConfAclMenu"
import {
	AssignedMenuUser,
	Menu,
	RoleAclMenuPayload,
	RoleDetails,
} from "@/types/configAclMenu"
import { z } from "zod"
import { comparingMenus } from "./ConfigRoleAccessMenuForm"

export const parseRoleAclMenuToView = (
	roleAclMenuDetail: RoleDetails,
	menuItems: AssignedMenuUser[]
): z.infer<typeof RoleAclMenuSchema> => {
	
	const assignedMenus = comparingMenus({
		isEdit: true,
		menus: menuItems,
		rolePermissionDetails: roleAclMenuDetail,
	})

	return {
		name: roleAclMenuDetail.role.name,
		permissions: assignedMenus
			.filter((menu) => menu.type !== "group")
			.map((menu) => {
				return {
					menu_id: parseInt(menu.id),
					read: menu.permissions.includes("list"),
					create: menu.permissions.includes("create"),
					edit: menu.permissions.includes("edit"),
					delete: menu.permissions.includes("delete"),
					detail: menu.permissions.includes("detail"),
				}
			}),
	}
}

export const parseRoleAclToPayload = (
	roleAclMenuDetail: z.infer<typeof RoleAclMenuSchema>
): RoleAclMenuPayload => {
	return {
		name: roleAclMenuDetail.name,
		permissions: roleAclMenuDetail.permissions.map((permission) => ({
			menu_id: permission.menu_id,
			actions: [
				permission.read && "list",
				permission.create && "create",
				permission.edit && "edit",
				permission.delete && "delete",
				permission.detail && "detail",
			].filter(Boolean) as Array<
				"create" | "edit" | "delete" | "detail" | "list"
			>,
		})),
	}
}

export const defaultValueRoleAclMenu = (
	menuItems: Menu[]
): z.infer<typeof RoleAclMenuSchema> => {
	return {
		name: "",
		permissions: menuItems
			.filter((x) => x.type === "item")
			.map((x) => ({
				menu_id: x.id,
			})),
	}
}
