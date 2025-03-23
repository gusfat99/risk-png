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

export function shortenFileName(filename : string, maxWords :number = 4) {
	const lastDotIndex = filename.lastIndexOf('.');
	const name = lastDotIndex === -1 ? filename : filename.slice(0, lastDotIndex);
	const ext = lastDotIndex === -1 ? '' : filename.slice(lastDotIndex);
	
	const words = name.split(' ');
	
	
	if (words.length > maxWords) {
	  const shortenedName = words.slice(0, maxWords).join(' ') + '....';
	  return shortenedName + ext;
	} else {
	  return filename;
	}
 }
