import { SelectDataType } from "@/types/common";

export type NodeOptionType = {
   name: string;
   value: string;
}

export const hazopStatus: SelectDataType[] = [
   {
      label: "Pending",
      value: "pending",
      color: "text-gray-500"
   },
   {
      label: "On Progress",
      value: "in_progress",
      color: "text-warning-600"
   },
   {
      label: "Done",
      value : "done",
      color : "text-success"
   },
];