"use client"
import LoadingIndicator from "@/components/LoadingIndicator"
import useConfigAclMenu from "@/store/configAclMenu"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import ConfigMenuForm from "../ConfigMenuForm"

const ConfigMenuUpdate = () => {
	const params = useParams()
	const {
		isFetching,
		menuItem,
		actions: {  fetchMenuDetail },
	} = useConfigAclMenu()

	useEffect(() => {
		if (params.id) {
			fetchMenuDetail && fetchMenuDetail(params.id);
		}
		
	}, [params.id, fetchMenuDetail])

	return (
		<div className="w-full h-fit">
			{isFetching && <LoadingIndicator />}
			{!isFetching && menuItem && <ConfigMenuForm isEdit />}
		</div>
	)
}

export default ConfigMenuUpdate
