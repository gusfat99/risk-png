export interface UserRole {
	id: number
	name: string
	guard_name: string
	created_at: string
	updated_at: string
}

export interface User {
	id: number
	name: string
	email: string
	email_verified_at: string | null
	role: string
	profile_picture: any
	token: string
	roles: UserRole[]
}
