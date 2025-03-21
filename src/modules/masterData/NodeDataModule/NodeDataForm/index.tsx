"use client"
import InputController from "@/components/inputs/InputController"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { initialValueNode, NodeSchema } from "@/schemas/NodeSchema"
import useNodeStore from "@/store/nodeStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const NodeDataForm = () => {
	const {
		isSubmit,
		actions: { createData },
	} = useNodeStore()
	const { toast } = useToast()
	const route = useRouter()

	const form = useForm<z.infer<typeof NodeSchema>>({
		resolver: zodResolver(NodeSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: initialValueNode,
	})


	const handleSubmit = async (values: z.infer<typeof NodeSchema>) => {
		try {
			if (createData) {
				const result = await createData(values)
		
				if (result) {
					toast({
						title: result.message ?? "",
						variant: "success",
					})
					form.reset(initialValueNode)
					route.replace("/data-master-node-data")
				} else {
					throw new Error("Failed")
				}
			} else {
				console.error("createData is undefined")
			}
		} catch (error) {
			toast({
				title:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
				variant: "destructive",
			})
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name={"node"}
					render={({ field }) => (
						<InputController
							{...field}
							label="Node"
							placeholder="Enter Node Name"
							onChange={(e) => {
								form.setValue("node", e.target.value)
							}}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name={"node_description"}
					render={({ field }) => (
						<InputController
							{...field}
							label="Node Description"
							placeholder="Enter Node Description"
							onChange={(e) => {
								form.setValue(
									"node_description",
									e.target.value
								)
							}}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name={"node_location"}
					render={({ field }) => (
						<InputController
							{...field}
							label="Node Location"
							placeholder="Enter Node Location"
							onChange={(e) => {
								form.setValue("node_location", e.target.value)
							}}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name={"drawing_reference"}
					render={({ field }) => (
						<InputController
							{...field}
							label="Drawing Reference"
							placeholder="Enter Drawing Reference"
							onChange={(e) => {
								form.setValue(
									"drawing_reference",
									e.target.value
								)
							}}
						/>
					)}
				/>

				<div className="text-secondary space-y-2">
					Operating Condition :
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name={"inlet_pressure"}
						render={({ field }) => (
							<InputController
								{...field}
								label="Inlet Pressure (Bar)"
								placeholder="Enter Inlet Pressure"
								onChange={(e) => {
									form.setValue(
										"inlet_pressure",
										e.target.value
									)
								}}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={"outlet_pressure"}
						render={({ field }) => (
							<InputController
								{...field}
								label="Outlet Pressure"
								placeholder="Enter Outlet Pressure"
								onChange={(e) => {
									form.setValue(
										"outlet_pressure",
										e.target.value
									)
								}}
							/>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name={"remark_node"}
					render={({ field }) => (
						<InputController
							{...field}
							label="Notes Special Condition / Remarks"
							placeholder="Enter Notes Special Condition"
							onChange={(e) => {
								form.setValue("remark_node", e.target.value)
							}}
						/>
					)}
				/>
				<div className="flex justify-end gap-4">
					<Link href={"/data-master-node-data"}>
						{" "}
						<Button variant={"outline"} disabled={isSubmit}>
							Cancel
						</Button>
					</Link>
					<Button disabled={isSubmit} variant={"secondary"}>
						{isSubmit && <Spinner className="w-4 h-4" />}
						<Save /> Save Data
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default NodeDataForm
