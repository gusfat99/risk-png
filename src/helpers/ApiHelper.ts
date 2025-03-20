import sanitizeHtml from "sanitize-html"
import dayjs from "dayjs"
import { AxiosError, AxiosResponse, ResponseType } from "axios"
import axiosInterceptor, { ResErrorType } from "@/services/axiosInterceptor"

export type ResponseApiType<T> = {
	data: T | null
	message?: string
	errors?: string
	meta: any
}

/**
 * Sanitize Content
 * @param content any
 * @returns content any
 */
export const sanitizeContent = (content: any) => {
	if (typeof content === "string") {
		return sanitizeHtml(content)
	}

	return content
}

/**
 * Sanitize a Json Array
 * @param arrayOrObject Array or Object
 * @returns output Array or Object
 */
const sanitizeArrayObject = (arrayOrObject: any) => {
	const output = Array.isArray(arrayOrObject) ? [] : {}

	// loop for an array
	for (const key in arrayOrObject) {
		const item = arrayOrObject[key]
		if (typeof item === "object" && item instanceof FormData) {
			// @ts-ignore
			output[key] = item
		} else if (
			typeof item === "object" &&
			item !== null &&
			dayjs.isDayjs(item)
		) {
			// @ts-ignore
			output[key] = item
		} else if (
			typeof item === "object" &&
			item !== null &&
			typeof item.getMonth === "function"
		) {
			// @ts-ignore
			output[key] = item
		} else if (
			Array.isArray(item) ||
			(typeof item === "object" && item !== null)
		) {
			// @ts-ignore
			output[key] = sanitizeArrayObject(item)
		} else {
			// @ts-ignore
			output[key] = sanitizeContent(item)
		}
	}

	return output
}

export const sanitizeData = (inputVal: any, prefixPropery?: string) => {
	try {
		if (typeof inputVal === "object" && inputVal instanceof FormData) {
			return inputVal
		}

		if (Array.isArray(inputVal) && prefixPropery && inputVal !== null) {
			const queryString = (inputVal as string[])
				.map((item) => `${prefixPropery}=${item}`)
				.join("&")
			return `?${queryString}`
		}
		if (
			Array.isArray(inputVal) ||
			(typeof inputVal === "object" && inputVal !== null)
		) {
			return sanitizeArrayObject(inputVal)
		}

		return sanitizeContent(inputVal)
	} catch (e) {
		console.log("parse error", e)
	}
}

export const isRequestSuccessful = (code: number) => {
	return code >= 200 && code <= 204
}

export const isEmptyObject = (obj = {}) => {
	for (const key in obj) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj?.hasOwnProperty(key)) {
			return false
		}
	}
	return true
}

export const handleApiResponse = <T>(
	data: AxiosResponse<ResponseApiType<T>>,
	resolve: (data: ResponseApiType<T>) => void,
	reject: (data: ResErrorType) => void
) => {
	if (isRequestSuccessful(data.status)) {
		if (!(data.data instanceof Blob)) {
			return resolve(data.data)
		} else {
			return resolve(data.data as unknown as any)
		}
	} else {
		return reject({
			message: data.data.message || "",
			errors: data.data.errors || "",
		})
	}
}

export const postData = <T>(
	ep: string,
	payload: object
): Promise<ResponseApiType<T>> => {
	return new Promise((resolve, reject) => {
		axiosInterceptor
			.post<ResponseApiType<T>>(ep, sanitizeData(payload))
			.then((data) => {
				return handleApiResponse<T>(data, resolve, reject)
			})
			.catch((err: AxiosError<ResponseApiType<null>>) => {
				const errorResponse: ResponseApiType<null> | undefined =
					err.response?.data
				return reject(
					errorResponse ?? { message: err.message || "Unknown error" }
				)
			})
		return Promise.resolve()
	})
}

export const getDataApi = <T>(
	url: string,
	params = {}, 
	withSenitize: boolean = true,
	headers = {},
	responseType: ResponseType = "json"
): Promise<ResponseApiType<T>> => {
	return new Promise<ResponseApiType<T>>((resolve, reject) => {
		axiosInterceptor
			.get<ResponseApiType<T>>(url, {
				params: withSenitize ? sanitizeData(params) : params,
				headers,
				responseType: responseType,
			})
			.then((data) => {
				return handleApiResponse<T>(data, resolve, reject)
			})
			.catch((err: AxiosError<ResponseApiType<null>>) => {
				const errorResponse: ResponseApiType<null> | undefined =
					err.response?.data
				return reject(
					errorResponse ?? { message: err.message || "Unknown error" }
				)
			})
		return Promise.resolve()
	})
}
