import {
	CHANGE_PWD_EP,
	MANAGEMENT_USER_EP,
	MANAGEMENT_USER_ROLE_EP,
	PERSONAL_INFO_EP,
} from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"
import {
	ChangePasswordForm,
	PersonalInfoForm,
	User,
	UserManagementForm,
	UserRole,
	UserState,
} from "@/types/user"
import { createStore, runUpdater } from "./store"
import useAuthStore from "./authStore"

const initialState = {
	...commonInitualState,
	userItems: [],
	userRoleItems: [],
	userSelected: null,
}

const useUserManagementStore = createStore<UserState>(
	"user-management",
	(set, get) => ({
		...initialState,
		actions: {
			fetchAllData: async () => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<User[]>>(
					(resolve, reject) => {
						getDataApi<User[]>(MANAGEMENT_USER_EP, {
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
							search: get().querySearch || undefined,
						})
							.then((data) => {
								set({
									userItems: data.data || [],
									meta: data?.meta,
								})
								resolve(data)
							})
							.catch((err) => {
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
								reject(err)
							})
							.finally(() => {
								set({
									isFetching: false,
								})
							})
					}
				)
			},
			fetchUserRoleData: async () => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<UserRole[]>>(
					(resolve, reject) => {
						getDataApi<UserRole[]>(`${MANAGEMENT_USER_ROLE_EP}`, {
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
						})
							.then((data) => {
								set({
									userRoleItems: data.data || [],
									meta: data?.meta,
								})
								resolve(data)
							})
							.catch((err) => {
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
								reject(err)
							})
							.finally(() => {
								set({
									isFetching: false,
								})
							})
					}
				)
			},
			createData: async (payload: UserManagementForm) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<User>>((resolve, reject) => {
					postData<User>(MANAGEMENT_USER_EP, payload)
						.then((data) => {
							set((state) => {
								return {
									userItems: [
										...state.userItems,
										...(data.data ? [data.data] : []),
									],
								}
							})
							resolve(data)
						})
						.catch((err) => {
							reject(err)
						})
						.finally(() => {
							set({
								isSubmit: false,
							})
						})
				})
			},
			updateData: async (id: any, payload: UserManagementForm) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<User>>((resolve, reject) => {
					postData<User>(`${MANAGEMENT_USER_EP}/${id}`, payload)
						.then((data) => {
							set((state) => {
								return {
									userItems: [
										...state.userItems,
										...(data.data ? [data.data] : []),
									],
								}
							})
							resolve(data)
						})
						.catch((err) => {
							reject(err)
						})
						.finally(() => {
							set({
								isSubmit: false,
							})
						})
				})
			},
			deleteData: async (id) => {
				return new Promise<ResponseApiType<null>>((resolve, reject) => {
					deleteData<null>(MANAGEMENT_USER_EP + "/" + id)
						.then((data) => {
							const filterData = get().userItems.filter(
								(x) => x.id?.toString() !== id.toString()
							)
							set({
								userItems: filterData,
							})
							resolve(data)
						})
						.catch((err) => {
							toast({
								title: "ERROR",
								description: err.message,
								variant: "destructive",
							})
							reject(err)
						})
						.finally(() => {
							set({
								isFetching: false,
							})
						})
				})
			},
			setPagination: (updater) =>
				set((state) => ({
					pagination_tanstack: runUpdater(
						updater,
						state.pagination_tanstack
					),
				})),
			setUserSelected: (id: any) => {
				console.log({ id })
				const user = get().userItems.find(
					(x) => x.id.toString() === id.toString()
				)
				if (user) {
					set({
						userSelected: user,
					})
				}
			},
			setQuerySearch: (value: string) =>
				set(() => ({
					querySearch: value,
				})),
			updateMyPersonalInfo: async (payload: PersonalInfoForm) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<User>>((resolve, reject) => {
					const formData = new FormData()
					formData.append("name", payload.name)
					formData.append("email", payload.email)
				
					if (payload.profile_picture) {
						formData.append(
							"profile_picture",
							payload.profile_picture
						)
					}
					postData<User>(`${PERSONAL_INFO_EP}`, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
						.then((data) => {
							if (data.data) {
								
								//set new user data to store auth
								useAuthStore.getState().setUser(data.data);
								toast({
									title: "Success",
									description: data.errors,
									variant : "success"
								})
							}
							resolve(data)
						})
						.catch((err) => {
							reject(err)
							toast({
								title: "Failed",
								description: err.message,
							})
						})
						.finally(() => {
							set({
								isSubmit: false,
							})
						})
				})
			},
			changePassword: async (payload: ChangePasswordForm) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<any>>((resolve, reject) => {
					const formData = new FormData()
					formData.append("current_password", payload.current_password)
					formData.append("password", payload.password)
					formData.append("password_confirmation", payload.password_confirmation)
				
					
					postData<User>(`${CHANGE_PWD_EP}`, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
						.then((data) => {
							toast({
								title: "Success",
								description: data.message,
								variant : 'success'
							})
							resolve(data)
						})
						.catch((err) => {
							reject(err)
							toast({
								title: "Failed",
								description: err.message,
							})
						})
						.finally(() => {
							set({
								isSubmit: false,
							})
						})
				})
			},

			// setPagination : ()
		},
	})
)

export default useUserManagementStore
