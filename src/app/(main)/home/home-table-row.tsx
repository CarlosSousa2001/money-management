import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TransactionResponse } from "./types/home-types-schema"
import Image from "next/image"
import { getTransactionStatusTag } from "@/utils/transaction-status-tags";

interface HomeTableRowBase {
    item: TransactionResponse
}

export function HomeTableRow({ item }: HomeTableRowBase) {
    const statusClasses = getTransactionStatusTag(item.status);
    return (
        <TableRow className="h-[90px]">
            <TableCell>
                <div className="flex items-center space-x-3">
                    <Image
                        width={62}
                        height={62}
                        src={item.payerReceiver.iconUrl}
                        alt="Icon company"
                        className="w-[62px] h-[62px] rounded-lg"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.payerReceiver.name}</p>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{item.payerReceiver.type}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ${statusClasses}`}>
                    {item.status} {/* Exibe o nome do status */}
                </span>
            </TableCell>
            <TableCell className="">{item.code}</TableCell>
            <TableCell>{item.typeTransaction}</TableCell>
            <TableCell className="text-right">{item.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
        </TableRow>
    )
}
