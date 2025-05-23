import { User } from "@/types/user";
import { decrypt } from "./utils";
import { MenuPermission } from "@/types/auth";

// lib/ssr-safe-storage.ts
export const getSSRSafeToken = (): string | null => {
   if (typeof window === 'undefined') return null;
   else {
      const authStorage = localStorage.getItem('auth');

      if (authStorage) {
         try {
            if (process.env.NODE_ENV === "production") {
               // Pertama parse sebagai JSON, lalu decrypt hasilnya
               const parsed = JSON.parse(authStorage)
               return decrypt(parsed).state?.token || "";
            } else {
               return JSON.parse(authStorage)?.state?.token || "";
            }
         } catch (error) {
            console.error("Failed to decrypt storage item", error)
            return null
         }
      } else {
         return null;
      }
   }
};

interface UserPermission extends User {
   menus: MenuPermission[]
}

export const getSSRSafeUser = (): UserPermission | null => {
   if (typeof window === 'undefined') return null;
   const authStorage = localStorage.getItem('auth');
   if (authStorage) {
      try {
         if (process.env.NODE_ENV === "production") {
            // Pertama parse sebagai JSON, lalu decrypt hasilnya
            const parsed = JSON.parse(authStorage)
            return decrypt(parsed).state;
         } else {
            return JSON.parse(authStorage).state;
         }
      } catch (error) {
         console.error("Failed to decrypt storage item", error)
         return null
      }
   } else {
      return null;
   }
};

export const setSSRSafeUser = (User: string): void => {
   if (typeof window === 'undefined') return;
   localStorage.setItem('auth', User);
};

export const removeSSRSafeUser = (): void => {
   if (typeof window === 'undefined') return;
   localStorage.removeItem('auth');
};