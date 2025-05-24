import { MENU_EP, ROLE_PERMISSION_EP } from "@/constants/endpoints"
import {
   getDataApi,
   postData,
   ResponseApiType
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"
import { ConfigAclMenuState, Menu, MenuForm, Role, RoleAclMenuForm } from "@/types/configAclMenu"
import { createStore, runUpdater } from "./store"

const initialState = {
   ...commonInitualState,
   menuItems: [],
   rolePermissionItems: [],
}

const useConfigAclMenu = createStore<ConfigAclMenuState>("acl-menu", (set, get) => ({
   ...initialState,
   actions: {
      fetchMenu: async () => {
         set({
            isFetching: true,
         })
         return new Promise<ResponseApiType<Menu[]>>((resolve, reject) => {
            getDataApi<Menu[]>(MENU_EP, {
               page: get().pagination_tanstack.pageIndex,
               per_page: get().pagination_tanstack.pageSize,
               search: get().querySearch || undefined
            })
               .then((data) => {
                  set({
                     menuItems: data.data || [],
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
         })
      },
      fetchRole: async () => {
         set({
            isFetching: true,
         })
         return new Promise<ResponseApiType<Role[]>>((resolve, reject) => {
            getDataApi<Role[]>(ROLE_PERMISSION_EP, {
               page: get().pagination_tanstack.pageIndex,
               per_page: get().pagination_tanstack.pageSize,
               search: get().querySearch || undefined
            })
               .then((data) => {
                  set({
                     rolePermissionItems: data.data || [],
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
         })
      },
      createMenu: async (payload: MenuForm) => {
         set({
            isSubmit: true,
         })
         return new Promise<ResponseApiType<Menu>>((resolve, reject) => {
            postData<Menu>(MENU_EP, payload)
               .then((data) => {
                  set((state) => {
                     return {
                        menuItems: [
                           ...state.menuItems,
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
      updateMenu: async (id: any, payload: MenuForm) => {
         set({
            isSubmit: true,
         })
         return new Promise<ResponseApiType<Menu>>((resolve, reject) => {
            postData<Menu>(`${MENU_EP}/${id}`, payload)
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
      updateRolePemissions: async (id: any, payload: RoleAclMenuForm) => {
         set({
            isSubmit: true,
         })
         return new Promise<ResponseApiType<Role>>((resolve, reject) => {
            postData<Role>(ROLE_PERMISSION_EP + "/" + id, payload)
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
      createRolePemissionsRolePemissions: async (payload: RoleAclMenuForm) => {
         set({
            isSubmit: true,
         })
         return new Promise<ResponseApiType<Role>>((resolve, reject) => {
            postData<Role>(ROLE_PERMISSION_EP, payload)
               .then((data) => {
                  set((state) => {
                     return {
                        rolePermissionItems: [
                           ...state.rolePermissionItems,
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
      // deleteData: async (id) => {
      // 	set({
      // 		isFetchingDelete : true
      // 	})
      // 	return new Promise<ResponseApiType<null>>((resolve, reject) => {
      // 		deleteData<null>(NODE_EP + "/" + id)
      // 			.then((data) => {
      // 				const filterData = get().nodeItems.filter(
      // 					(x) => x.id?.toString() !== id.toString()
      // 				)
      // 				set({
      // 					nodeItems: filterData,
      // 				})
      // 				resolve(data)
      // 			})
      // 			.catch((err) => {
      // 				toast({
      // 					title: "ERROR",
      // 					description: err.message,
      // 					variant: "destructive",
      // 				})
      // 				reject(err)
      // 			})
      // 			.finally(() => {
      // 				set({
      // 					isFetchingDelete : false
      // 				})
      // 			})
      // 	})
      // },
      // setPagination: (updater) =>
      // 	set((state) => ({
      // 		pagination_tanstack: runUpdater(
      // 			updater,
      // 			state.pagination_tanstack
      // 		),
      // 	})),
      setQuerySearch: (value: string) =>
         set(() => ({
            querySearch: value,
         })),
      setPagination: (updater) =>
         set((state) => ({
            pagination_tanstack: runUpdater(
               updater,
               state.pagination_tanstack
            ),
         })),
      // setPagination : ()
   },
}))

export default useConfigAclMenu
