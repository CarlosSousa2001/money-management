import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react";
import Link from "next/link";

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { translateTransactionStatus } from "@/utils/translations-transactions-status";
import { TransactionResponseUnit } from "../types/transactions-schema-types";
import { renderCurrencyTag } from "@/utils/currency-color-map";
import { renderTransactionStatusTag } from "@/utils/status-color-map";
import { useDeleteTransactionsSoftDelete } from "../hooks/use-delete-transactions-soft-delete";
import { useState } from "react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDelete } from "@/components/alert-delete";
import { translateTransactionType } from "@/utils/translations-transaction-type";

interface TransactionProps {
    transaction: TransactionResponseUnit
}

export function TransactionsTableRow({ transaction }: TransactionProps) {
    const [opneDialogAlertDelete, setOpenDialogAlertDelete] = useState(false)
    const [open, setOpen] = useState(false)

    const { mutate: deleteTransaction, isPending } = useDeleteTransactionsSoftDelete()

    function handleDeleteitem(id: string) {
        console.log("Deleting transaction with ID:", id)
        deleteTransaction(id)
        setOpen(false)
    }
    return (
        <TableRow key={transaction.id} className="h-[64px]">
            <TableCell className="">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Ellipsis className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => {
                            setOpenDialogAlertDelete(true)
                            setOpen(false)
                        }}>
                            Excluir
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={{ pathname: "/transactions/form", query: { id: transaction.id } }} className="w-full text-left">
                                Editar
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.email}</TableCell>
            <TableCell>{transaction.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
            <TableCell>{renderCurrencyTag(transaction.currency)}</TableCell>
            <TableCell>{renderTransactionStatusTag(translateTransactionStatus(transaction.status))}</TableCell>
            <TableCell>{translateTransactionType(transaction.transactionType)}</TableCell>

            {/* HoverCard para PayerReceiver */}
            <TableCell>
                <HoverCard>
                    <HoverCardTrigger className="cursor-pointer text-blue-500 underline">
                        {transaction.payerReceiver.name}
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                        <div className="flex items-center gap-2">
                            <img
                                src={transaction.payerReceiver.imgUrl}
                                alt={transaction.payerReceiver.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-bold">{transaction.payerReceiver.name}</p>
                                <p className="text-sm text-gray-500">{transaction.payerReceiver.userType}</p>
                                <p className="text-xs">{transaction.payerReceiver.description}</p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </TableCell>

            {/* HoverCard para Payments */}
            <TableCell>
                <HoverCard>
                    <HoverCardTrigger className="cursor-pointer text-blue-500 underline">
                        {transaction.payments.length} payment(s)
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72">
                        {transaction.payments.map((payment) => (
                            <div key={payment.id} className="border-b last:border-0 pb-2 mb-2">
                                <p><strong>Type:</strong> {payment.paymentType}</p>
                                <p><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
                                {payment.installments && (
                                    <p><strong>Installments:</strong> {payment.installments}x of ${payment.valuePerInstallment?.toFixed(2)}</p>
                                )}
                            </div>
                        ))}
                    </HoverCardContent>
                </HoverCard>
            </TableCell>

            <TableCell >
                <AlertDialog open={opneDialogAlertDelete} onOpenChange={setOpenDialogAlertDelete}>
                    <AlertDialogTrigger></AlertDialogTrigger>
                    <AlertDelete onConfirm={() => handleDeleteitem(transaction.id)} />
                </AlertDialog>
            </TableCell>
        </TableRow>
    )
}