"use client"

import {
	LogOut,
	Settings
} from "lucide-react"

import {
	DropdownMenu
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
	user,
}: {
	user: {
		name: string
		email: string
		avatar: string
	}
}) {
	const { isMobile } = useSidebar()

	return (
		<SidebarMenu className="px-5">
			<SidebarMenuItem>
				<DropdownMenu>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-primary"
					>
						<Settings />
						<span className="truncate font-normal">Setting</span>
					</SidebarMenuButton>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-primary"
					>
						<LogOut />
						<span className="truncate font-normal">Logout</span>
					</SidebarMenuButton>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
