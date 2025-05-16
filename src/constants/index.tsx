export const RECAPTCHA_KEY_CLIENT = process.env.NEXT_PUBLIC_KEY_RECAPTCHA_CLIENT;
export const RECAPTCHA_KEY_SERVER = process.env.NEXT_PUBLIC_KEY_RECAPTCHA_SERVER;
export const API_URL_GOOGLE_RECAPTCHA = process.env.NEXT_PUBLIC_API_URL_GOOGLE_RECAPTCHA || "";
export const SECRET_KEY = process.env.NEXT_PUBLIC_STORAGE_SECRET || "default_secret";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const HAZOP_PATHNAME_STORAGE = API_URL + "/storage/hazops";
export const SAFEGUARDS_PATHNAME_STORAGE = API_URL + "/storage/safeguards";
export const PROFILE_PATHNAME_STORAGE = API_URL + "/storage/profile";
export const TIME_MINUTES_INACTIVITY_APP = 60; //ON MINUTES

