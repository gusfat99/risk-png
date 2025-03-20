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
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
	const pathname = usePathname()
	// const params = useLOC();

	return (
		<SidebarGroup className="backdrop-filter backdrop-blur-sm bg-opacity-20 bg-white rounded-xl">
			{/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
			<SidebarMenu>
				{items.map((item) => {
					const Icon = item.icon
					return (
						<Collapsible
							key={item.title}
							asChild
							defaultOpen={pathname.includes(item.url)}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								{item.items?.length ? (
									<>
										<CollapsibleTrigger
											className="focus:active:shadow-md focus:active:text-primary hover:text-primary group-data-[state=open]/collapsible:focus:hover:text-primary active:focus:shadow-neutral-500 h-12 text-primary-100"
											asChild
										>
											<SidebarMenuButton
												tooltip={item.title}
											>
												<Icon className="!size-6 mr-2" />
												<span>{item.title}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 " />
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
															className={cn(
																"hover:text-primary h-12 text-primary-100 active:text-primary-100",
																{
																	"text-primary":
																		pathname.includes(
																			subItem.url
																		),
																	"bg-white":
																		pathname.includes(
																			subItem.url
																		),
																}
															)}
														>
															<Link
																href={
																	subItem.url
																}
															>
																<span>
																	{
																		subItem.title
																	}
																</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : (
									<SidebarMenuButton
										className={cn(
											"h-12 hover:text-primary active:shadow-md active:text-primary text-primary-100 active:shadow-neutral-500",
											{
												"text-primary":
													pathname.includes(item.url),
												"bg-white": pathname.includes(
													item.url
												),
											}
										)}
										asChild
										tooltip={item.title}
									>
										<Link href={item.url}>
											<Icon className="!size-6 mr-2" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								)}
							</SidebarMenuItem>
						</Collapsible>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}
