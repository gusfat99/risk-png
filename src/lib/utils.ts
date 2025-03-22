import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function generateYears(backward: number = 0, forward: number = 0 ): string[] {
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

export function toSentenceCase(str : string) {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
