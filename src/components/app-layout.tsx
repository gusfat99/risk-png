"use client"
import AppHeader from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import useGetTitleRoute from "@/hooks/use-title-route"
import React from "react"

interface IProps {
	children: React.ReactNode
}

export default function AppLayout({ children }: IProps) {
	const {
		length_pathname: lengthPathname,
		icon: Icon,
		title
	} = useGetTitleRoute();

	return (
		<>
			<AppSidebar />
			<SidebarInset className="p-5">
				<AppHeader />
				{lengthPathname <= 2 && (
					<div className="rounded-md bg-primary p-4 flex text-white mt-2">
						{Icon && <Icon />} <span className="ml-2">{title}</span>
					</div>
				)}
				<div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg mt-3">
					{lengthPathname > 2 && (
						<div className="rounded-md bg-primary p-4 flex text-white mt-2">
							{Icon && <Icon />}  <span className="ml-2">{title}</span>
						</div>
					)}
					{children}
				</div>
			</SidebarInset>
		</>
	)
}
