import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function generateYears(
	backward: number = 0,
	forward: number = 0
): string[] {
	const currentYear = new Date().getFullYear()
	const years: string[] = []

	for (let i = backward; i > 0; i--) {
		years.push((currentYear - i).toString())
	}

	for (let i = 0; i <= forward; i++) {
		years.push((currentYear + i).toString())
	}

	return years
}

export function toSentenceCase(str: string) {
	if (!str) return ""
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function shortenFileName(
	filename: string,
	maxWords: number = 4,
	maxLength?: number
) {
	const lastDotIndex = filename.lastIndexOf(".")
	maxLength = maxLength ?? 0
	const name =
		lastDotIndex === -1 ? filename : filename.slice(0, lastDotIndex)
	const ext = lastDotIndex === -1 ? "" : filename.slice(lastDotIndex)

	const words = name.split(/[ \-_]+/)

	if (words.length > maxWords) {
		let shortenedName = words.slice(0, maxWords).join(" ") + "...."
		if (maxLength > 0) {
			shortenedName = shortenedName.slice(0, maxLength) + "...."
		}
		return shortenedName + ext
	} else if (maxLength > 0) {
		const shortenedName = words.slice(0, maxLength) + "...."
		return shortenedName + ext
	} else {
		return filename
	}
}

/**
 * Mengelompokkan array of objects berdasarkan properti tertentu
 * @param array Array input yang akan dikelompokkan
 * @param key Nama properti yang digunakan untuk pengelompokan
 * @returns Objek dengan key sebagai nilai properti dan value sebagai array of objects yang sesuai
 */

export function groupBy<T extends Record<string, any>, K extends keyof T>(
	array: T[],
	key: K
): Record<T[K] extends string | number | symbol ? T[K] : string, T[]> {
	return array.reduce((acc, obj) => {
		const groupKey = obj[key]
		if (!acc[groupKey]) {
			acc[groupKey] = []
		}
		acc[groupKey].push(obj)
		return acc
	}, {} as Record<any, T[]>)
}

/**
 * Mengambil nilai properti dari objek berdasarkan path string (dot notation).
 * @param obj - Objek sumber.
 * @param path - Path properti, misalnya 'a.b.c'.
 * @returns Nilai properti jika ada, atau undefined jika tidak ditemukan.
 */
export function getPropByPath<T = any>(
	obj: Record<string, any>,
	path: string
): T | undefined {
	return path.split(".").reduce((acc, key) => acc?.[key], obj) as T
}
