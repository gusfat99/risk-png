import { Safeguard } from "@/types/safeguard"

export const parseSafeguardDataToView = (data: Safeguard) => {
   return {
      safe_guard: data.safeguard,
      safe_guard_title: data.safeguard_title,
      file_path : data.file_path
   }
}
