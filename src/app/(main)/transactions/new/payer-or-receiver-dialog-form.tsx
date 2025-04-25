import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormSetValue } from "react-hook-form";
import { payerOrReceiverSchema, PayerOrReceiverSchemaData } from "./zod/payer-or-receiver-schema";
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
import { TransactionPayerReceiverBase } from "../../home/types/home-types-schema";
import { LoaderCircle } from "lucide-react";
import { useCreatePayerOrReceiver } from "../hooks/use-create-payer-or-receiver";
import { transactionsFormData } from "./zod/transactions-schema";
import { translatePayerOrReceiver } from "@/utils/translations-payer-or-receiver";

interface Props {
    onClose: (open: boolean) => void;
    setValueContext: UseFormSetValue<transactionsFormData>
}

export function PayerOrReceiverDialogForm({ onClose, setValueContext }: Props) {

    const { handleCreatePayerOrReceiver, loadingUpdate } = useCreatePayerOrReceiver()

    const form = useForm<PayerOrReceiverSchemaData>({
        mode: "onSubmit",
        resolver: zodResolver(payerOrReceiverSchema)
    })

    const { formState: { errors } } = form

    console.log(errors)

    async function onSubmit(data: PayerOrReceiverSchemaData) {
        console.log(data)
        const res = await handleCreatePayerOrReceiver(data)
        if (!res) return
        setValueContext("payerOurReceiver", res.data.name)
        onClose(false)
        console.log(res)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Crie um novo pagamento ou recebedor </DialogTitle>
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