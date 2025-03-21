"use client"

import { useToast } from "@/hooks/use-toast"
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast"
import { BadgeInfo } from "lucide-react"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { removeSSRSafeUser } from "@/lib/storage"
import { destroyIsLoggedIn } from "@/services/cookies"

export function Toaster() {
	const { toasts } = useToast()
	const router = useRouter()

	return (
		<ToastProvider>
			{toasts.map(function ({
				id,
				title,
				description,
				action,
				isSessionExpired,
				...props
			}) {
				return (
					<Toast key={id} {...props}>
						<div className="grid gap-1">
							{title && (
								<div className="flex gap-1 items-center">
									<BadgeInfo />
									<ToastTitle>{title}</ToastTitle>
								</div>
							)}
							{description && (
								<ToastDescription>
									{description}
								</ToastDescription>
							)}
							{isSessionExpired && (
								<div>
									<Button
										variant={"outline"}
										onClick={() => {
											destroyIsLoggedIn().then(() => {
												removeSSRSafeUser()
												router.replace("/login")
											})
										}}
									>
										Relogin
									</Button>
								</div>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				)
			})}
			<ToastViewport />
		</ToastProvider>
	)
}
