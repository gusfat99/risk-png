"use client"
import PertaminGasColor from "@/assets/images/pertamina-gas-color.png"
import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { AuthSchema } from "@/schemas/AuthSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RECAPTCHA_KEY_CLIENT } from "@/constants"
import axios from "axios"
import { useRouter } from "next/navigation"
import Spinner from "@/components/ui/spinner"
import { setIsLoggedIn } from "@/services/cookies"

const LoginMain = () => {
	const [visibilityPassword, setVisibilityPassword] = useState<string>("off")
	const recaptchaRef = useRef<ReCAPTCHA>(null)
	const [isVerified, setIsVerified] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const route = useRouter()

	const form = useForm<z.infer<typeof AuthSchema>>({
		resolver: zodResolver(AuthSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			password: "",
			email: "",
		},
	})
	const handleSubmit = () => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoggedIn()
				.then(() => {
					route.push("/dashboard")
				})
				.finally(() => {
					setIsLoading(false)
				})
		}, 500)
	}

	const handleChangeReCaptcha = (token: string | null) => {
		// handleCaptchaSubmission(token);
		axios
			.post("/api/recaptcha-google", { token })
			.then((response) => {
				if (response.status === 200) {
					setIsVerified(true)
				}
			})
			.catch((err) => {
				console.log({ err })
				setIsVerified(false)
			})
		console.log({ token })
	}

	function handleExpired() {
		setIsVerified(false)
	}
	return (
		<div className="relative h-screen w-full flex justify-center items-center">
			<div className="backdrop-blur-lg px-10 py-12 bg-white/40 rounded-lg w-[478px] flex flex-col gap-5">
				<Image
					alt="logo-pertamina-gas"
					src={PertaminGasColor}
					width={280}
					height={84}
					className="mx-auto mb-5"
					draggable={false}
				/>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name={"email"}
							render={({ field }) => (
								<InputController
									{...field}
									labelClassName="text-white"
									type="email"
									autoComplete={"off"}
									label="Email"
									placeholder="Masukan Email Anda"
									onChange={(e) => {
										form.setValue("email", e.target.value)
									}}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name={"password"}
							render={({ field }) => (
								<InputController
									{...field}
									labelClassName="text-white"
									type={
										visibilityPassword === "show"
											? "text"
											: "password"
									}
									passwordVisible={
										visibilityPassword === "show"
									}
									onClickShuffix={() => {
										if (visibilityPassword === "show")
											setVisibilityPassword("off")
										else setVisibilityPassword("show")
									}}
									secure
									autoComplete={"off"}
									label="Kata Sandi"
									placeholder="Masukan Kata Sandi Anda"
									onChange={(value) => {
										form.setValue(
											"password",
											value.target.value
										)
									}}
								/>
							)}
						/>

						<ReCAPTCHA
							sitekey={RECAPTCHA_KEY_CLIENT || ""}
							ref={recaptchaRef}
							onChange={handleChangeReCaptcha}
							onExpired={handleExpired}
							className="font-[family-name:var(--font-poppins)]"
						/>
						<Button
							size={"lg"}
							className="w-full"
							disabled={!isVerified || isLoading}
						>
							{isLoading && <Spinner className="w-4 h-4" />}
							Masuk
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default LoginMain
