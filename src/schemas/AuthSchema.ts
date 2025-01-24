import { z } from "zod"

export const AuthSchema = z.object({
   email: z
      .string({
         message: "Masukan Email yang terdaftar pada sistem",
      })
      .min(1, { message: "Masukan Email yang terdaftar pada sistem" })
      .email("Email tidak valid!"),
   password: z
      .string({
         message: "Masukan Password anda",
      })
      .min(1, { message: "Masukan Password anda" }),
})
