"use client"

import { ChevronRight } from "lucide-react"

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
import { MenuPermission } from "@/types/auth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LucideIcon from "./LucideIcon"

export function NavMain({ items }: { items: MenuPermission[] }) {
	const pathname = usePathname()
	// const params = useLOC();

	return (
		<SidebarGroup className="backdrop-filter backdrop-blur-sm bg-opacity-20 bg-white rounded-xl">
			<SidebarMenu>
				{items.map((item) => {
					return (
						<Collapsible
							key={item.name}
							asChild
							defaultOpen={pathname.includes(item.path)}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								{item.children?.length ? (
									<>
										<CollapsibleTrigger
											className="focus:active:shadow-md focus:active:text-primary hover:text-primary group-data-[state=open]/collapsible:focus:hover:text-primary active:focus:shadow-neutral-500 h-12 text-primary-100"
											asChild
										>
											<SidebarMenuButton
												tooltip={item.name}
											>
												<LucideIcon
													iconName={item.icon}
													className="!size-6 mr-2"
												/>
												<span>{item.name}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 " />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.children?.map(
													(subItem) => (
														<SidebarMenuSubItem
															key={subItem.name}
														>
															<SidebarMenuSubButton
																asChild
																className={cn(
																	"hover:text-primary h-12 text-primary-100 active:text-primary-100",
																	{
																		"text-primary":
																			pathname.includes(
																				subItem.path
																			),
																		"bg-white":
																			pathname.includes(
																				subItem.path
																			),
																	}
																)}
															>
																<Link
																	href={
																		subItem.path
																	}
																>
																	<span>
																		{
																			subItem.name
																		}
																	</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													)
												)}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : (
									<SidebarMenuButton
										className={cn(
											"h-12 hover:text-primary active:shadow-md active:text-primary text-primary-100 active:shadow-neutral-500",
											{
												"text-primary":
													pathname.includes(
														item.path
													),
												"bg-white": pathname.includes(
													item.path
												),
											}
										)}
										asChild
										tooltip={item.name}
									>
										<Link href={item.path}>
											<LucideIcon
												iconName={item.icon}
												className="!size-6 mr-2"
											/>
											<span>{item.name}</span>
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
