import { Skeleton } from "@/components/ui/skeleton"
import { SAFEGUARDS_PATHNAME_STORAGE } from "@/constants"
import { Safeguard } from "@/types/safeguard"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import React from "react"
import SafeguardItem from "../SafeguardItem"

interface IProps {
	safeguards: Safeguard[]
}

const SafeguardItemSkeleton = () => (
	<li className="bg-gray-50 px-6 py-4 rounded-xl shadow-sm">
		<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			<div className="space-y-2">
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-6 w-48" />
				<Skeleton className="h-4 w-36 mt-2" />
				<Skeleton className="h-5 w-64" />
			</div>
			<div className="mt-2 md:mt-0 space-y-2">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-6 w-20" />
			</div>
		</div>
	</li>
)
interface SafeguardListComponent extends React.FC<IProps> {
	ItemSkeleton: typeof SafeguardItemSkeleton
}

const SafeguardList: SafeguardListComponent = ({ safeguards }) => {
	return (
		<ul className="space-y-4">
			{safeguards.map((item, index) => (
				<li
					key={index}
					className="bg-gray-50 hover:bg-gray-100 transition-colors px-6 py-4 rounded-xl shadow-sm text-gray-700"
				>
					<SafeguardItem item={item} />
				</li>
			))}
		</ul>
	)
}

SafeguardList.ItemSkeleton = SafeguardItemSkeleton

export default SafeguardList
