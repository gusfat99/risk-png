// lib/ssr-safe-storage.ts
export const getSSRSafeToken = (): string | null => {
   if (typeof window === 'undefined') return null;
   else {
      const authStorage = localStorage.getItem('auth');
      if (authStorage) {
         
         return JSON.parse(authStorage)?.state?.token || "";
      } else {
         return null;
      }
   }
 };
 

export const getSSRSafeUser = (): string | null => {
   if (typeof window === 'undefined') return null;
   return localStorage.getItem('auth') || null;
 };
 
 export const setSSRSafeUser = (User: string): void => {
   if (typeof window === 'undefined') return;
   localStorage.setItem('auth', User);
 };
 
 export const removeSSRSafeUser = (): void => {
   if (typeof window === 'undefined') return;
   localStorage.removeItem('auth');
 };