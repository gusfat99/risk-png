import { NODE_EP } from "@/constants/endpoints"
import { getDataApi, ResponseApiType } from "@/helpers/ApiHelper"
import { commonInitualState } from "@/types/common"
import { Node, NodeState } from "@/types/node"
import { createStore } from "./store"

const initialState = {
	...commonInitualState,
	nodeItems: [],
   nodeSelected: null,

}

const useNodeStore = createStore<NodeState>(
   'node-data',
   (set) => ({
      ...initialState,
      actions: {
        fetchAllData: async () => {
			set({
				isFetching: true,
			})
			return new Promise<ResponseApiType<Node[]>>((resolve, reject) => {
				getDataApi<Node[]>(NODE_EP)
					.then((data) => {
						set({
							nodeItems: data.data || [],
						})
						resolve(data)
					})
					.catch((err) => {
						reject(err)
					})
					.finally(() => {
						set({
							isFetching: true,
						})
					})
			})
		},
     }
  })
)


export default useNodeStore
