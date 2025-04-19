import { SAFEGUARDS_PATHNAME_STORAGE } from "@/constants"
import { Safeguard } from "@/types/safeguard"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import React from "react"

interface SafeguardItemProps {
	item: Safeguard
}

const SafeguardItem: React.FC<SafeguardItemProps> = ({ item }) => {
	return (
		<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			<div>
				<p className="text-sm font-medium text-gray-500">
					Safeguard Name
				</p>
				<p className=" text-md">{item.safeguard}</p>
				<p className="text-sm font-medium text-gray-500 mt-2">
					Safeguard Doc. Title
				</p>
				<p className="text-md text-gray-700">{item.safeguard_title}</p>
			</div>
			<div className="mt-2 md:mt-0">
				<p className="text-sm font-medium text-gray-500">Document</p>
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
	)
}

export default SafeguardItem
