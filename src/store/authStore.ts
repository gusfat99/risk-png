import { AUTH_EP } from "@/constants/endpoints"
import { postData, ResponseApiType } from "@/helpers/ApiHelper"
import { decrypt, encrypt } from "@/lib/utils"
import { AuthState, Credential } from "@/types/auth"
import { User, UserAuth } from "@/types/user"
import { create } from "zustand"
import { persist, PersistStorage, StorageValue } from "zustand/middleware"

const storage: PersistStorage<AuthState> = {
	getItem: (name: string): StorageValue<AuthState> | null => {
		if (typeof window === "undefined") return null
		const item = localStorage.getItem(name)
		if (!item) return null
		try {
			if (process.env.NODE_ENV === "production") {
				// Pertama parse sebagai JSON, lalu decrypt hasilnya
				const parsed = JSON.parse(item)
				return decrypt(parsed)
			} else {
				return JSON.parse(item)
			}
		} catch (error) {
			console.error("Failed to decrypt storage item", error)
			return null
		}
	},
	setItem: (name: string, value: StorageValue<AuthState>): void => {
		if (typeof window === "undefined") return
		let item = ""
		if (process.env.NODE_ENV === "production") {
			// Pertama encrypt, lalu stringify hasilnya
			const encrypted = encrypt(value)
			item = JSON.stringify(encrypted)
		} else {
			item = JSON.stringify(value)
		}
		localStorage.setItem(name, item)
	},
	removeItem: (name: string): void => {
		if (typeof window === "undefined") return
		localStorage.removeItem(name)
	},
}

const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			loading: false,
			message: "",
			errors: "",
			token: null,
			year_selected: new Date().getFullYear().toString(),
			menus: [],
			login: async (credential: Credential) => {
				set({
					loading: true,
				})
				return new Promise<ResponseApiType<UserAuth>>((resolve, reject) => {
					postData<UserAuth>(AUTH_EP, credential)
						.then((data) => {
							set({
								user: data.data,
								message: data.message,
								token: data.data?.token,
								menus : data.data?.menus
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
			logout: () => {
				set({ user: null })
			},
			setUser(user) {
				set({
					user,
				})
			},
			getToken: () => get().token ?? "",
			setYear: (year: string) => set({ year_selected: year }),
		}),
		{
			name: "auth",
			storage,
		}
	)
)

export default useAuthStore
