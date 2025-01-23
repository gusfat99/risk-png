import AppLayout from "@/components/app-layout"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider>
			<AppLayout>{children}</AppLayout>
		</SidebarProvider>
	)
}
