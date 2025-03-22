import { MetaResponseType } from "@/helpers/ApiHelper"

export type PaginationType = {
	pageSize: number; //initial page index
	pageIndex: number //default page size
}

export interface CommonState {
	isFetching: boolean
	isSubmit: boolean
	message: string
	errors: string
	pagination_tanstack : PaginationType
	meta?: MetaResponseType
}

export const commonInitualState = {
	errors: "",
	isFetching: false,
	isSubmit: false,
	message: "",
	pagination_tanstack: {
		pageSize: 10,
		pageIndex: 1,
	},
	meta: {
		total: 0,
		per_page: 10,
		current_page: 1,
		last_page: 0,
		from: 1,
		to: 0,
		next_page_url: null,
		prev_page_url: null,
	},
}
