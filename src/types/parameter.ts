import { ResponseApiType } from "@/helpers/ApiHelper"
import { ParameterSchema } from "@/schemas/ParameterSchema"
import { PaginationState, Updater } from "@tanstack/react-table"
import { z } from "zod"
import { CommonState } from "./common"
import { Parameter } from "./riskDataBank"


export interface ParameterState extends CommonState {
   parameterItems: Parameter[]
   actions: {
      fetchAllData(): Promise<ResponseApiType<Parameter[]>>
      createData?(paylaod: { name: string }): Promise<ResponseApiType<Parameter>>
      updateData?(id: any, paylaod: any): Promise<ResponseApiType<Parameter>>
      deleteData?(id: any): Promise<ResponseApiType<any>>
      setPagination?: (updater: Updater<PaginationState>) => void;
      setQuerySearch?: (value: string) => void;
   }
}

export type ParameterSchemaForm = z.infer<typeof ParameterSchema>
