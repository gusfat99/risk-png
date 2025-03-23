import { SAFEGUARD_EP } from "@/constants/endpoints"
import {
   deleteData,
   getDataApi,
   postData,
   putData,
   ResponseApiType,
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

const useSafeguardStore = createStore<SafeguardState>("aafeguard-data", (set, get) => ({
	...initialState,
	actions: {
		fetchAllData: async () => {
			set({
				isFetching: true,
			})
			return new Promise<ResponseApiType<Safeguard[]>>((resolve, reject) => {
				getDataApi<Safeguard[]>(SAFEGUARD_EP, {
					page: get().pagination_tanstack.pageIndex,
					per_page: get().pagination_tanstack.pageSize,
				})
					.then((data) => {
						set({
							safeguardItems: data.data || [],
							meta: data?.meita,
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
		createData: async (payload: z.infer<typeof SafeguardSchema>) => {
			set({
				isSubmit: true,
			})
			return new Promise<ResponseApiType<Safeguard>>((resolve, reject) => {
				postData<Safeguard>(SAFEGUARD_EP, payload)
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
			})
		},
		updateData: async (id: any, payload: z.infer<typeof SafeguardSchema>) => {
			set({
				isSubmit: true,
			})
			return new Promise<ResponseApiType<Safeguard>>((resolve, reject) => {
				putData<Safeguard>(`${SAFEGUARD_EP}/${id}`, payload)
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
			})
		},
		deleteData: async (id) => {
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
		// setPagination : ()
	},
}))

export default useSafeguardStore
