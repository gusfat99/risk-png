import InputSelectController from "@/components/inputs/InputSelectController"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import Spinner from "@/components/ui/spinner"
import { toast } from "@/hooks/use-toast"
import { AppetiteSchema } from "@/schemas/SettingMatrixSchemat"
import useSettingMatrixStore from "@/store/settingMatrixStore"
import { SelectDataType } from "@/types/common"
import { AppetiteSchemaForm } from "@/types/settingMatrix"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { Skeleton } from "@/components/ui/skeleton"

interface IProps {
	riskApetiteDefault: string
}


export function RiskAppetiteSkeleton() {
  return (
    <Card className="flex flex-row gap-4 p-4 items-center">
      <Skeleton className="h-4 w-32" /> {/* Label placeholder */}
      <Skeleton className="h-10 min-w-40 rounded-md" /> {/* Input select */}
      <Skeleton className="h-10 w-36 rounded-md" /> {/* Button */}
    </Card>
  )
}


interface RiskApetiteComponent extends React.FC<IProps> {
	Skeleton: typeof RiskAppetiteSkeleton;
}

const RiskApetite: RiskApetiteComponent = ({ riskApetiteDefault = "15" }) => {
	const {
		isSubmitAppetite,
		actions: { updateAppetite },
	} = useSettingMatrixStore()
	
	const optionsApetite: SelectDataType[] = Array.from(
		{ length: 25 },
		(_, i) => ({
			label: (i + 1).toString(),
			value: (i + 1).toString(),
		})
	)

	const form = useForm<AppetiteSchemaForm>({
		resolver: zodResolver(AppetiteSchema),
		progressive: false,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			risk_apetite: riskApetiteDefault,
		},
	})

	const handleSubmit = (value: AppetiteSchemaForm) => {
		updateAppetite &&
			updateAppetite(value).then((res) => {
				toast({
					title: "Success",
					variant: "success",
					description: res.message,
				})
			})
	}

	return (
		<div className="w-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<Card className="flex flex-row gap-4 p-4 items-center">
						<Label className="font-semibold">Risk Appetite</Label>
						<FormField
							control={form.control}
							name={"risk_apetite"}
							render={({ field }) => (
								<InputSelectController
									field={field}
									items={optionsApetite}
									placeholder={"Select Risk Appetite"}
									onChange={(value) => {
										form.setValue("risk_apetite", value)
									}}
									className="min-w-40"
								/>
							)}
						/>
						<Button
							disabled={isSubmitAppetite}
							variant={"secondary"}
						>
							{isSubmitAppetite && (
								<Spinner className="w-4 h-4" />
							)}
							{!isSubmitAppetite && <Save />}
							Save Appetite
						</Button>
					</Card>
				</form>
			</Form>
		</div>
	)
}

RiskApetite.Skeleton = RiskAppetiteSkeleton;

export default RiskApetite
