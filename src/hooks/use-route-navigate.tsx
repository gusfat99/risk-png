"use client"
import routes from "@/data/routes"
import { toSentenceCase } from "@/lib/utils"
import useAuthStore from "@/store/authStore"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export const useRouteGetTitle = () => {
	const pathname = usePathname()
	const { menus } = useAuthStore()

	const route = useMemo(() => {
		let routeAvailable = menus.find((x) => {
			if ((x.children || [])?.length > 0) {
				return x.children?.some((y) => pathname.includes(y.path))
			} else {
				return pathname.includes(x.path)
			}
		})
		if (!routeAvailable) {
			routeAvailable = routes.navSecondary.find((x) => {
				if ((x.children || [])?.length > 0) { 
					return x.children?.some((y) => pathname.includes(y.path))
				} else {
					return pathname.includes(x.path)
				}
			})
		}
		return routeAvailable
	}, [pathname])

	let title = route?.name ?? ""
	let subtitle = route?.name ?? ""
	const pathNameArr = pathname.split("/")
	const lengthPathname = pathNameArr.length

	if (route?.children?.length && route.children.length > 0) {
		if (lengthPathname > 2) {
			title = toSentenceCase(pathNameArr[2])
			title +=
				" " +
				(route.children.find((r) => pathname.includes(r.path))?.name ??
					"")
		} else {
			title =
				route.children.find((r) => pathname.includes(r.path))?.name ??
				""
		}
		subtitle +=
			" - " +
				route.children.find((r) => pathname.includes(r.path))?.name ||
			""
	} else {
		if (lengthPathname > 2) {
			title = toSentenceCase(pathNameArr[2])
			title += " " + route?.name
		} else if(pathNameArr[1] === "not-found") {
			title = pathNameArr[1]
		}
	}
	return {
		icon: route?.icon,
		title,
		subtitle,
		length_pathname: lengthPathname,
	}
}

export const useRouteNavigate = () => {
	const pathname = usePathname()
	const { menus } = useAuthStore()

	const route = useMemo(() => {
		let availableRoute = menus.find((x) => {
			if ((x.children || [])?.length > 0) {
				return x.children?.some((y) => pathname.includes(y.path))
			} else {
				return pathname.includes(x.path)
			}
		})
		if (!availableRoute) {
			availableRoute = routes.navSecondary.find((x) => {
				if ((x.children || [])?.length > 0) {
					return x.children?.some((y) => pathname.includes(y.path))
				} else {
					return pathname.includes(x.path)
				}
			})
		}
		return availableRoute
	}, [pathname])

	const pathNameArr = pathname.split("/")

	const regexIsID =
		/^(?:\d+|[a-zA-Z0-9]{5,}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i

	pathNameArr.splice(0, 1)
	const lastPathname = pathNameArr[pathNameArr.length - 1]

	if (regexIsID.test(lastPathname)) {
		pathNameArr.splice(pathNameArr.length - 1, 1)
	}

	const breadcrumbs: { title: string; path: string }[] = []

	pathNameArr.forEach((pathname, index) => {
		if (index === 0) {
			if (route?.children && route?.children?.length > 0) {
				breadcrumbs.push({
					title: route?.name || "",
					path: `/${pathname}`,
				})
			} else {
				breadcrumbs.push({
					title: route?.name || "",
					path: route?.path || "#",
				})
			}
		} else {
			breadcrumbs.push({
				title: toSentenceCase(pathname) + " " + "Data",
				path: route?.path || "#",
			})
		}
	})

	return {
		breadcrumbs,
	}
}
