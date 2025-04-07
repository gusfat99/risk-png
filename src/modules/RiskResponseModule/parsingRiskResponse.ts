import { RiskResponseHazopMultipleSchemaForm } from "@/types/riskResponse"

export const parseViewToPayload = (
	data: RiskResponseHazopMultipleSchemaForm
): FormData => {
	const formData = new FormData()
	data.items.forEach((item, index) => {
		formData.append(`hazops[${index}][hazop_recom]`, item.hazop_recom)
		formData.append(`hazops[${index}][responsibility]`, item.responsibility)
		formData.append(`hazops[${index}][due_date]`, item.due_date)
		if (item.document_report) {
			formData.append(
				`hazops[${index}][document_report]`,
				item.document_report
			)
		}
		if (item.id) {
			formData.append(
				`hazops[${index}][id]`,
				item.id
			)
		}
	})
	return formData
}
