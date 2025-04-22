import { z } from "zod"
import { CommonState } from "./common"
import {
	ChangePasswordSchema,
	PersonalInfoSchema,
	UserManagementSchema,
} from "@/schemas/UserManagementSchema"
import { ResponseApiType } from "@/helpers/ApiHelper"
import { PaginationState, Updater } from "@tanstack/react-table"

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

export interface UserState extends CommonState {
	userItems: User[]
	userSelected: User | null
	userRoleItems: UserRole[]
	actions: {
		fetchAllData(): Promise<ResponseApiType<User[]>>
		fetchUserRoleData(): Promise<ResponseApiType<UserRole[]>>
		fetchSingleData?(): Promise<ResponseApiType<User>>
		createData?(paylaod: UserManagementForm): Promise<ResponseApiType<User>>
		updateData?(id: any, paylaod: any): Promise<ResponseApiType<User>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		setPagination?: (updater: Updater<PaginationState>) => void
		setQuerySearch?: (value: string) => void
		setUserSelected?: (id: any) => void
		updateMyPersonalInfo?: (
			value: PersonalInfoForm
		) => Promise<ResponseApiType<PersonalInfoForm>>
		changePassword?: (
			value: ChangePasswordForm
		) => void
	}
}

export type UserManagementForm = z.infer<typeof UserManagementSchema>
export type PersonalInfoForm = z.infer<typeof PersonalInfoSchema>
export type ChangePasswordForm = z.infer<typeof ChangePasswordSchema>
