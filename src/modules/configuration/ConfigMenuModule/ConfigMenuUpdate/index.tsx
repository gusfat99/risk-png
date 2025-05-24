"use client"
import LoadingIndicator from "@/components/LoadingIndicator"
import useConfigAclMenu from "@/store/configAclMenu"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import ConfigMenuForm from "../ConfigMenuForm"

const ConfifMenuUpdate = () => {
	const params = useParams()
	const {
		isFetching,
		actions: { fetchMenu },
	} = useConfigAclMenu()

	useEffect(() => {
		if (params.id) {
			// fetchSingleData && fetchSingleData(params.id)
		}
		fetchMenu({
			per_page: 1000,
		})
	}, [params.id, fetchMenu])

	return (
		<div className="w-full h-fit">
			{isFetching && <LoadingIndicator />}
			{!isFetching && <ConfigMenuForm isEdit />}
		</div>
	)
}

export default ConfifMenuUpdate
