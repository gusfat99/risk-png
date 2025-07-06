"use client"
import useConfigAclMenu from "@/store/configAclMenu"
import { useEffect } from "react"
import ConfigRoleAccessMenuForm from "../ConfigRoleAccessMenuForm"

const ConfigRoleAccessMenuAdd = () => {
	const {
		actions: { fetchMenu },
	} = useConfigAclMenu()

	useEffect(() => {
		fetchMenu({
			per_page: 1000,
		})
	}, [fetchMenu])

	return <ConfigRoleAccessMenuForm />
}

export default ConfigRoleAccessMenuAdd
