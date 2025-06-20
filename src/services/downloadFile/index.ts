import { API_URL } from "@/constants"
import { sanitizeQueryParams } from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import axiosInterceptor from "../axiosInterceptor"

export type DownloadFileOption = {
	defaultFilename?: string
	autoDownload?: boolean
}

// Modifikasi fungsi untuk menangani nama file dari header
export const downloadProxyFile = async (
	url: string,
	params?: any,
	options: DownloadFileOption = {
		defaultFilename: "filename",
		autoDownload: true,
	}
): Promise<Blob> => {
	return new Promise<Blob>(async (resolve, reject) => {
		try {
			const parameters = sanitizeQueryParams(params);
		
			const response = await axiosInterceptor.get(
				`?url=${API_URL}/api${url}${params ? parameters : ""
				}`,
				{
					responseType: "blob",
					baseURL: "/api/proxy-download-file",
				}
			)

			// Dapatkan nama file dari header
			const contentDisposition = response.headers["content-disposition"]
			let filename = options.defaultFilename || "filename"
			
			if (contentDisposition) {
				const filenameMatch =
				contentDisposition.match(/filename="?(.+)"?/)
				if (filenameMatch && filenameMatch[1]) {
					filename = filenameMatch[1]
				}
			}
			
			const blob = new Blob([response.data])

			resolve(blob)

			if (options.autoDownload) {
				const blobUrl = window.URL.createObjectURL(blob)
				const link = document.createElement("a")
				link.href = blobUrl
				link.setAttribute("download", filename)
				document.body.appendChild(link)
				link.click()
				link.parentNode?.removeChild(link)
				window.URL.revokeObjectURL(blobUrl)
			}

			// Proses download
		} catch (error: any) {
			console.error("Download error:", error)
			reject(error)
			toast({
				title: "Failed",
				description: error.meassage,
				variant: "destructive",
			})
		}
	})
}
