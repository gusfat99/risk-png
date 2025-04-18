import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const url = searchParams.get("url")

	if (!url) {
		return new NextResponse(JSON.stringify({ error: "Missing URL" }), {
			status: 400,
		})
	}

	// Optional: Batasi domain yang boleh diakses
	if (
		!url.startsWith(
			process.env.NEXT_PUBLIC_API_URL || "https://api-risk.alus.com"
		)
	) {
		return new NextResponse(JSON.stringify({ error: "URL not allowed" }), {
			status: 403,
		})
	}

	try {
		const response = await axios.get(url, {
			responseType: "stream",
			headers: {
				// Forward headers dari client ke Laravel
				Authorization: req.headers.get("Authorization") || "",
			},
		})

		// Clone headers dari Laravel response
		const headers = new Headers()
		Object.entries(response.headers).forEach(([key, value]) => {
			headers.set(key, value as string)
		})

		// Stream data ke client
		const readableStream = response.data
		return new NextResponse(readableStream, {
			status: response.status,
			headers,
		})
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.response?.status || 500 }
		)
	}
}
