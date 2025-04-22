"use client"
import Image from "next/image"
import React, { useRef, useState } from "react"
import AvatarDummy from "@/assets/images/dummy-avatar.png"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import imageCompression from "browser-image-compression"
import { Skeleton } from "@/components/ui/skeleton"
import { PROFILE_PATHNAME_STORAGE } from "@/constants"

export interface UploadAvatarProps {
	handleChange(file: File | null): void
	defaultValue?: any
}

const AvatarUploadSkeleton = () => {
	return (
		<div className="flex flex-row gap-4 items-center">
			{/* Avatar Skeleton */}
			<div className="overflow-hidden rounded-full max-w-[110px] h-[110px] w-full">
				<Skeleton className="w-full h-full rounded-full" />
			</div>

			{/* Text + Button Skeleton */}
			<div className="flex flex-col gap-2 w-full">
				<div className="space-x-2 flex">
					<Skeleton className="h-9 w-20 rounded-md" />
					<Skeleton className="h-9 w-20 rounded-md" />
				</div>
				<Skeleton className="h-4 w-2/3" />
			</div>
		</div>
	)
}

interface UploadAvatarComponent extends React.FC<UploadAvatarProps> {
	Skeleton: typeof AvatarUploadSkeleton
}

const UploadAvatar: UploadAvatarComponent = ({
	handleChange,
	defaultValue,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [preview, setPreview] = useState<string | null>(null)

	const handleUploadClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		// Kompresi gambar
		try {
			const compressedBlob = await imageCompression(file, {
				maxSizeMB: 0.8, // Maksimum 800KB
				maxWidthOrHeight: 512, // Resize juga agar tidak terlalu besar
				useWebWorker: true,
			})

			// Convert Blob ke File
			const compressedFile = new File([compressedBlob], file.name, {
				type: compressedBlob.type,
				lastModified: Date.now(),
			});

			// Buat preview dari file hasil kompres
			const previewUrl = URL.createObjectURL(compressedFile)
			setPreview(previewUrl)

			handleChange(compressedFile)
		} catch (err) {
			console.error("Compression error:", err)
			toast({
				title: "Error",
				description: "Failed to compress image.",
				variant: "destructive",
			})
		}
	}

	const handleReset = () => {
		setPreview(null)
		handleChange(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}

	return (
		<div className="flex flex-row gap-4 items-center">
			<div className="overflow-hidden rounded-full max-w-[110px] h-[110px] w-full">
				<Image
					src={
						preview ||
						(defaultValue
							? `${PROFILE_PATHNAME_STORAGE}/${defaultValue}`
							: AvatarDummy)
					}
					alt="avatar-pertamina-gas"
					className="overflow-hidden w-full h-full object-cover"
					width={110}
					height={140}
					draggable={false}
				/>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<div className="space-x-2">
					<Button
						type="button"
						variant={"secondary"}
						onClick={handleUploadClick}
					>
						Upload
					</Button>
					<Button
						type="button"
						variant={"outline"}
						onClick={handleReset}
					>
						Reset
					</Button>
				</div>
				<span className="text-gray-400 text-sm">
					Allowed .jpg or .png Max. size 800Kb
				</span>
				<input
					type="file"
					accept=".jpg,.jpeg,.png"
					ref={fileInputRef}
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>
		</div>
	)
}

UploadAvatar.Skeleton = AvatarUploadSkeleton

export default UploadAvatar
