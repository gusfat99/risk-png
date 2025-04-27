"use client"
import React, { useEffect } from "react"
import LikelyhoodFrequency from "./LikelyhoodFrequence"
import SeverityMap from "./SeverityMap"
import RiskMap from "./RiskMap"
import { useRouteGetTitle } from "@/hooks/use-route-navigate"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import useAuthStore from "@/store/authStore"

const SettingMatrixModule = () => {
	const { icon: Icon, title } = useRouteGetTitle()
	const {year_selected} = useAuthStore();
	const {
		actions: { fetchLikelyhood, fetchSeverityMap, fetchRiskMap },
	} = useSettingMatrixStore()

	useEffect(() => {
		fetchLikelyhood()
		fetchSeverityMap()
		fetchRiskMap()
	}, [fetchLikelyhood, fetchSeverityMap, fetchRiskMap, year_selected])

	return (
		<div className="max-w-full space-y-4">
			<div className="rounded-md w-full bg-primary p-4 flex text-white mt-2">
				{Icon && <Icon />} <span className="ml-2">{title}</span>
			</div>
			<LikelyhoodFrequency />
			<SeverityMap />
			<RiskMap />
		</div>
	)
}

export default SettingMatrixModule
