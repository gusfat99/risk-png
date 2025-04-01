"use client"
import routes from "@/data/routes"
import { toSentenceCase } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export const useRouteGetTitle = () => {
	const pathname = usePathname()

	const route = useMemo(() => {
		let routeAvailable = routes.navMain.find((x) => {
			if ((x.items || [])?.length > 0) {
				return x.items?.some((y) => pathname.includes(y.url))
			} else {
				return pathname.includes(x.url)
			}
		})
		if (!routeAvailable) {
			routeAvailable = routes.navSecondary.find((x) => {
				if ((x.items || [])?.length > 0) {
					return x.items?.some((y) => pathname.includes(y.url))
				} else {
					return pathname.includes(x.url)
				}
			})
		}
		return routeAvailable
	}, [pathname])

	const Icon = route?.icon
	let title = route?.title ?? ""
	let subtitle = route?.title ?? ""
	const pathNameArr = pathname.split("/")
	const lengthPathname = pathNameArr.length

	if (route?.items?.length && route.items.length > 0) {
		if (lengthPathname > 2) {
			title = toSentenceCase(pathNameArr[2])
			title +=
				" " +
				(route.items.find((r) => pathname.includes(r.url))?.title ?? "")
		} else {
			title =
				route.items.find((r) => pathname.includes(r.url))?.title ?? ""
		}
		subtitle +=
			" - " + route.items.find((r) => pathname.includes(r.url))?.title ||
			""
	} else {
		if (lengthPathname > 2) {
			title = toSentenceCase(pathNameArr[2])
			title += " " + route?.title
		}
	}
	return {
		icon: Icon,
		title,
		subtitle,
		length_pathname: lengthPathname,
	}
}

export const useRouteNavigate = () => {
	const pathname = usePathname()

	const route = useMemo(() => {
		let availableRoute = routes.navMain.find((x) => {
			if ((x.items || [])?.length > 0) {
				return x.items?.some((y) => pathname.includes(y.url))
			} else {
				return pathname.includes(x.url)
			}
		})
		if (!availableRoute) {
			availableRoute = routes.navSecondary.find((x) => {
				if ((x.items || [])?.length > 0) {
					return x.items?.some((y) => pathname.includes(y.url))
				} else {
					return pathname.includes(x.url)
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
			breadcrumbs.push({
				title: route?.title || "",
				path: route?.url || "#",
			})
		} else {
			breadcrumbs.push({
				title: toSentenceCase(pathname) + " " + "Data",
				path: route?.url || "#",
			})
		}
	})

	return {
		breadcrumbs,
	}
}
