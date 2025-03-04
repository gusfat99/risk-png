import InputSearch from "@/components/inputs/InputSearch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import React from "react"

const NodeDataModule = () => {
	return (
      <div className="w-full" >
         <div className="grid grid-cols-4" ></div>
         <InputSearch label="Filter Data" isRequired={false} placeholder="Search..." />
         <Select>
            <Label>Filter Data</Label>
				<SelectTrigger className="w-[98px]">
					<SelectValue placeholder="Tahun" />
				</SelectTrigger>
				<SelectContent></SelectContent>
			</Select>
		</div>
	)
}

export default NodeDataModule
