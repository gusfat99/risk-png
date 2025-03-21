import { z } from "zod"

export const NodeSchema = z.object({
	node: z
		.string({
			message: "Node is required",
		})
		.min(1, { message: "Node is required" }),
	node_description: z
		.string({
			message: "Node Description  is required",
		})
		.min(1, { message: "Node Description is required" }),
	node_location: z
		.string({
			message: "Node Location is required",
		})
		.min(1, { message: "Node Location is required" }),
	drawing_reference: z
		.string({
			message: "Drawing Reference is required",
		})
		.min(1, { message: "Drawing Reference is required" }),
	inlet_pressure: z
		.string()
		.regex(/^\d+(\.\d+)?$/, "Only numbers or decimals with '.' allowed")
		.min(0, { message: "Inlet Pressure is required" }),
	outlet_pressure: z
		.string()
		.regex(/^\d+(\.\d+)?$/, "Only numbers or decimals with '.' allowed")
		.min(0, { message: "Outlet Pressure is required" }),
	remark_node: z
		.string({
			message: "Remark Node is required",
		})
		.min(1, { message: "Remark is required" }),
})

export const initialValueNode = {
	node: "",
	node_description: "",
	node_location: "",
	drawing_reference: "",
	inlet_pressure: "0",
	outlet_pressure: "0",
	remark_node: "",
}
