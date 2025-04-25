import { SAFEGUARD_EP } from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { SafeguardSchema } from "@/schemas/SafeguardSchema"
import { commonInitualState } from "@/types/common"
import { Safeguard, SafeguardState } from "@/types/safeguard"
import { z } from "zod"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	safeguardItems: [],
	safeguardSelected: null,
}

const useSafeguardStore = createStore<SafeguardState>(
	"safeguard-data",
	(set, get) => ({
		...initialState,
		actions: {
			fetchAllData: async () => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<Safeguard[]>>(
					(resolve, reject) => {
						getDataApi<Safeguard[]>(SAFEGUARD_EP, {
							page: get().pagination_tanstack.pageIndex,
							per_page: get().pagination_tanstack.pageSize,
							search : get().querySearch || undefined
						})
							.then((data) => {
								set({
									safeguardItems: data.data || [],
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
			fetchSingleData: async (safeguardId) => {
				set({
					isFetching: true,
				})
				return new Promise<ResponseApiType<Safeguard>>(
					(resolve, reject) => {
						getDataApi<Safeguard>(`${SAFEGUARD_EP}/${safeguardId}`)
							.then((data) => {
								set({
									safeguardSelected: data.data,
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
			createData: async (payload: z.infer<typeof SafeguardSchema>) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<Safeguard>>(
					(resolve, reject) => {
						const formData = new FormData()
						Object.entries(payload).forEach(([key, value]) => {
							formData.append(key, value)
						})
						postData<Safeguard>(SAFEGUARD_EP, formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						})
							.then((data) => {
								set((state) => {
									return {
										safeguardItems: [
											...state.safeguardItems,
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
					}
				)
			},
			updateData: async (
				id: any,
				payload: z.infer<typeof SafeguardSchema>
			) => {
				set({
					isSubmit: true,
				})
				return new Promise<ResponseApiType<Safeguard>>(
					(resolve, reject) => {
						const formData = new FormData()
						Object.entries(payload).forEach(([key, value]) => {
							formData.append(key, value)
						})
						postData<Safeguard>(`${SAFEGUARD_EP}/${id}`, formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						})
							.then((data) => {
								set((state) => {
									return {
										safeguardItems: [
											...state.safeguardItems,
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
					}
				)
			},
			deleteData: async (id) => {
				set({
					isFetchingDelete : true
				})
				return new Promise<ResponseApiType<null>>((resolve, reject) => {
					deleteData<null>(SAFEGUARD_EP + "/" + id)
						.then((data) => {
							const filterData = get().safeguardItems.filter(
								(x) => x.id?.toString() !== id.toString()
							)
							set({
								safeguardItems: filterData,
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
								isFetchingDelete : false
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
			setQuerySearch: (value: string) =>
				set(() => ({
					querySearch: value,
				})),
			// setPagination : ()
		},
	})
)

export default useSafeguardStore
