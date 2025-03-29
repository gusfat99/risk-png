import { SelectDataType } from "@/types/common";

export type NodeOptionType = {
   name: string;
   value: string;
}

export const hazopStatus: SelectDataType[] = [
   {
      label: "Pending",
      value : "pending",
   },
   {
      label: "On Progress",
      value : "In Progress",
   },
   {
      label: "Done",
      value : "done",
   },
];