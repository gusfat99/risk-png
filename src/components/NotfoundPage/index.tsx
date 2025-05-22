import React from "react"
import { Button } from "../ui/button"
import bgVector from "@/assets/images/vector.png"
import hero404 from "@/assets/images/404.png"
import Image from "next/image"

const NotfoundPage = () => {
	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gray-200 overflow-hidden rounded-xl">
			{/* Background Vector */}
			<Image
				src={bgVector}
				alt="background vector"
				className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20"
				width={1920}
				height={1080}
			/>

			{/* Content */}
			<div className="flex flex-col md:flex-row items-center w-6xl gap-12 justify-between">
				{/* Text Section */}
				<div className="flex-1 h-80 justify-between flex flex-col">
					<div className="flex flex-col justify-between md:text-left">
						<h1 className="text-4xl font-bold text-gray-800 mb-4">
							Ooops...
						</h1>
						<p className="text-2xl font-semibold text-gray-700 mb-2">
							Page not found
						</p>
					</div>
					<Button
						// onClick={() => navigate(-1)}
						className="bg-primary hover:bg-primary text-white"
					>
						Go Back →
					</Button>
				</div>

				{/* Image Section */}
				<div className="flex-1">
					<Image
						src={hero404}
						alt="404 Illustration"
						className="max-w-md mx-auto w-[1000px] h-auto"
						width={1200}
						height={1200}
						draggable={false}
					/>
				</div>
			</div>
		</div>
	)
}

export default NotfoundPage
