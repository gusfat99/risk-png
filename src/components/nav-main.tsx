"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
	items,
}: {
	items: {
		title: string
		url: string
		icon: LucideIcon
		isActive?: boolean
		items?: {
			title: string
			url: string
		}[]
	}[]
}) {
	return (
		<SidebarGroup className="backdrop-filter backdrop-blur-sm bg-opacity-20 bg-white rounded-xl">
			{/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							{item.items?.length ? (
								<>
									<CollapsibleTrigger
										className="focus:active:shadow-md focus:active:text-primary hover:text-primary group-data-[state=open]/collapsible:focus:hover:text-primary active:focus:shadow-neutral-500 h-12"
										asChild
									>
										<SidebarMenuButton tooltip={item.title}>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem
													key={subItem.title}
												>
													<SidebarMenuSubButton
														asChild
														className="hover:text-primary"
													>
														<a href={subItem.url}>
															<span>
																{subItem.title}
															</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</>
							) : (
								<SidebarMenuButton
									className="h-12 hover:text-primary active:shadow-md active:text-primary text-primary-100 active:shadow-neutral-500"
									asChild
									tooltip={item.title}
								>
									<a href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
