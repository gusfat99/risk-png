import { ResponseApiType } from "@/helpers/ApiHelper"
import { User } from "./user"

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
	login: (credential : Credential) => Promise<ResponseApiType<User>>
	getToken: () => string | null
	logout: () => void
	setUser : (user : User) => void
	setYear : (year : string) => void
}
