import { ResponseApiType } from "@/helpers/ApiHelper"
import { User, UserAuth } from "./user"

export interface Credential {
	email: string
	password: string
	"g-recaptcha-response": string
}

export interface AuthState {
	user: User | null
	loading: boolean
	message: string
	errors: string
	token: string | null
	year_selected: string
	login: (credential: Credential) => Promise<ResponseApiType<UserAuth>>
	getToken: () => string | null
	logout: () => void
	setUser: (user: User) => void
	setYear: (year: string) => void
	menus: MenuPermission[]
}

export interface MenuPermission {
	"id": number
	"name": string
	"path": string
	"icon": any | null
	"order": number
	"children": MenuPermission[]
	"permissions": Array<string>
}
