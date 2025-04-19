import { Skeleton } from "@/components/ui/skeleton"
import { SAFEGUARDS_PATHNAME_STORAGE } from "@/constants"
import { Safeguard } from "@/types/safeguard"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import React from "react"

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
	ItemSkeleton : typeof SafeguardItemSkeleton
}

const SafeguardList: SafeguardListComponent = ({ safeguards }) => {
	return (
		<ul className="space-y-4">
			{safeguards.map((item, index) => (
				<li
					key={index}
					className="bg-gray-50 hover:bg-gray-100 transition-colors px-6 py-4 rounded-xl shadow-sm text-gray-700"
				>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<p className="text-sm font-medium text-gray-500">
								Safeguard Name
							</p>
							<p className=" text-md">
								{item.safeguard}
							</p>
							<p className="text-sm font-medium text-gray-500 mt-2">
								Safeguard Doc. Title
							</p>
							<p className="text-sm text-gray-700">
								{item.safeguard_title}
							</p>
						</div>
						<div className="mt-2 md:mt-0">
							<p className="text-sm font-medium text-gray-500">
								Document
							</p>
							<Link
								href={`${SAFEGUARDS_PATHNAME_STORAGE}/${item.file_path}`}
								target="_blank"
								download
								className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm mt-1"
							>
								<ExternalLink className="w-5 h-5" />
								Preview
							</Link>
						</div>
					</div>
				</li>
			))}
		</ul>
	)
}
		
SafeguardList.ItemSkeleton = SafeguardItemSkeleton;

export default SafeguardList
