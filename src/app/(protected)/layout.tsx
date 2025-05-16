"use client"
import AlertConfirmDialog from "@/components/AlertConfirmDialog"
import AppLayout from "@/components/app-layout"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TIME_MINUTES_INACTIVITY_APP } from "@/constants"
import useInactivityTimer from "@/hooks/use-inactivity-timer"
import { destroyIsLoggedIn } from "@/services/cookies"
import useAuthStore from "@/store/authStore"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [isOpenAlertInactivity, setIsOpenAlertInactivity] =
		React.useState(false)
	const {
		actions: { fetchOptionsLikelyhood, fetchOptionsSeverityMap },
	} = useSettingMatrixStore()
	const router = useRouter()

	useInactivityTimer(() => {
		setIsOpenAlertInactivity(true)
	}, TIME_MINUTES_INACTIVITY_APP)

	const handleLogout = (action: string) => {
		destroyIsLoggedIn().then(() => {
			router.replace("/login")
			useAuthStore.getState().logout()
			useAuthStore.persist.clearStorage()
			setIsOpenAlertInactivity(false)
		})
	}

	useEffect(() => {
		fetchOptionsLikelyhood()
		fetchOptionsSeverityMap()
	}, [fetchOptionsLikelyhood, fetchOptionsSeverityMap])

	return (
		<SidebarProvider>
			<AppLayout>{children}</AppLayout>
			<AlertConfirmDialog
				open={isOpenAlertInactivity}
				title="Warning!"
				description="Your session is about to expire due to inactivity. You will be automatically logged out"
				onAction={handleLogout}
				confirmLabel="OK"
				showDenyButton={false}
			/>
		</SidebarProvider>
	)
}
