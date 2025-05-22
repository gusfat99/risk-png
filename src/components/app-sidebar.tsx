"use client"

import * as React from "react"

import BgCity from "@/assets/images/background-city.png"
import LogoMainWhite from "@/assets/images/logomain-white.svg"
import { NavMain } from "@/components/nav-main"
// import { NavSocond } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import routes from "@/data/routes"
import Image from "next/image"
import { NavSecondary } from "./nav-secondary"
import useAuthStore from "@/store/authStore"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { menus } = useAuthStore()
	
	return (
		<Sidebar variant="inset" {...props}>
			<>
				<Image
					src={BgCity}
					alt="bg-city"
					width={180}
					height={1200}
					className="w-full h-full absolute left-0 top-0 -inset-0 z-0 object-cover"
					draggable={false}
				/>
				<SidebarHeader className="py-6">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								className="hover:bg-transparent focus:bg-transparent active:bg-transparent"
								size="lg"
								asChild
							>
								<div className="w-full h-[68px] ">
									<Image
										src={LogoMainWhite}
										alt={
											process.env.NEXT_PUBLIC_APP_NAME ||
											"MAIN LOGO"
										}
										width={157}
										height={58}
										className="h-full m-auto"
										draggable={false}
									/>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent className="px-5">
					<NavMain items={menus} />
				</SidebarContent>
				<SidebarFooter>
					<NavSecondary items={routes.navSecondary} />
				</SidebarFooter>
			</>
		</Sidebar>
	)
}
