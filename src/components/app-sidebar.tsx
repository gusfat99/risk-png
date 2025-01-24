"use client"

import {
	Bolt,
	ClipboardList,
	CopyCheck,
	LayoutDashboard,
	LineChart,
	SquareActivity,
	SquareChartGantt,
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

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: "Risk Data Bank",
			url: "/risk-data-bank",
			icon: SquareChartGantt,
		},
		{
			title: "Risk Analysis",
			url: "/risk-analysis",
			icon: LineChart,
		},
		{
			title: "Response Safeguard",
			url: "/response-safeguard",
			icon: CopyCheck,
		},
		{
			title: "Risk Monitoring",
			url: "/risk-monitoring",
			icon: SquareActivity,
		},
		{
			title: "Data Report",
			url: "#",
			icon: ClipboardList,
			items: [
				{
					title: "Report Risk Data Bank",
					url: "/report-risk-data-bank",
				},
				{
					title: "Report Risk By Severity",
					url: "/report-reisk-saverity",
				},
			],
		},
		{
			title: "Data Master",
			url: "#",
			icon: Bolt,
			items: [
				{
					title: "Node Data",
					url: "/data-master-node-data",
				},
				{
					title: "Safeguards Data",
					url: "/data-master-safeguards-data",
				},
				{
					title: "Setting Matrix",
					url: "/data-master-setting-matrix",
				},
			],
		},
	],
	navSecondary: [],
	projects: [],
}

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
					<NavMain items={data.navMain} />
					{/* <NavProjects projects={data.projects} />
					<NavSecondary
						items={data.navSecondary}
						className="mt-auto"
					/> */}
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={data.user} />
				</SidebarFooter>
			</>
		</Sidebar>
	)
}
