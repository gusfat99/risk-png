"use client"
import { Card, CardContent } from "@/components/ui/card"

import PersonalInfoForm from "./PersonalInforForm"
import NavSettingProfile, { KeyType } from "./NavSettingProfile"
import { useState } from "react"
import ChangePasswordForm from "./ChangePasswordForm"

const SettingProfileModule = () => {
	const [navActive, setNavActive] = useState<KeyType>("personal-information")

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
					{navActive === "personal-information" && (
						<PersonalInfoForm />
					)}
					{navActive === "change-password" && <ChangePasswordForm />}
				</CardContent>
			</Card>
		</div>
	)
}

export default SettingProfileModule
