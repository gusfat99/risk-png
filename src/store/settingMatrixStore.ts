import { LIKELYHOOD_FREQUENCY_EP, SEVERITY_MAP_EP } from "@/constants/endpoints"
import { getDataApi, ResponseApiType } from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState } from "@/types/common"
import {
	LikelyhoodFrequency,
	SettingMatrixState,
	SeverityMap,
} from "@/types/settingMatrix"
import { createStore } from "./store"

const initialState = {
	...commonInitualState,
	likelyhood_frequency: {
		isFetching: false,
		item: null,
	},
	severity_map: {
		isFetching: false,
		item: null,
	},
}

const useSettingMatrixStore = createStore<SettingMatrixState>(
	"setting-matrix",
	(set, get) => ({
		...initialState,
		actions: {
			async fetchLikelyhood() {
				set((prevState) => ({
					likelyhood_frequency: {
						...prevState.likelyhood_frequency,
						isFetching: true,
					},
				}))
				return new Promise<ResponseApiType<LikelyhoodFrequency>>(
					(resolve, reject) => {
						getDataApi<LikelyhoodFrequency>(LIKELYHOOD_FREQUENCY_EP)
							.then((data) => {
								if (data && !data.data?.message?.includes("Unauthorized")) {
									set(() => ({
										likelyhood_frequency: {
											item: data.data || null,
											isFetching: false,
										},
									}))
								}
								resolve(data)
							})
							.catch((err) => {
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
								reject(err)
							})
							.finally(() => {
								set((prevState) => ({
									likelyhood_frequency: {
										...prevState.likelyhood_frequency,
										isFetching: false,
									},
								}))
							})
					}
				)
			},
			async fetchSeverityMap() {
				return new Promise<ResponseApiType<SeverityMap>>(
					(resolve, reject) => {
						set((prevState) => ({
							severity_map: {
								...prevState.severity_map,
								isFetching: true,
							},
						}))
						getDataApi<SeverityMap>(SEVERITY_MAP_EP)
							.then((data) => {
								if (data.data) {
									set(() => ({
										severity_map: {
											item: data.data || null,
											isFetching: false,
										},
									}))
								}
								resolve(data)
							})
							.catch((err) => {
								toast({
									title: "ERROR",
									description: err.message,
									variant: "destructive",
								})
								reject(err)
							})
							.finally(() => {
								set((prevState) => ({
									severity_map: {
										...prevState.severity_map,
										isFetching: false,
									},
								}))
							})
					}
				)
			},
		},
	})
)

export default useSettingMatrixStore
