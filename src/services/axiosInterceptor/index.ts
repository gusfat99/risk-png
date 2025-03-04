import { API_URL } from "@/constants"
// import { alertConfirm } from "@/context/AppAlertProvider"
// import { destroyToken, getToken } from "@/lib/actions"
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios"

export const prefixApiV1 = "/api"

export type ResErrorType = {
	errors: string
	message: string
}

export type MetaResponseType = {
	pagination: {
		total_rows: number
	}
}

export type ResponseType<T> = {
	data?: T | null
	message: string
	meta?: MetaResponseType | null
}

const onRequest = async (config: AxiosRequestConfig): Promise<any> => {
	const token = ""
	config.headers = config.headers ?? {}
	config.headers["Cache-Control"] = "no-cache"

	// Menentukan Content-Type berdasarkan apakah itu multipart/form-data atau tidak
	if (config.headers["Content-Type"] !== "multipart/form-data") {
		config.headers["Content-Type"] = "application/json"
	}

	if (token) {
		config.headers["Authorization"] = "Bearer " + token
	}

	return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	console.log({ error })
	return Promise.reject(error)
}

const onResponse = async (
	response: AxiosResponse<ResponseType<any>>
): Promise<AxiosResponse> => {
	console.log({ response });
	// if (response.data.code !== 200) {
	// 	// unauthorized redirect to sign
	// 	if (response.data.code === 401) {
	// 		// alertConfirm({
	// 		// 	title: "Sesi telah habis",
	// 		// 	description: "Silahkan masuk kembali!",
	// 		// 	applyTitle: "Ok",
	// 		// 	showDeny: false,
	// 		// }).then((isConfirmed) => {
	// 		// 	if (isConfirmed) {
	// 		// 		destroyToken().then(() => {
	// 		// 			if (typeof window !== "undefined") {
	// 		// 				window.location.href = "/sign"
	// 		// 			}
	// 		// 		})
	// 		// 	}
	// 		// })
	// 	}
	// }
	return response
}

const onResponseError = async (
	error: AxiosError<ResErrorType>
): Promise<AxiosError<ResErrorType>> => {
	return Promise.reject(error)
}

export function setupInterceptorsTo(
	axiosInstance: AxiosInstance
): AxiosInstance {
	axiosInstance.interceptors.request.use(onRequest, onRequestError)
	axiosInstance.interceptors.response.use(onResponse, onResponseError)
	return axiosInstance
}

const axiosInterceptor = setupInterceptorsTo(
	axios.create({
		baseURL: API_URL + prefixApiV1,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	})
)

export default axiosInterceptor
