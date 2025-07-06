import sanitizeHtml from "sanitize-html"
import dayjs from "dayjs"
import { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios"
import axiosInterceptor, { ResErrorType } from "@/services/axiosInterceptor"

export type MetaResponseType = {
	current_page: number
	from: number
	last_page: number
	next_page_url: string | null
	per_page: number
	prev_page_url: null | string
	to: number
	total: number
}


export type ResponseApiType<T> = {
	data: T | null
	meta: MetaResponseType
	message?: string
	errors?: string
} & {
	[x: string]: T | null
}

export type BlobResponseType<T = Blob> = {
	data: T | null
	meta?: MetaResponseType
	message?: string
	errors?: string
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

export const sanitizeQueryParams = (params: Record<string, any>): string => {
	const sanitized = Object.entries(params).reduce((acc, [key, value]) => {
	  // Sanitasi key dan value
	  const cleanKey = sanitizeHtml(key, { allowedTags: [], allowedAttributes: {} });
	  const cleanValue = sanitizeHtml(String(value), { allowedTags: [], allowedAttributes: {} });
 
	  // Encode URI komponen untuk handle spasi/special chars
	  return `${acc}${acc ? '&' : ''}${encodeURIComponent(cleanKey)}=${encodeURIComponent(cleanValue)}`;
	}, '');
 
	return sanitized ? `?${sanitized}` : '';
 };

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
	payload?: object,
	config?: AxiosRequestConfig<any>
): Promise<ResponseApiType<T>> => {
	return new Promise((resolve, reject) => {
		axiosInterceptor
			.post<ResponseApiType<T>>(ep, sanitizeData(payload), config)
			.then((data) => {
				return handleApiResponse<T>(data, resolve, reject)
			})
			.catch((err: AxiosError<ResponseApiType<null>>) => {
				// console.log(err.status)
				if (err.status === 401 || err.status === 404) {
					return  resolve(err.response as unknown as any)
				}
				const errorResponse: ResponseApiType<null> | undefined =
					err.response?.data
				return reject(
					errorResponse ?? { message: err.message || "Unknown error" }
				)
			})
		return Promise.resolve()
	})
}

export const putData = <T>(
	ep: string,
	payload: object,
	config?: AxiosRequestConfig<any>
): Promise<ResponseApiType<T>> => {
	return new Promise((resolve, reject) => {
		axiosInterceptor
			.put<ResponseApiType<T>>(ep, sanitizeData(payload), config)
			.then((data) => {
				return handleApiResponse<T>(data, resolve, reject)
			})
			.catch((err: AxiosError<ResponseApiType<null>>) => {
				// console.log(err.status)
				if (err.status === 401 || err.status === 404) {
					return  resolve(err.response as unknown as any)
				}
				const errorResponse: ResponseApiType<null> | undefined =
					err.response?.data
				return reject(
					errorResponse ?? { message: err.message || "Unknown error" }
				)
			})
		return Promise.resolve()
	})
}

export const patchData = <T>(
	ep: string,
	payload: object,
	config?: AxiosRequestConfig<any>
): Promise<ResponseApiType<T>> => {
	return new Promise((resolve, reject) => {
		axiosInterceptor
			.patch<ResponseApiType<T>>(ep, sanitizeData(payload), config)
			.then((data) => {
				return handleApiResponse<T>(data, resolve, reject)
			})
			.catch((err: AxiosError<ResponseApiType<null>>) => {
				// console.log(err.status)
				if (err.status === 401 || err.status === 404) {
					return  resolve(err.response as unknown as any)
				}
				const errorResponse: ResponseApiType<null> | undefined =
					err.response?.data
				return reject(
					errorResponse ?? { message: err.message || "Unknown error" }
				)
			})
		return Promise.resolve()
	})
}

export const deleteData = <T>(
	ep: string,
): Promise<ResponseApiType<T>> => {
	return new Promise((resolve, reject) => {
		axiosInterceptor
			.delete<ResponseApiType<T>>(ep)
			.then((data) => {
				return handleApiResponse<T>(data, resolve, reject)
			})
			.catch((err: AxiosError<ResponseApiType<null>>) => {
				// console.log(err.status)
				if (err.status === 401 || err.status === 404) {
					return  resolve(err.response as unknown as any)
				}
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
				// console.log(err.status)
				if (err.status === 401 || err.status === 404) {
					return  resolve(err.response as unknown as any)
				}
				const errorResponse: ResponseApiType<null> | undefined =
					err.response?.data
				return reject(
					errorResponse ?? { message: err.message || "Unknown error" }
				)
			})
		return Promise.resolve()
	})
}

export const getDataBlob = <T = Blob>(
	url: string,
	params = {},
	headers = {}
 ): Promise<BlobResponseType<T>> => {
	return new Promise<BlobResponseType<T>>((resolve, reject) => {
	  axiosInterceptor
		 .get<T>(url, {
			params: sanitizeData(params),
			headers,
			responseType: 'blob', // Ini yang membedakan, responseType di-set ke 'blob'
		 })
		  .then((data) => {
			if (isRequestSuccessful(data.status)) {
			  return resolve({
				 data: data.data,
				
			  });
			} else {
			  return reject({
				 message: 'Failed to download file',
				 errors: 'Download error',
			  });
			}
		 })
		 .catch((err: AxiosError<ResponseApiType<null>>) => {
			if (err.status === 401 || err.status === 404) {
			  return resolve(err.response as unknown as any);
			}
			const errorResponse: ResponseApiType<null> | undefined =
			  err.response?.data;
			return reject(
			  errorResponse ?? { message: err.message || 'Unknown error' }
			);
		 });
	});
 };

export function extractFilenameFromHeader(contentDisposition: string): string | null {
	const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
	const matches = filenameRegex.exec(contentDisposition);
	if (matches && matches[1]) {
	  return matches[1].replace(/['"]/g, '');
	}
	return null;
 }