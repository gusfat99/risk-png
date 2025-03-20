'use client'
import routes from '@/data/routes'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const useGetTitleRoute = () => {
   const pathname = usePathname()

	const route = useMemo(
		() =>
			routes.navMain.find((x) => {
				if ((x.items || [])?.length > 0) {
					return x.items?.some((y) => y.url === pathname)
				} else {
					return x.url === pathname
				}
			}),
		[pathname]
	)

	const Icon = route?.icon
	let title = route?.title;
	let subtitle = route?.title;
	const lengthPathname = pathname.split("/").length
	if (route?.items?.length && route.items.length > 0) {
		title = route.items.find(r => r.url === pathname)?.title;
		subtitle += " - "+route.items.find(r => r.url === pathname)?.title || "";
	}
   return {
      icon: Icon,
      title,
      subtitle,
      length_pathname : lengthPathname,
  }
}

export default useGetTitleRoute