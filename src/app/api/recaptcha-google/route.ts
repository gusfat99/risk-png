import { API_URL_GOOGLE_RECAPTCHA, RECAPTCHA_KEY_SERVER } from "@/constants"
import axios from "axios"

export async function POST(req: Request) {
	if (req.method !== "POST") {
		return new Response(
			JSON.stringify({ message: "Only POST requests allowed" }),
			{ status: 405 }
		)
	}

	const data = await req.json()
	const { token } = data
	const secretKey: string | undefined = RECAPTCHA_KEY_SERVER

	if (!token) {
		return new Response(JSON.stringify({ message: "Token not found" }), {
			status: 405,
		})
	}

	try {
		const response = await axios.post(
			`${API_URL_GOOGLE_RECAPTCHA}?secret=${secretKey}&response=${token}`
		)

		if (response.data.success) {
			return new Response(JSON.stringify({ message: "Success" }), {
				status: 200,
			})
		} else {
			return new Response(
				JSON.stringify({ message: "Failed to verify" }),
				{
					status: 405,
				}
			)
		}
	} catch (error) {
		console.log({ error });
		return new Response(
			JSON.stringify({ message: "Internal Server Error" }),
			{
				status: 500,
			}
		)
	}
}
