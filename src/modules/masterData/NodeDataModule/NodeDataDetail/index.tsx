'use client'
import NodeDataCard from "@/components/cards/NodeDataCard"
import useNodeStore from "@/store/nodeStore"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"

const NodeDataDetail = () => {
	const params = useParams()
	const {
		actions: { fetchSingleData },
		isFetching,
		nodeSelected,
	} = useNodeStore()

	useEffect(() => {
		fetchSingleData && fetchSingleData(params.id)
	}, [params.id, fetchSingleData])

	return (
		<div className="w-full">
			{isFetching && <NodeDataCard.Skeleton />}
			{!isFetching && nodeSelected && (
				<NodeDataCard nodeSelected={nodeSelected} />
			)}
		</div>
	)
}

export default NodeDataDetail
