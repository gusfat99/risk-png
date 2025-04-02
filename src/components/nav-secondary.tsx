"use client"

import { LogOut, Settings } from "lucide-react"

import { DropdownMenu } from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { destroyIsLoggedIn } from "@/services/cookies"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { RouteType } from "@/data/routes"
import { cn } from "@/lib/utils"

export function NavSecondary({ items }: { items: RouteType[] }) {
	const { isMobile } = useSidebar()
	const router = useRouter()
	const pathname = usePathname()

	return (
		<SidebarMenu className="px-5">
			<SidebarMenuItem>
				{items.map((route) => {
					return route.title.includes("Logout") ? (
						<DropdownMenu key={route.title}>
							<SidebarMenuButton
								size="lg"
								className={cn(
									"data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-primary text-primary-100 !gap-4"
									
								)}
								onClick={() => {
									destroyIsLoggedIn().then(() => {
										router.replace("/login")
									})
								}}
							>
								<LogOut className="!size-6" />
								<span className="truncate font-normal">
									Logout
								</span>
							</SidebarMenuButton>
						</DropdownMenu>
					) : (
						<Link href={route.url} key={route.title}>
							<SidebarMenuButton
								size="lg"
								className={cn(
									"data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-primary-100 hover:text-primary !gap-4",
									{
										"text-primary": pathname.includes(
											route.url
										),
										"bg-white": pathname.includes(
											route.url
										),
									}
								)}
							>
								<Settings className="!size-6" />
								<span className="truncate font-normal">
									Setting Profile
								</span>
							</SidebarMenuButton>
						</Link>
					)
				})}
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
