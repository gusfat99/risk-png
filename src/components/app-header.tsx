"use client"

import Bell from "@/assets/icons/bell.png"
import AvatarDummy from "@/assets/images/dummy-avatar.png"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { generateYears } from "@/lib/utils"
import useAuthStore from "@/store/authStore"
import Image from "next/image"
import { SidebarTrigger } from "./ui/sidebar"
import Title from "./ui/title"

const AppHeader = () => {
	const { user, year_selected } = useAuthStore()
	return (
		<header className="flex h-16 shrink-0 items-center justify-between gap-2">
			<div className="flex flex-col">
				<Title>Dashboard</Title>
				<div className="flex items-center gap-2">
					<SidebarTrigger className="-ml-1" />
					{/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
					{/* <Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">
									Building Your Application
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Data Fetching</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb> */}
				</div>
			</div>
			<div className="flex gap-2">
				<button className="bg-primary-100 w-10 rounded-md p-2">
					<Image src={Bell} width={82} height={82} alt="bell-notif" />
				</button>
				<Select value={year_selected}>
					
					<SelectTrigger className="w-[98px]">
						<SelectValue placeholder="Tahun" />
					</SelectTrigger>
					<SelectContent>
						{generateYears(2).map((year) => (
							<SelectItem value={year} key={year}>
								{year}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<div className=" gap-4 ml-4 hidden lg:flex">
					<div className="flex flex-col justify-between items-end">
						<span className="font-semibold text-sm">
							{user?.name}
						</span>
						<span className="font-light text-sm">
							{user?.email}
						</span>
					</div>
					<div className=" overflow-hidden rounded-lg">
						<Image
							src={AvatarDummy}
							alt="avatar-pertamina-gas"
							className="overflow-hidden"
							width={38}
							height={38}
						/>
					</div>
				</div>
			</div>
		</header>
	)
}

export default AppHeader
