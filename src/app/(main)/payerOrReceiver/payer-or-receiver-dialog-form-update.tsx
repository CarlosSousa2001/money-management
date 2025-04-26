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
import { translatePayerOrReceiver } from "@/utils/translations-payer-or-receiver";
import { payerOrReceiverUpdateSchema, PayerOrReceiverUpdateSchemaData } from "./zod/payer-or-receiver-schema";
import { TransactionPayerReceiverBase } from "../home/types/home-types-schema";
import { useUpdatePayerOrReceiver } from "./hooks/use-update-payer-or-receiver";
import { PayerOrReceiverBaseUnit } from "../transactions/types/transactions-schema-types";


interface Props {
    onClose: (open: boolean) => void;
    item: PayerOrReceiverBaseUnit
}

export function PayerOrReceiverDialogFormUpdate({ onClose, item }: Props) {

    const { handleUpdatePayerOrReceiver, loadingUpdate } = useUpdatePayerOrReceiver()

    const form = useForm<PayerOrReceiverUpdateSchemaData>({
        mode: "onSubmit",
        resolver: zodResolver(payerOrReceiverUpdateSchema),
        values: {
            id: item.id,
            name: item.name,
            description: item.description,
            userType: item.userType,
        }
    })

    const { formState: { errors } } = form

    console.log(errors)

    async function onSubmit(data: PayerOrReceiverUpdateSchemaData) {
        console.log(data)
        const res = await handleUpdatePayerOrReceiver(data)
        if (!res) return
        onClose(false)
        console.log(res)
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
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input placeholder="Uma companhia que produz sabão" {...field} />
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
                        name="userType"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Tipo do pagador</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="min-w-full">
                                            <SelectValue placeholder="Selecione uma moeda" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(TransactionPayerReceiverBase).map(([key, value]) => (
                                            <SelectItem key={value} value={value}>
                                                {translatePayerOrReceiver(value)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>Escolha a moeda</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {loadingUpdate ? (
                        <Button type="button" disabled={loadingUpdate}>
                            <LoaderCircle className="size-5 w-24" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={loadingUpdate}
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