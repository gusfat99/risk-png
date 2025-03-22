import { Node } from "@/types/node"

export const parseNodeDataToView = (data: Node) => {
	return {
		node: data.node,
		node_description: data.node_description,
		node_location: data.node_location,
		drawing_reference: data.drawing_reference,
		inlet_pressure: data.inlet_pressure,
		outlet_pressure: data.outlet_pressure,
		remark_node: data.remark_node,
	}
}
