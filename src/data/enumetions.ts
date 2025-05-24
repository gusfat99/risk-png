import { SelectDataType } from "@/types/common";
import { BadgeCheck, BookCheck, Bookmark, Loader } from "lucide-react";

export type NodeOptionType = {
   name: string;
   value: string;
}

export const hazopStatus: SelectDataType[] = [
   {
      label: "Planned",
      value: "pending",
      color: "text-gray-500",
      icon : Bookmark
   },
   {
      label: "In Progress",
      value: "in_progress",
      color: "text-warning-600",
      icon : Loader
   },
   {
      label: "Completed",
      value : "done",
      color: "text-success",
      icon : BookCheck
   },
   {
      label: "Verified",
      value : "done",
      color: "text-secondary",
      icon : BadgeCheck
   },
];