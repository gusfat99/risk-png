"use client"
import useAuthStore from "@/store/authStore"
import { MenuPermission } from "@/types/auth"
import { usePathname } from "next/navigation"

export const flattenMenu = (
	items: MenuPermission[],
	depth = 0
): MenuPermission[] => {
	return items.flatMap((item) => [
		{ ...item, depth },
		...(item.children ? flattenMenu(item.children, depth + 1) : []),
	])
}

const usePermissionAccessUser = (): {
	canAccessCurrentPath: boolean
	canCreate: boolean
	canRead: boolean
	canEdit: boolean
	canDelete: boolean
	canDetail: boolean
	others: string[]
	menus: MenuPermission[]
} => {
	const { menus } = useAuthStore()

	const pathname = usePathname()
	const excludePath = ["/login", "/setting-profile", "/forgot-password"]
	//create a flat array of menus
	const flatMenus = flattenMenu(menus)

	const permissionAccessUser =
		flatMenus.find((x) => {
			return pathname === x.path
		})?.permissions || []

	const pathAdd = "add"
	const pathEdit = "update"
	const pathDetail = "detail"
	// const pathRead = "";
	let canAccessCurrentPath = false
	if (excludePath.includes(pathname)) {
		canAccessCurrentPath = true
	} else {
		if (pathname.includes(pathAdd)) {
			canAccessCurrentPath = permissionAccessUser.includes("create")
		} else if (pathname.includes(pathEdit)) {
			canAccessCurrentPath = permissionAccessUser.includes("edit")
		} else if (pathname.includes(pathDetail)) {
			canAccessCurrentPath = permissionAccessUser.includes("detail")
		} else {
			canAccessCurrentPath = permissionAccessUser.includes("list")
		}
	}
	// canAccessCurrentPath is true if the user has permission to access the current path or page

	const result = {
		canAccessCurrentPath,
		canCreate: permissionAccessUser.includes("create"),
		canRead: permissionAccessUser.includes("list"),
		canEdit: permissionAccessUser.includes("edit"),
		canDelete: permissionAccessUser.includes("delete"),
		canDetail: permissionAccessUser.includes("detail"),
		others: [],
		menus,
	}

	return result
}

export default usePermissionAccessUser
