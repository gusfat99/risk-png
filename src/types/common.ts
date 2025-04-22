import { MetaResponseType } from "@/helpers/ApiHelper"
import React from "react";

// types/download.ts
export interface DownloadOptions {
	params?: Record<string, any>;
	headers?: Record<string, string>;
	timeout?: number;
	onProgress?: (progress: number) => void;
 }
 
 export interface DownloadResult {
	success: boolean;
	filename?: string;
	error?: string;
	blobUrl?: string;
}
 
export type PaginationType = {
	pageSize: number; //initial page index
	pageIndex: number //default page size
}

export interface CommonState {
	isFetching: boolean
	isFetchingExportData: boolean
	querySearch?: string;
	isSubmit: boolean
	message: string
	errors: string
	pagination_tanstack : PaginationType
	meta?: MetaResponseType
}


export type MimeTypes = "pdf" | "xlsx" | "docx" | "png" | "jpg" | "jpg"

export type SelectDataType = {
	label: string
	value: any
	[x: string]: any
}

export type FormRefType = {
	submit: (e?: React.BaseSyntheticEvent) => Promise<void>
}


export const commonInitualState = {
	errors: "",
	isFetching: false,
	isSubmit: false,
	message: "",
	isFetchingExportData: false,
	
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
