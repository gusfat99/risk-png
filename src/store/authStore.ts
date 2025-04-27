import { AUTH_EP } from "@/constants/endpoints"
import { postData, ResponseApiType } from "@/helpers/ApiHelper"
import { AuthState, Credential } from "@/types/auth"
import { User } from "@/types/user"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			loading: false,
			message: "",
			errors: "",
			token: null,
			year_selected: new Date().getFullYear().toString(),
			login: async (credential: Credential) => {
				set({
					loading: true,
				})
				return new Promise<ResponseApiType<User>>((resolve, reject) => {
					postData<User>(AUTH_EP, credential)
						.then((data) => {
							set({
								user: data.data,
								message: data.message,
								token: data.data?.token,
							})
							resolve(data)
						})
						.catch((err) => {
							reject(err)
						})
						.finally(() => {
							set({ loading: false })
						})
				})
			},
			logout: () => set({ user: null }),
			setUser(user) {
				set({
					user,
				})
			},
			setYear : (year : string) => set({year_selected : year})
		}),
		{ name: "auth" }
	)
)

export default useAuthStore
