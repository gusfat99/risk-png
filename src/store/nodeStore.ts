import { NODE_EP } from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	putData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { commonInitualState } from "@/types/common"
import { Node, NodeState } from "@/types/node"
import { NodeSchema } from "@/schemas/NodeSchema"
import { createStore, runUpdater } from "./store"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"

const initialState = {
	...commonInitualState,
	nodeItems: [],
	nodeSelected: null,
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
				})
					.then((data) => {
						set({
							nodeItems: data.data || [],
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
				putData<Node>(`${NODE_EP}/${id}`, payload)
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

export default useNodeStore
