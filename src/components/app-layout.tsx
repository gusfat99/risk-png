"use client"
import AppHeader from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import routes from "@/data/routes"
import { usePathname } from "next/navigation"
import React, { useMemo } from "react"

interface IProps {
	children: React.ReactNode
}

export default function AppLayout({ children }: IProps) {
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

	const lengthPathname = pathname.split("/").length

	return (
		<>
			<AppSidebar />
			<SidebarInset className="p-5">
				<AppHeader />
				{lengthPathname <= 2 && (
					<div className="rounded-md bg-primary p-4 flex text-white mt-2">
						{Icon && <Icon />} <span className="ml-2">{route?.title}</span>
					</div>
				)}
				<div className="flex flex-1 flex-col gap-4 p-4 shadow-lg rounded-lg mt-3">
					{lengthPathname > 2 && (
						<div className="rounded-md bg-primary p-4 flex text-white mt-2">
							{Icon && <Icon />}  <span className="ml-2">{route?.title}</span>
						</div>
					)}
					{children}
				</div>
			</SidebarInset>
		</>
	)
}
