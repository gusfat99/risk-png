// HazopRecommendationList.jsx
import NotFoundData from "@/components/NotFoundData"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HAZOP_PATHNAME_STORAGE } from "@/constants"
import { Hazop } from "@/types/riskResponse"
import { Download } from "lucide-react"
import Link from "next/link"

interface HazopRecommendationListProps {
	data: Hazop[]
}

export default function HazopRecommendationList(
	props: HazopRecommendationListProps
) {
	const { data } = props

	if (data.length === 0) {
		return (
			<NotFoundData description="There are currently no HAZOP recommendations available." />
		)
	}

	return (
		<div className="grid gap-4 p-4">
			{data.map((item, key) => (
				<Card
					key={(item?.id || 0) + key}
					className="rounded-2xl shadow-md"
				>
					<CardContent className="p-6 space-y-4">
						<h4 className="text-lg font-semibold text-gray-800">
							{item.hazop_recom}
						</h4>
						<div className="flex flex-row justify-between">
							<div className="text-sm text-gray-600">
								<p>
									<span className="font-medium">
										Responsibility:
									</span>{" "}
									{item.responsibility}
								</p>
								<p>
									<span className="font-medium">
										Due Date:
									</span>{" "}
									{item.due_date}
								</p>
							</div>
							{item.document_report && (
								<Link
									href={`${HAZOP_PATHNAME_STORAGE}/${item.document_report}`}
									download={true}
									target="_blank"
								>
									<Button
										variant="outline"
										className="flex items-center gap-2"
									>
										<Download className="w-4 h-4" />
										Download Report
									</Button>
								</Link>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
