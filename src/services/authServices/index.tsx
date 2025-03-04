"use client"
import { AUTH_EP } from "@/constants/endpoints"
import { postData } from "@/helpers/ApiHelper"
import { AuthState, Credential } from "@/types/auth"
import { User } from "@/types/user"

export async function loginHandler(
	credential: Credential,
	set: (state: Partial<AuthState>) => void
) {
	
}
