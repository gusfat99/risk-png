import { ResponseApiType } from "@/helpers/ApiHelper"
import { CommonState } from "./common"
import { PaginationState, Updater } from "@tanstack/react-table"

export interface Safeguard {
	id: number
	consequence_id: number | null
	safeguard: string
	safeguard_title: string
	is_master: 1 | 0 | undefined
	file_path: any
}

export interface SafeguardPayload {
	safeguard: string
	safeguard_title: string
	file_path: any
}

export interface SafeguardState extends CommonState {
	safeguardItems: Safeguard[]
	safeguardSelected: Safeguard | null
	actions: {
		fetchAllData(): Promise<ResponseApiType<Safeguard[]>>
		fetchSingleData?(safeguardId : any): Promise<ResponseApiType<Safeguard>>
		createData?(
			paylaod: SafeguardPayload
		): Promise<ResponseApiType<Safeguard>>
		updateData?(id: any, paylaod: any): Promise<ResponseApiType<Safeguard>>
		deleteData?(id: any): Promise<ResponseApiType<any>>
		// setPagination?: OnChangeFn<PaginationState>,
		setPagination?: (updater: Updater<PaginationState>) => void
	}
}
