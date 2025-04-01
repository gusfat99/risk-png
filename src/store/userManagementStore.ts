import { MANAGEMENT_USER_EP, PERSONAL_INFO_EP } from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	putData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"
import {
	PersonalInfoForm,
	User,
	UserManagementForm,
	UserRole,
	UserState,
} from "@/types/user"
import { createStore, runUpdater } from "./store"

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
			fetcUserRoleData: async () => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<UserRole[]>>(
					(resolve, reject) => {
						getDataApi<UserRole[]>(`${MANAGEMENT_USER_EP}/role`, {
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
					putData<User>(`${MANAGEMENT_USER_EP}/${id}`, payload)
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
			updateMyPersonalInfo: async (payload: PersonalInfoForm) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<User>>((resolve, reject) => {
					const formData = new FormData();
					formData.append("name", payload.name)
					formData.append("email", payload.email)
					if (payload.profile_picture) {
						formData.append("profile_picture", payload.profile_picture)
					}
					postData<User>(`${PERSONAL_INFO_EP}`, formData)
						.then((data) => {
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
			// setPagination : ()
		},
	})
)

export default useUserManagementStore
