"use server"

import { cookies } from "next/headers"

// import { User } from "@/types/models/Auth"
export async function setIsLoggedIn() {
	;(await cookies()).set({
		name: "hasLoggedin",
		value: "true",
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	})
}

export async function destroyIsLoggedIn() {
	;(await cookies()).delete("hasLoggedin")
}
