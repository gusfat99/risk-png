import { Safeguard } from "@/types/safeguard"

export const parseSafeguardDataToView = (data: Safeguard) => {
   return {
      safeguard: data.safeguard,
      safeguard_title: data.safeguard_title,
      file_path : data.file_path as any
   }
}
