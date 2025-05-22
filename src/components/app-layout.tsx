"use client"
import AppHeader from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useRouteGetTitle } from "@/hooks/use-route-navigate"
import React from "react"

interface IProps {
	children: React.ReactNode
}

export default function AppLayout({ children }: IProps) {
	const {
		length_pathname: lengthPathname,
		icon: Icon,
		subtitle,
		title,
	} = useRouteGetTitle()

	return (
		<>
			<AppSidebar />
			<SidebarInset className="p-5">
				<AppHeader />
				{(title?.toLowerCase() === "dashboard" || title?.toLowerCase() === "not-found" ||
					subtitle?.toLowerCase()?.includes("setting matrix")) &&
					children}
				{title?.toLowerCase() !== "dashboard" && title?.toLowerCase() !== "not-found" &&
					!subtitle?.toLowerCase()?.includes("setting matrix") && (
						<>
							{lengthPathname <= 2 && (
								<div className="rounded-md w-full bg-primary p-4 flex text-white mt-2">
									{Icon && <Icon />}{" "}
									<span className="ml-2">{title}</span>
								</div>
						)}
						<div className="flex flex-shrink-0" >

							<div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg mt-3 w-full max-w-full overflow-hidden">
								{lengthPathname > 2 && (
								<div className="rounded-md bg-primary p-4 flex w-full
									 text-white mt-2 ">
										{Icon && <Icon />}{" "}
										<span className="ml-2">{title}</span>
									</div>
								)}
								{children}
							</div>
						</div>
						</>
					)}
			</SidebarInset>
		</>
	)
}
