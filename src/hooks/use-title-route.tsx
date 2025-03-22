"use client"
import routes from "@/data/routes"
import { toSentenceCase } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useGetTitleRoute = () => {
	const pathname = usePathname()

	const route = useMemo(
		() =>
			routes.navMain.find((x) => {
				if ((x.items || [])?.length > 0) {
					return x.items?.some((y) => pathname.includes(y.url))
				} else {
					return pathname.includes(x.url)
				}
			}),
		[pathname]
	)

	const Icon = route?.icon
	let title = route?.title ?? ""
	let subtitle = route?.title ?? ""
	const pathNameArr = pathname.split("/")
	const lengthPathname = pathNameArr.length
	if (route?.items?.length && route.items.length > 0) {
		if (lengthPathname > 2) {
			title = toSentenceCase(pathNameArr[2])
			title += " " +(route.items.find((r) => pathname.includes(r.url))?.title ?? "")
		} else {
			title = route.items.find((r) => pathname.includes(r.url))?.title ?? ""
		}
		subtitle +=
			" - " + route.items.find((r) => pathname.includes(r.url))?.title ||
			""
	}
	console.log({ pathname, lengthPathname, split: pathname.split("/") })
	return {
		icon: Icon,
		title,
		subtitle,
		length_pathname: lengthPathname,
	}
}

export default useGetTitleRoute
