export type PaginationType = {
	pageIndex: number //initial page index
	pageSize: number //default page size
}

export interface CommonState  {
	isFetching: boolean;
   isSubmit: boolean;
   message: string
   errors: string
}

export const commonInitualState = {
	errors: "",
	isFetching: false,
	isSubmit: false,
	message: "",
}