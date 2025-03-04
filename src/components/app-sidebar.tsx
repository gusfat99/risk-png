"use client"

import {
	Bolt,
	ClipboardList,
	CopyCheck,
	LayoutDashboard,
	LineChart,
	SquareActivity,
	SquareKanbanIcon,
	UserCog2
} from "lucide-react"
import * as React from "react"

import BgCity from "@/assets/images/background-city.png"
import PertaminaGas from "@/assets/images/pertamina-gas.png"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import routes from "@/data/routes"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<>
				<Image
					src={BgCity}
					alt="bg-city"
					width={180}
					height={1200}
					className="w-full h-full absolute left-0 top-0 -inset-0 z-0 object-cover"
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
										src={PertaminaGas}
										alt="Pertamina Gas Negara"
										width={190}
										height={80}
										className="h-full m-auto"
									/>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent className="px-5">
					<NavMain items={routes.navMain} />
				</SidebarContent>
				<SidebarFooter>
					<NavUser />
				</SidebarFooter>
			</>
		</Sidebar>
	)
}
