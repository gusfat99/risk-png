"use client"
import MainLogo from "@/assets/images/logomain.svg"
import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { RECAPTCHA_KEY_CLIENT } from "@/constants"
import { useToast } from "@/hooks/use-toast"
import { AuthSchema } from "@/schemas/AuthSchema"
import { setIsLoggedIn } from "@/services/cookies"
import useAuthStore from "@/store/authStore"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { z } from "zod"

const LoginMain = () => {
	const [visibilityPassword, setVisibilityPassword] = useState<string>("off")
	const recaptchaRef = useRef<ReCAPTCHA>(null)
	const [isVerified, setIsVerified] = useState(false)
	const {toast } = useToast();

	const route = useRouter()
	const { loading, login } = useAuthStore()
	
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
	
	const handleSubmit = (values: z.infer<typeof AuthSchema>) => {
		login({
			email: values.email,
			password: values.password,
			"g-recaptcha-response": "",
		})
			.then((res) => {
				
				setIsLoggedIn().then(() => {
					toast({
						title: res.message,
						variant : "success"
					})
					route.replace("/dashboard")
				})
			})
			.catch((err) => {
				console.log(err)
				toast({
					title: err.message,
					variant: "destructive"
				})
			})
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
	}

	function handleExpired() {
		setIsVerified(false)
	}
	
	return (
		<div className="relative h-screen w-full flex justify-center items-center">
			<div className="backdrop-blur-lg px-10 py-12 bg-white/40 rounded-lg w-[478px] flex flex-col gap-5">
				<Image
					alt="logo-pertamina-gas"
					src={MainLogo}
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
									placeholder="Enter your Email"
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
									label="Password"
									placeholder="Enter your Password"
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
							disabled={!isVerified || loading}
						>
							{loading && <Spinner className="w-4 h-4" />}
							Login
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default LoginMain
