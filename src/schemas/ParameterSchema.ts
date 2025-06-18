import { z } from "zod"

export const ParameterSchema = z.object({
   name: z
      .string({
         message: "Parameter Name is required",
      })
      .min(1, { message: "Parameter Name is required" }),
})

export const initialValueParameter = {
   name: "",

}