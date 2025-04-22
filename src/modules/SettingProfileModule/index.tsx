"use client"
import { Card, CardContent } from "@/components/ui/card"

import { useState } from "react"
import ChangePasswordForm from "./ChangePasswordForm"
import NavSettingProfile, { KeyType } from "./NavSettingProfile"
import PersonalInfoForm from "./PersonalInforForm"
import useAuthStore from "@/store/authStore"

const SettingProfileModule = () => {
	const [navActive, setNavActive] = useState<KeyType>("personal-information")
	const { user } = useAuthStore()
	return (
		<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
			<Card>
				<CardContent>
					<NavSettingProfile
						navActive={navActive}
						onClick={(nav) => {
							setNavActive(nav)
						}}
					/>
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardContent>
					{navActive === "personal-information"  && user && (
						<PersonalInfoForm />
					)}
					{navActive === "personal-information"  && !user && (
						<PersonalInfoForm.Skeleton />
					)}
					{navActive === "change-password" && <ChangePasswordForm />}
				</CardContent>
			</Card>
		</div>
	)
}

export default SettingProfileModule
