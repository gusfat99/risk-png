import { useEffect } from "react"

const useInactivityTimer = (
	logoutCallback: () => void,
	timeoutMinutes = 30
) => {
	useEffect(() => {
		let timeoutId: NodeJS.Timeout
		const timeoutMilliseconds = timeoutMinutes * 60 * 1000

		const resetTimer = () => {
			if (timeoutId) clearTimeout(timeoutId)
			timeoutId = setTimeout(logoutCallback, timeoutMilliseconds)
		}

		// Event listeners untuk aktivitas pengguna
		const events = ["mousedown", "keydown", "scroll", "touchstart", "wheel"]
		events.forEach((event) => window.addEventListener(event, resetTimer))

		// Mulai timer pertama kali
		resetTimer()

		// Cleanup
		return () => {
			clearTimeout(timeoutId) // <<< PEMBERSIHAN PENTING
			events.forEach((event) =>
				window.removeEventListener(event, resetTimer)
			)
		}
	}, [logoutCallback, timeoutMinutes])
}

export default useInactivityTimer
