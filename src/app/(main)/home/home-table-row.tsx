import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarFallback } from "@/utils/avatar-fallback-generate";
import { translatePayerOrReceiver } from "@/utils/translations-payer-or-receiver";
import { renderTransactionStatusTag } from "@/utils/status-color-map";
import { translateTransactionStatus } from "@/utils/translations-transactions-status";
import { translateTransactionType } from "@/utils/translations-transaction-type";
import { TransactionResponseUnit } from "../transactions/types/transactions-schema-types";

interface HomeTableRowBase {
    item: TransactionResponseUnit
}

export function HomeTableRow({ item }: HomeTableRowBase) {
    return (
        <TableRow className="h-[64px]">
            <TableCell>
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src={item.payerReceiver.imgUrl} alt={item.payerReceiver.imgUrl} />
                        <AvatarFallback className="bg-slate-200 dark:bg-muted">{generateAvatarFallback(item.payerReceiver.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.payerReceiver.name}</p>
                        <p className="text-xs font-light dark:text-white">{translatePayerOrReceiver(item.payerReceiver.userType)}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell className="text-left">
                {renderTransactionStatusTag(translateTransactionStatus(item.status))}
            </TableCell>
            <TableCell className="">{item.code}</TableCell>
            <TableCell>{translateTransactionType(item.transactionType)}</TableCell>
            <TableCell className="text-right">{item.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
        </TableRow>
    )
}
