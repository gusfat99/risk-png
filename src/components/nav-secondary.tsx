"use client"

import { LogOut, Settings } from "lucide-react"

import { DropdownMenu } from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { destroyIsLoggedIn } from "@/services/cookies"
import useAuthStore from "@/store/authStore"
import { MenuPermission } from "@/types/auth"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import AlertConfirmDialog from "./AlertConfirmDialog"

export function NavSecondary({ items }: { items: MenuPermission[] }) {
	const { isMobile } = useSidebar()
	const [isOpenDialog, setIsOpenDialog] = useState(false)
	const router = useRouter()
	const pathname = usePathname()

	const handleLogout = (action: string) => {
		if (action === "confirm") {
			destroyIsLoggedIn().then(() => {
				router.replace("/login")
				useAuthStore.getState().logout()
				useAuthStore.persist.clearStorage()
				setIsOpenDialog(false)
			})
		} else {
			setIsOpenDialog(false)
		}
	}

	return (
		<SidebarMenu className="px-5">
			<SidebarMenuItem>
				{items.map((route) => {
					return route.name.includes("Logout") ? (
						<DropdownMenu key={route.name}>
							<SidebarMenuButton
								size="lg"
								className={cn(
									"data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-primary text-primary-100 !gap-4"
								)}
								onClick={() => {
									setIsOpenDialog(true)
								}}
							>
								<LogOut className="!size-6" />
								<span className="truncate font-normal">
									Logout
								</span>
							</SidebarMenuButton>
						</DropdownMenu>
					) : (
						<Link href={route.path} key={route.name}>
							<SidebarMenuButton
								size="lg"
								className={cn(
									"data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-primary-100 hover:text-primary !gap-4",
									{
										"text-primary": pathname.includes(
											route.path
										),
										"bg-white": pathname.includes(
											route.path
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
			<AlertConfirmDialog
				open={isOpenDialog}
				title="Confirm"
				description="Are you sure want to logout?"
				onAction={handleLogout}
			/>
		</SidebarMenu>
	)
}
