import { NODE_EP, PARAMETER_EP } from "@/constants/endpoints"
import {
   deleteData,
   getDataApi,
   postData,
   ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { NodeSchema } from "@/schemas/NodeSchema"
import { commonInitualState } from "@/types/common"
import { Node, NodeState } from "@/types/node"
import { z } from "zod"
import { createStore, runUpdater } from "./store"
import { Parameter } from "@/types/riskDataBank"
import { ParameterSchemaForm, ParameterState } from "@/types/parameter"

const initialState = {
   ...commonInitualState,
   parameterItems: [],
}

const useParameterStore = createStore<ParameterState>("parameter-data", (set, get) => ({
   ...initialState,
   actions: {
      fetchAllData: async () => {
         set({
            isFetching: true,
         })
         return new Promise<ResponseApiType<Parameter[]>>((resolve, reject) => {
            getDataApi<Parameter[]>(PARAMETER_EP, {
               page: get().pagination_tanstack.pageIndex,
               per_page: get().pagination_tanstack.pageSize,
               search: get().querySearch || undefined
            })
               .then((data) => {
                  set({
                     parameterItems: data.data || [],
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

      createData: async (payload: ParameterSchemaForm) => {
         set({
            isSubmit: true,
         })
         return new Promise<ResponseApiType<Parameter>>((resolve, reject) => {
            postData<Parameter>(PARAMETER_EP, payload)
               .then((data) => {
                  set((state) => {
                     return {
                        parameterItems: [
                           ...state.parameterItems,
                           ...(data.data ? [data.data] : []),
                        ],
                     }
                  })
                  resolve(data)
               })
               .catch((err) => {
                  reject(err)
                  toast({
                     variant: "destructive",
                     title: "Failed",
                     description: err.message
                  })
               })
               .finally(() => {
                  set({
                     isSubmit: false,
                  })
               })
         })
      },
      updateData: async (id: any, payload: ParameterSchemaForm) => {
         set({
            isSubmit: true,
         })
         return new Promise<ResponseApiType<Parameter>>((resolve, reject) => {
            postData<Parameter>(`${PARAMETER_EP}/${id}`, payload)
               .then((data) => {
                  const parameterItems = ([...get().parameterItems]);
                  const findIndex = get().parameterItems.findIndex(x => x.id === id);
                  if (findIndex > -1) {
                     parameterItems[findIndex].name = payload.name;
                     set({
                        parameterItems
                     })
                  }
                  resolve(data)
               })
               .catch((err) => {
                  reject(err)
                
                  toast({
                     variant: "destructive",
                     title: "Failed",
                     description: err.message
                  })
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
         return new Promise<ResponseApiType<any>>((resolve, reject) => {
            deleteData<any>(PARAMETER_EP + "/" + id)
               .then((data) => {
                  const filterData = get().parameterItems.filter(
                     (x) => x.id?.toString() !== id.toString()
                  )
                  set({
                     parameterItems: filterData,
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
      // setPagination : ()
   },
}))

export default useParameterStore
