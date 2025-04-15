import {
	LIKELYHOOD_FREQUENCY_EP,
	RISK_MAP_EP,
	SEVERITY_MAP_EP,
} from "@/constants/endpoints"
import {
	deleteData,
	getDataApi,
	postData,
	ResponseApiType,
} from "@/helpers/ApiHelper"
import { toast } from "@/hooks/use-toast"
import { commonInitualState, SelectDataType } from "@/types/common"
import {
	LikelyhoodFrequency,
	RiskMap,
	RowLikelyhoodFrequency,
	SettingMatrixState,
	SeverityMap,
} from "@/types/settingMatrix"
import { createStore } from "./store"
import useAuthStore from "./authStore"

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
	risk_map: {
		isFetching: false,
		item: null,
	},
	severity_map_options: [],
	likelyhood_options: [],
	isSubmitMatrixCell: false,
	isProcessAddRowLikelyhood: false,
}

const year_selected = useAuthStore.getState().year_selected
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
						getDataApi<LikelyhoodFrequency>(
							LIKELYHOOD_FREQUENCY_EP,
							{
								year: year_selected,
							}
						)
							.then((data) => {
								if (
									data &&
									!data.data?.message?.includes(
										"Unauthorized"
									)
								) {
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
				return new Promise<ResponseApiType<SeverityMap[]>>(
					(resolve, reject) => {
						set((prevState) => ({
							severity_map: {
								...prevState.severity_map,
								isFetching: true,
							},
						}))
						getDataApi<SeverityMap[]>(SEVERITY_MAP_EP, {
							year : year_selected
						})
							.then((data) => {
								if (Array.isArray(data.data)) {
									set(() => ({
										severity_map: {
											item: data.data || [],
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
			async fetchRiskMap() {
				return new Promise<ResponseApiType<RiskMap[]>>(
					(resolve, reject) => {
						set((prevState) => ({
							risk_map: {
								...prevState.risk_map,
								isFetching: true,
							},
						}))
						getDataApi<RiskMap[]>(RISK_MAP_EP, {
							year : year_selected
						})
							.then((data) => {
								if (Array.isArray(data.data)) {
									set(() => ({
										risk_map: {
											item: data.data || [],
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
									risk_map: {
										...prevState.risk_map,
										isFetching: false,
									},
								}))
							})
					}
				)
			},
			async fetchOptionsLikelyhood() {
				set((prevState) => ({
					likelyhood_frequency: {
						...prevState.likelyhood_frequency,
						isFetching: true,
					},
				}))
				getDataApi<LikelyhoodFrequency>(LIKELYHOOD_FREQUENCY_EP)
					.then((data) => {
						if (
							data &&
							!data.data?.message?.includes("Unauthorized")
						) {
							const options: SelectDataType[] = (
								data.data?.column || []
							).map((column) => ({
								label: `(${column.id}) ${column.frequency_name}`,
								value: column.id?.toString(),
							}))

							set((prevState) => ({
								likelyhood_options: options,
								likelyhood_frequency: {
									...prevState.likelyhood_frequency,
									isFetching: false,
								},
							}))
						}
					})
					.catch((err) => {
						set((prevState) => ({
							likelyhood_frequency: {
								...prevState.likelyhood_frequency,
								isFetching: false,
							},
						}))
						toast({
							title: "ERROR",
							description: err.message,
							variant: "destructive",
						})
					})
			},
			async fetchOptionsSeverityMap() {
				set((prevState) => ({
					likelyhood_frequency: {
						...prevState.likelyhood_frequency,
						isFetching: true,
					},
				}))
				getDataApi<SeverityMap[]>(SEVERITY_MAP_EP)
					.then((data) => {
						if (data && Array.isArray(data.data)) {
							const options: SelectDataType[] = (
								data.data || []
							).map((cell) => ({
								label: `(${cell.column_value}) ${cell.column_deviation}: ${cell.severity_map_value}`,
								value: cell.column_value?.toString(),
								saverity_row_id: cell.row_value,
							}))

							set((prevState) => ({
								severity_map_options: options,
								severity_map: {
									...prevState.severity_map,
									isFetching: false,
								},
							}))
						}
					})
					.catch((err) => {
						set((prevState) => ({
							severity_map: {
								...prevState.severity_map,
								isFetching: false,
							},
						}))
						toast({
							title: "ERROR",
							description: err.message,
							variant: "destructive",
						})
					})
			},
			async updateColumnCell(columnId, columnName, columnValue) {
				set({
					isSubmitMatrixCell: true,
				})
				return new Promise<ResponseApiType<any>>((resolve, reject) => {
					const formData = new FormData()
					formData.append(columnName, columnValue)
					let EP = ""
					if (columnName.includes("frequency")) {
						EP += LIKELYHOOD_FREQUENCY_EP
					} else if (columnName.includes("deviation")) {
						EP += SEVERITY_MAP_EP
					}
					EP += "/column-cell/" + columnId

					postData<any>(EP, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
						.then((data) => {
							if (data.data) {
								if (columnName.includes("frequency")) {
									const findIndexCol = (
										get().likelyhood_frequency.item
											?.column || []
									).findIndex(
										(col) =>
											col.id?.toString() ===
											columnId.toString()
									)
									const cols =
										get().likelyhood_frequency.item
											?.column || []
									if (findIndexCol > -1) {
										cols[findIndexCol].frequency_name =
											columnValue
									}
									set((prevState) => ({
										likelyhood_frequency: {
											...prevState.likelyhood_frequency,
											item: {
												row:
													prevState
														.likelyhood_frequency
														.item?.row || [],
												column: cols,
											},
										},
									}))
								} else if (columnName.includes("deviation")) {
									const severity_map =
										get().severity_map.item || []
									const severityMap = severity_map.map(
										(severity) => {
											let deviation =
												severity.column_deviation
											if (
												severity.column_value?.toString() ===
												columnId?.toString()
											) {
												deviation = columnValue
											}
											return {
												...severity,
												column_deviation: deviation,
											}
										}
									)
									set((prevState) => ({
										severity_map: {
											...prevState.severity_map,
											item: severityMap,
										},
									}))
								}
							}
							resolve(data)
						})
						.catch((err) => {
							reject(err)
						})
						.finally(() => {
							set({
								isSubmitMatrixCell: false,
							})
						})
				})
			},
			async updateRowCell(rowId, rowName, rowValue) {
				set({
					isSubmitMatrixCell: true,
				})
				return new Promise<ResponseApiType<any>>((resolve, reject) => {
					const formData = new FormData()
					formData.append(rowName, rowValue)
					let EP = ""
					if (rowName.includes("explanation")) {
						EP += LIKELYHOOD_FREQUENCY_EP
					} else if (rowName.includes("severity")) {
						EP += SEVERITY_MAP_EP
					}
					EP += "/row-cell/" + rowId

					postData<any>(EP, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
						.then((data) => {
							if (data.data) {
								if (rowName.includes("explanation")) {
									const findIndexRow = (
										get().likelyhood_frequency.item?.row ||
										[]
									).findIndex(
										(col) =>
											col.id?.toString() ===
											rowId.toString()
									)
									const rows =
										get().likelyhood_frequency.item?.row ||
										[]
									if (findIndexRow > -1) {
										rows[findIndexRow].explanation_name =
											rowValue
									}
									set((prevState) => ({
										likelyhood_frequency: {
											...prevState.likelyhood_frequency,
											item: {
												row:
													prevState
														.likelyhood_frequency
														.item?.row || [],
												column:
													prevState
														.likelyhood_frequency
														.item?.column || [],
											},
										},
									}))
								} else if (rowName.includes("severity")) {
									const severity_map =
										get().severity_map.item || []
									const severityMap = severity_map.map(
										(item) => {
											let severity = item.row_severity
											if (
												item.row_value?.toString() ===
												rowId?.toString()
											) {
												severity = rowValue
											}
											return {
												...item,
												row_severity: severity,
											}
										}
									)
									set((prevState) => ({
										severity_map: {
											...prevState.severity_map,
											item: severityMap,
										},
									}))
								}
							}
							resolve(data)
						})
						.catch((err) => {
							reject(err)
						})
						.finally(() => {
							set({
								isSubmitMatrixCell: false,
							})
						})
				})
			},
			async updateRowColCell(
				columnId,
				rowId,
				value,
				matrixField,
				color?: string
			) {
				set({
					isSubmitMatrixCell: true,
				})
				return new Promise<ResponseApiType<any>>((resolve, reject) => {
					const formData = new FormData()
					if (matrixField === "risk-map") {
						formData.append(`value`, value)
						formData.append(`color`, color || "")
					} else {
						formData.append(`column_${matrixField}_id`, columnId)
						formData.append(`row_${matrixField}_id`, rowId)
						formData.append(`value`, value)
					}
					let EP = ""
					if (matrixField === "likelyhood") {
						EP += LIKELYHOOD_FREQUENCY_EP
					} else if (matrixField === "severity") {
						EP += SEVERITY_MAP_EP
					} else if (matrixField === "risk-map") {
						//rowId = frequency
						//colmnId = deviation
						EP += `${RISK_MAP_EP}/${rowId}/${columnId}`
					}
					if (matrixField !== "risk-map") {
						EP += "/value-cell"
					}

					postData<any>(EP, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
						.then((data) => {
							if (data.data) {
								if (matrixField === "likelyhood") {
									const rows =
										get().likelyhood_frequency.item?.row ||
										[]
									const findIndexRow = rows.findIndex(
										(row) =>
											row.id?.toString() ===
											rowId.toString()
									)

									if (findIndexRow > -1) {
										const cols = rows[findIndexRow].cells
										const findIndexCol = cols.findIndex(
											(col) =>
												col.column_id?.toString() ===
												columnId?.toString()
										)
										cols[findIndexCol].value = value
									}
									set((prevState) => ({
										isSubmitMatrixCell: false,
										likelyhood_frequency: {
											...prevState.likelyhood_frequency,
											item: {
												row: rows,
												column:
													prevState
														.likelyhood_frequency
														.item?.column || [],
											},
										},
									}))
								} else if (matrixField === "severity") {
									const severityMap =
										get().severity_map.item || []
									const findIndexCell = severityMap.findIndex(
										(row) =>
											row.row_value?.toString() ===
												rowId.toString() &&
											row.column_value?.toString() ===
												columnId?.toString()
									)

									if (findIndexCell > -1) {
										severityMap[
											findIndexCell
										].severity_map_value = value
										// cell.severity_map_value = value

										set((prevState) => ({
											isSubmitMatrixCell: false,
											severity_map: {
												...prevState.severity_map,
												item: severityMap,
											},
										}))
									}
								} else if (matrixField === "risk-map") {
									const riskMap = get().risk_map.item || []
									const findIndexCell = riskMap.findIndex(
										(row) =>
											row.frequency?.toString() ===
												rowId.toString() &&
											row.deviation?.toString() ===
												columnId?.toString()
									)

									if (findIndexCell > -1) {
										riskMap[findIndexCell].value = value
										riskMap[findIndexCell].color =
											color || ""
										// cell.severity_map_value = value
									} else {
										riskMap.push({
											color: color || "",
											deviation: columnId,
											value,
											frequency: rowId,
											id: data.data.id,
										})
									}
									set((prevState) => ({
										isSubmitMatrixCell: false,
										risk_map: {
											...prevState.risk_map,
											item: riskMap,
										},
									}))
								}
							}
							resolve(data)
						})
						.catch((err) => {
							reject(err)
							set({
								isSubmitMatrixCell: false,
							})
						})
				})
			},
			async addRowLikelyhoodFrequency() {
				set({
					isProcessAddRowLikelyhood: true,
				})
				return new Promise<ResponseApiType<RowLikelyhoodFrequency>>(
					(resolve, reject) => {
						postData<RowLikelyhoodFrequency>(
							LIKELYHOOD_FREQUENCY_EP + "/add-row"
						)
							.then((data) => {
								if (data.data) {
									const rows =
										get().likelyhood_frequency.item?.row ||
										[]
									rows.push(data.data)

									set((prevState) => ({
										isProcessAddRowLikelyhood: false,
										likelyhood_frequency: {
											...prevState.likelyhood_frequency,
											item: {
												row: rows,
												column:
													prevState
														.likelyhood_frequency
														.item?.column || [],
											},
										},
									}))
								}
								resolve(data)
							})
							.catch((err) => {
								reject(err)
							})
					}
				)
			},
			async deleteLastRowLikelyhoodFrequency() {
				set({
					isProcessAddRowLikelyhood: true,
				})
				return new Promise<ResponseApiType<any>>((resolve, reject) => {
					deleteData<any>(LIKELYHOOD_FREQUENCY_EP + "/delete-row")
						.then((data) => {
							const rows =
								get().likelyhood_frequency.item?.row || []
							rows.pop()

							set((prevState) => ({
								isProcessAddRowLikelyhood: false,
								likelyhood_frequency: {
									...prevState.likelyhood_frequency,
									item: {
										row: rows,
										column:
											prevState.likelyhood_frequency.item
												?.column || [],
									},
								},
							}))
							resolve(data)
						})
						.catch((err) => {
							reject(err)
						})
				})
			},
		},
	})
)

export default useSettingMatrixStore
