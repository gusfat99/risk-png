import AppHeader from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import React from "react"

interface IProps {
	children: React.ReactNode
}

export default function AppLayout({ children }: IProps) {
	return (
		<>
			<AppSidebar />
			<SidebarInset className="p-5">
				<AppHeader />
				<div className="flex flex-1 flex-col gap-4 p-4 shadow-lg rounded-lg mt-3">
					{children}
				</div>
			</SidebarInset>
		</>
	)
}
