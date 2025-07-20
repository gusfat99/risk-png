import { MenuForm } from "@/types/configAclMenu";
import { z } from "zod";

export const MenuSchema = z.object({
   name: z
      .string({
         message: "Name is required",
      })
      .min(1, { message: "Name is required" }),
   type: z
      .string({
         message: "Type Menu is required",
      })
      .min(1, { message: "Type Menu is required" })
      .refine((val) => ["group", "item"].includes(val), {
         message: "Type must be either 'group' or 'item'",
      }),
   path: z.string().optional(),
   icon: z.string().optional(),
   parent_id: z.string().optional(),
   order: z
      .number()
      .min(0, "Order Number is required")
      .refine((val) => !isNaN(Number(val)), {
         message: "Order Number Must be a number",
      })
      .refine((val) => Number(val) > -1, {
         message: "Order Number must be more than -1",
      }),
   available_actions: z.array(z.string()).optional(),
})
   .superRefine((data, ctx) => {
      // Aturan untuk type 'item'
      if (data.type === "item") {
         if (!data.path) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: "Path Url is required for item type",
               path: ["path"],
            });
         }

      }
   });

export const PermissonsSchema = z.array(
   z.object({
      menu_id: z.number({
         message: "Menu ID is required",
      }),
      read: z.boolean().optional(),
      create: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional(),
      detail: z.boolean().optional(),
      list: z.boolean().optional(),
   })
)

export const RoleAclMenuSchema = z.object({
   name: z
      .string({
         message: "Role Name is required",
      })
      .min(1, { message: "Role Name is required" }),

   permissions: PermissonsSchema
})


export const defaultValueMenu: MenuForm = {
   name: "",
   type: "",
   order: 0,
   available_actions: ["list", "edit", "detail", "delete", "create"],
   icon: "",
   parent_id: "",
   path: ""
}

export const defaultValueRoleAclMenu = {
   name: "",
   permissions: [
      {
         menu_id: 0,
         read: false,
         create: false,
         edit: false,
         delete: false,
         detail: false,
         list: false,
      },
   ],
}
