import { MenuPermission } from "@/types/auth"
import {
	Bolt,
	ClipboardList,
	CopyCheck,
	LayoutDashboard,
	LineChart,
	LogOut,
	LucideIcon,
	Settings,
	SquareActivity,
	SquareKanbanIcon,
	UserCog2,
} from "lucide-react"

export type RouteType = {
	title: string
	url: string
	icon: LucideIcon
	isActive?: boolean
	items?: {
		title: string
		url: string
	}[]
}

const routes: {
	navMain: RouteType[]
	navSecondary: MenuPermission[]
} = {
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
			icon: SquareKanbanIcon,
		},
		{
			title: "Risk Analysis",
			url: "/risk-analysis",
			icon: LineChart,
		},
		{
			title: "Risk Response",
			url: "/risk-response",
			icon: CopyCheck,
		},
		{
			title: "Risk Monitoring",
			url: "/risk-monitoring",
			icon: SquareActivity,
		},
		{
			title: "Data Report",
			url: "/report-risk",
			icon: ClipboardList,
			items: [
				{
					title: "Report Risk Data Bank",
					url: "/report-risk-data-bank",
				},
				{
					title: "Report Risk By Severity",
					url: "/report-risk-severity",
				},
				{
					title: "Report Risk Monitoring",
					url: "/report-risk-monitoring",
				},
			],
		},
		{
			title: "Data Master",
			url: "/data-master",
			icon: Bolt,
			items: [
				{
					title: "Node Data",
					url: "/data-master-node-data",
				},
				{
					title: "Parameter",
					url: "/data-master-parameter",
				},
				{
					title: "Safeguards Data",
					url: "/data-master-safeguards",
				},
				{
					title: "Setting Matrix",
					url: "/data-master-setting-matrix",
				},
			],
		},
		{
			title: "Management Users",
			url: "/management-users",
			icon: UserCog2,
		},
	],
	navSecondary: [
		{
			name: "Setting Profile",
			path: "/setting-profile",
			order: 1,
			id: 1,
			icon: Settings,
			permissions: [],
			children: [],
		},
		{
			name: "Logout",
			path: "",
			order: 2,
			id: 2,
			permissions: [],
			icon: LogOut,
			children: [],
		},
	],
}

export default routes
