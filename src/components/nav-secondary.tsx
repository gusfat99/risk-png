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
import { destroyIsLoggedIn } from "@/services/cookies"
import { useRouter } from "next/navigation"

export function NavSecondary() {
	const { isMobile } = useSidebar()
	const router = useRouter();

	return (
		<SidebarMenu className="px-5">
			<SidebarMenuItem>
				<DropdownMenu>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-primary-100 hover:text-primary !gap-4"
					>
						<Settings className="!size-6" />
						<span className="truncate font-normal">Setting</span>
					</SidebarMenuButton>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-primary text-primary-100 !gap-4"
						onClick={() => { 
							destroyIsLoggedIn().then(() => {
								router.replace("/login");
							})
						}}
					>
						<LogOut className="!size-6"  />
						<span className="truncate font-normal">Logout</span>
					</SidebarMenuButton>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
