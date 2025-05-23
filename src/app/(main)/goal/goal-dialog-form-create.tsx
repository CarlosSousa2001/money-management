import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormSetValue } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { GoalResponseUnit, GoalType } from "./types/goals-schema-types";
import { useUpdateGoal } from "./hooks/use-update-goal";
import { translateGoalType } from "@/utils/translations-goals-type";
import { DateTimePicker } from "@/components/extends/date-picker";
import { ptBR } from "date-fns/locale";
import { goalSchema, GoalSchemaData, goalsSchemaDefault } from "./zod/goal-schema";
import { useCreateGoal } from "./hooks/use-create-gols";

interface Props {
    onClose: (open: boolean) => void;
}

export function GoalDialogFormCreate({ onClose }: Props) {

    const clear = () => {
        onClose(false)
    };

    const { mutate: handleCreateGoal, isPending: isPendingGoal } = useCreateGoal(clear)

    const form = useForm<GoalSchemaData>({
        mode: "onSubmit",
        resolver: zodResolver(goalSchema),
        defaultValues: goalsSchemaDefault
    })

    const { formState: { errors } } = form

    console.log(errors)

    async function onSubmit(data: GoalSchemaData) {
        console.log(data)
        handleCreateGoal(data)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Atualize o pagamento ou recebedor </DialogTitle>
                <DialogDescription>
                    Utilize esses usuários para organizar seus pagamentos e recebimentos.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Compania de sabão" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is value of the transaction.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="target"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Valor</FormLabel>
                                <FormControl>
                                    <Input placeholder="Compania de sabão" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is value of the transaction.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="goalType"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Tipo do objetivo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="min-w-full">
                                            <SelectValue placeholder="Selecione uma moeda" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(GoalType).map(([key, value]) => (
                                            <SelectItem key={value} value={value}>
                                                {translateGoalType(value)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>Escolha a moeda</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="due"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data de Vencimento</FormLabel>
                                <FormControl>
                                    <DateTimePicker
                                        locale={ptBR}
                                        granularity="day"
                                        placeholder="Selecione uma data"
                                        value={field.value ? new Date(field.value) : undefined}
                                        onChange={(date: Date | undefined) =>
                                            field.onChange(date ? date.toISOString() : null)
                                        } />
                                </FormControl>
                                <FormDescription>
                                    Qual a data de vencimento?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {isPendingGoal ? (
                        <Button type="button" disabled={isPendingGoal}>
                            <LoaderCircle className="size-5 w-24" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={isPendingGoal}
                            className="w-28"
                        >
                            salvar
                        </Button>

                    )}

                </form>
            </Form>
        </DialogContent>
    )
}