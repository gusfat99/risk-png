"use client"
import useConfigAclMenu from "@/store/configAclMenu"
import { useEffect } from "react"
import ConfigRoleAccessMenuForm from "../ConfigRoleAccessMenuForm"
import LoadingIndicator from "@/components/LoadingIndicator"
import { useParams } from "next/navigation"

const ConfigRoleAccessMenuDetail = () => {
	const { id } = useParams()

	const {
		actions: { fetchMenu, fetchRolePermissonDetail },
		isFetchingRolePermissionDetails,
		rolePermissionDetails,
	} = useConfigAclMenu()

	useEffect(() => {
		fetchMenu({
			per_page: 1000,
		})
		if (id) {
			fetchRolePermissonDetail && fetchRolePermissonDetail(id)
		}
	}, [fetchMenu, fetchRolePermissonDetail, id])

	return (
		<div className="w-full">
			{isFetchingRolePermissionDetails && <LoadingIndicator />}
			{rolePermissionDetails && !isFetchingRolePermissionDetails && (
				<ConfigRoleAccessMenuForm isDetail />
			)}
		</div>
	)
}

export default ConfigRoleAccessMenuDetail
