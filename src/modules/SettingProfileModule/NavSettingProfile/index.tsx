import { cn } from "@/lib/utils"
import { Lock, User } from "lucide-react"
import React from "react"

interface IProps {
	navActive: string
	onClick?: (key: KeyType) => void
}

export type KeyType = "personal-information" | "change-password"

export type NavSettingProfileType = {
   name: string
   icon: React.FC<React.SVGProps<SVGSVGElement>>
   key: KeyType
}

const NavSettingProfile: React.FC<IProps> = ({ navActive, onClick }) => {
	const navData : NavSettingProfileType[]= [
		{
			name: "Personal Information",
			icon: User,
			key: "personal-information",
		},
		{
			name: "Change Password",
			icon: Lock,
			key: "change-password",
		},
	]
	return (
		<div className="flex flex-col">
			{navData.map((item, idx) => {
				const Icon = item.icon
				return (
					<button
						key={idx}
						onClick={() => {
							onClick && onClick(item.key)
						}}
						className={cn(
							`flex flex-row gap-2 items-center px-6 py-4 rounded-lg `,
							{
								"text-primary": navActive === item.key,
								"text-gray-500": navActive !== item.key,
								"bg-primary/10": navActive === item.key,
								"font-semibold": navActive === item.key,
								"hover:text-primary": navActive !== item.key,
							}
						)}
					>
						<Icon className="w-6 h-6" />
						<span className="text-sm">{item.name}</span>
					</button>
				)
			})}
		</div>
	)
}

export default NavSettingProfile
