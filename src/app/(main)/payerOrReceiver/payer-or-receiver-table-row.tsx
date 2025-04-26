import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import Image from "next/image"
import { PayerOrReceiverBaseUnit } from "../transactions/types/transactions-schema-types";
import { Edit, Ellipsis, EllipsisVertical, Trash } from "lucide-react";
import { translatePayerOrReceiver } from "@/utils/translations-payer-or-receiver";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { PayerOrReceiverDialogFormUpdate } from "./payer-or-receiver-dialog-form-update";
import { generateAvatarFallback } from "@/utils/avatar-fallback-generate";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



interface PayerOrReceiverTableRowBase {
    item: PayerOrReceiverBaseUnit
}

export function PayerOrReceiverTableRow({ item }: PayerOrReceiverTableRowBase) {

    const [openDialogNewPayerOrReceiver, setOpenDialogNewPayorReceiver] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <TableRow className="h-[90px]">
            <TableCell className="">

                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger>
                        <Ellipsis className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Excluir</DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => {
                            setOpenDialogNewPayorReceiver(true)
                            setOpen(false)
                        }}>
                            Editar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </TableCell>
            <TableCell>
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src={item.imgUrl} alt={item.name} />
                        <AvatarFallback>{generateAvatarFallback(item.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm font-medium text-muted-foreground">{item.description}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell className="">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{translatePayerOrReceiver(item.userType)}</p>
            </TableCell>

            {openDialogNewPayerOrReceiver && (
                <Dialog open={openDialogNewPayerOrReceiver} onOpenChange={setOpenDialogNewPayorReceiver}>
                    <DialogTrigger></DialogTrigger>
                    <PayerOrReceiverDialogFormUpdate onClose={setOpenDialogNewPayorReceiver} item={item} />
                </Dialog>
            )}

            {/* <TableCell className="">
                <Trash className="size-4 text-red-500 hover:text-red-400 cursor-pointer" />
            </TableCell>  */}
        </TableRow>
    )
}
