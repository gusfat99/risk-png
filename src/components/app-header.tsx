import Bell from "@/assets/icons/bell.png"
import AvatarDummy from "@/assets/images/dummy-avatar.png"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import Title from "./ui/title"

const AppHeader = () => {
	return (
		<header className="flex h-16 shrink-0 items-center justify-between gap-2">
			<div className="flex flex-col">
				<Title>Dashboard</Title>
				<div className="flex items-center gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
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
					</Breadcrumb>
				</div>
			</div>
			<div className="flex gap-2">
				<button className="bg-primary-100 w-10 rounded-md p-2">
					<Image src={Bell} width={82} height={82} alt="bell-notif" />
				</button>
				<Select>
					<SelectTrigger className="w-[98px]">
						<SelectValue placeholder="Tahun" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="2023">2023</SelectItem>
						<SelectItem value="2024">2024</SelectItem>
						<SelectItem value="2025">2025</SelectItem>
					</SelectContent>
				</Select>
				<div className=" gap-4 ml-4 hidden lg:flex">
					<div className="flex flex-col justify-between items-end">
						<span className="font-semibold text-sm">Frenklyn</span>
						<span className="font-light text-sm">
							frenklyn.87.@gmail.com
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
