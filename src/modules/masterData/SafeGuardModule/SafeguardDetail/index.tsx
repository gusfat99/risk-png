"use client"
import SafeguardItem from "@/components/Items/SafeguardItem"
import LoadingIndicator from "@/components/LoadingIndicator"
import { Card } from "@/components/ui/card"
import useSafeguardStore from "@/store/safeguradStore"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const SafeguardDetail = () => {
	const params = useParams()
	const {
		isFetching,
		safeguardSelected,
		actions: { fetchSingleData },
	} = useSafeguardStore()

	useEffect(() => {
		fetchSingleData && fetchSingleData(params.id)
	}, [params.id, fetchSingleData])

	return (
		<Card className="p-4 w-full lg:w-8/12">
			{isFetching && <LoadingIndicator />}
			{!isFetching && safeguardSelected && (
				<SafeguardItem item={safeguardSelected} />
			)}
		</Card>
	)
}

export default SafeguardDetail
