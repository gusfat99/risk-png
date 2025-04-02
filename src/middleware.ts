import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
	const hasLoggedIn = req.cookies.get("hasLoggedin")?.value === "true" // Ambil nilai cookie

	const url = req.nextUrl.clone() // Clone URL saat ini untuk manipulasi
	if (
		url.pathname.includes("/icon") ||
		url.pathname.includes("/favicon.ico") ||
		url.pathname.includes("/_next")
	) {
		return NextResponse.next() // Lanjutkan ke halaman jika tidak perlu redirect
	}

	// Jika belum login, hanya boleh akses /login
	if (!hasLoggedIn) {
		if (!url.pathname.startsWith("/api")) {
			if (url.pathname !== "/login") {
				url.pathname = "/login" // Redirect ke /login
				return NextResponse.redirect(url)
			}
		}
	} else {
		// Jika sudah login, tidak boleh akses /login, redirect ke /dashboard
		if (url.pathname === "/login") {
			url.pathname = "/dashboard" // Redirect ke /dashboard
			return NextResponse.redirect(url)
		}
	}

	return NextResponse.next() // Lanjutkan ke halaman jika tidak perlu redirect
}

export const config = {
	matcher: "/:path*", // Terapkan middleware ke semua route
}
