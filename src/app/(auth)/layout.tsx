import Image from "next/image"
import React from "react"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex items-center justify-items-center w-full h-screen font-[family-name:var(--font-poppins)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full h-full">
				<Image
					src="/background/background-login.jpg"
					alt="bg-login-risk-pertamina-gas"
					width={1440}
					loading="lazy"
					height={840}
					className="absolute inset-0 w-full h-full object-cover"
				/>
				{/* <!-- Overlay Gradien --> */}
				<div className="absolute inset-0 bg-gradient-to-r from-destructive-500/70 to-primary/70" />
			
					{children}
			</main>
		</div>
	)
}
