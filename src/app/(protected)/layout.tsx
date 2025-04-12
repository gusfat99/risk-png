"use client"
import AppLayout from "@/components/app-layout"
import { SidebarProvider } from "@/components/ui/sidebar"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import React, { useEffect } from "react"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const {
		actions: { fetchOptionsLikelyhood, fetchOptionsSeverityMap },
	} = useSettingMatrixStore()

	useEffect(() => {
		fetchOptionsLikelyhood()
		fetchOptionsSeverityMap()
	}, [fetchOptionsLikelyhood, fetchOptionsSeverityMap])

	return (
		<SidebarProvider>
			<AppLayout>{children}</AppLayout>
		</SidebarProvider>
	)
}
