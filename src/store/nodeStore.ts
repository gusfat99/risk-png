import { EXPORT_NODE_EP, NODE_EP } from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { NodeSchema } from "@/schemas/NodeSchema"
import { downloadProxyFile } from "@/services/downloadFile"
import { commonInitualState } from "@/types/common"
import { Node, NodeState } from "@/types/node"
import { z } from "zod"
import useAuthStore from "./authStore"
import { createStore, runUpdater } from "./store"

const initialState = {
	...commonInitualState,
	nodeItems: [],
	nodeSelected: null,
	isFetchingExportData : false
}

const useNodeStore = createStore<NodeState>("node-data", (set, get) => ({
	...initialState,
	actions: {
		fetchAllData: async () => {
			set({
				isFetching: true,
			})
			return new Promise<ResponseApiType<Node[]>>((resolve, reject) => {
				getDataApi<Node[]>(NODE_EP, {
					page: get().pagination_tanstack.pageIndex,
					per_page: get().pagination_tanstack.pageSize,
					search: get().querySearch || undefined
				})
					.then((data) => {
						set({
							nodeItems: data.data || [],
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
		fetchSingleData: async (nodeId: any) => {
			set({
				isFetching: true,
			})
			return new Promise<ResponseApiType<Node>>((resolve, reject) => {
				getDataApi<Node>(`${NODE_EP}/${nodeId}`)
					.then((data) => {
						set({
							nodeSelected: data.data,
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
		createData: async (payload: z.infer<typeof NodeSchema>) => {
			set({
				isSubmit: true,
			})
			return new Promise<ResponseApiType<Node>>((resolve, reject) => {
				postData<Node>(NODE_EP, payload)
					.then((data) => {
						set((state) => {
							return {
								nodeItems: [
									...state.nodeItems,
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
		updateData: async (id: any, payload: z.infer<typeof NodeSchema>) => {
			set({
				isSubmit: true,
			})
			return new Promise<ResponseApiType<Node>>((resolve, reject) => {
				postData<Node>(`${NODE_EP}/${id}`, payload)
					.then((data) => {
						set((state) => {
							return {
								nodeItems: [
									...state.nodeItems,
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
			set({
				isFetchingDelete: true
			})
			return new Promise<ResponseApiType<null>>((resolve, reject) => {
				deleteData<null>(NODE_EP + "/" + id)
					.then((data) => {
						const filterData = get().nodeItems.filter(
							(x) => x.id?.toString() !== id.toString()
						)
						set({
							nodeItems: filterData,
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
							isFetchingDelete: false
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
		exportExcel() {
			set({
				isFetchingExportData: true,
			})
			const year_selected = useAuthStore.getState().year_selected
			downloadProxyFile(`${EXPORT_NODE_EP}`, {
				year: year_selected,
			})
				.then((blob) => {
					toast({
						title: "Success",
						description: "Successfull download file excel",
						variant: "success",
					})
				})
				.catch((err) => {
					toast({
						title: "Filed",
						description: err.message,
						variant: "destructive",
					})
				})
				.finally(() => {
					set({
						isFetchingExportData: false,
					})
				})
		},
		// setPagination : ()
	},
}))

export default useNodeStore
