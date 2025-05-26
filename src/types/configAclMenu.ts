import { ResponseApiType } from "@/helpers/ApiHelper"
import { PaginationState, Updater } from "@tanstack/react-table"
import { CommonState } from "./common"
import { z } from "zod";
import { MenuSchema, RoleAclMenuSchema } from "@/schemas/ConfAclMenu";


export type AvailableActionMenu = "create" | "list" | "delete" | "detail";


export interface Menu {
   id: number;
   name: string;
   slug: string;
   parent_id: number | null;
   parent_name: string | null;
   path: string;
   icon: string | null;
   order: number;
   type: "item" | "group";
   available_actions: AvailableActionMenu[];
}

export type Role = {
   id: number;
   name: string;
}

export interface ConfigAclMenuState extends CommonState {
   menuItems: Menu[]
   rolePermissionItems: Role[]
   actions: {
      fetchMenu(params?: {
         per_page: number
      }): Promise<ResponseApiType<Menu[]>>
      fetchMenuDetail?(menuId : any): Promise<ResponseApiType<Menu>>
      fetchRole(): Promise<ResponseApiType<Role[]>>
      createMenu?(payload: MenuForm): Promise<ResponseApiType<Menu>>
      createRolePemissions?(payload: RoleAclMenuForm): Promise<ResponseApiType<Role>>
      updateMenu?(id: any, payload: MenuForm): Promise<ResponseApiType<Menu>>
      updateRolePemissions?(id: any, payload: RoleAclMenuForm): Promise<ResponseApiType<Role>>
      deleteMenu?(id: any): Promise<ResponseApiType<any>>
      deleteRolePermissions?(id: any): Promise<ResponseApiType<any>>
      setQuerySearchMenu?: (value: string) => void
      setQuerySearchRole?: (value: string) => void
      setPagination?: (updater: Updater<PaginationState>) => void;
   }
}

export type MenuForm = z.infer<typeof MenuSchema>
export type RoleAclMenuForm = z.infer<typeof RoleAclMenuSchema>
