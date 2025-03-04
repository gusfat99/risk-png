import {
	Bolt,
	ClipboardList,
	CopyCheck,
	LayoutDashboard,
	LineChart,
	SquareActivity,
	SquareKanbanIcon,
	UserCog2,
} from "lucide-react"

const routes = {
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
			url: "/report-reisk",
			icon: ClipboardList,
			items: [
				{
					title: "Report Risk Data Bank",
					url: "/report-risk-data-bank",
				},
				{
					title: "Report Risk By Severity",
					url: "/report-reisk-saverity",
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
	navSecondary: [],
	projects: [],
}

export default routes;
