import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import { PayerOrReceiverBaseUnit } from "../transactions/types/transactions-schema-types";
import { Ellipsis } from "lucide-react";
import { translatePayerOrReceiver } from "@/utils/translations-payer-or-receiver";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { PayerOrReceiverDialogFormUpdate } from "./payer-or-receiver-dialog-form-update";
import { generateAvatarFallback } from "@/utils/avatar-fallback-generate";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeletePayerOrReceiver } from "./hooks/use-delete-payer-or-receiver";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AlertDelete } from "@/components/alert-delete";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";


interface PayerOrReceiverTableRowBase {
    item: PayerOrReceiverBaseUnit
}

export function PayerOrReceiverTableRow({ item }: PayerOrReceiverTableRowBase) {

    const [openDialogNewPayerOrReceiver, setOpenDialogNewPayorReceiver] = useState(false)
    const [opneDialogAlertDelete, setOpenDialogAlertDelete] = useState(false)
    const [open, setOpen] = useState(false)

    const { mutate: deletePayerOrReceiver, isPending } = useDeletePayerOrReceiver()

    function handleDeleteitem(id: string) {
        deletePayerOrReceiver(id)
        setOpen(false)
    }

    return (
        <TableRow className="h-[64px]">
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

                    <HoverCard openDelay={100}>
                        <HoverCardTrigger>
                            <Avatar>
                                <AvatarImage src={item.imgUrl} alt={item.name} />
                                <AvatarFallback className="bg-slate-200 dark:bg-muted">{generateAvatarFallback(item.name)}</AvatarFallback>
                            </Avatar>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            The React Framework – created and maintained by @vercel.
                        </HoverCardContent>
                    </HoverCard>

                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm font-medium text-muted-foreground">{item.description}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell className="">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{translatePayerOrReceiver(item.userType)}</p>
            </TableCell>


            <TableCell className="">
                <Dialog open={openDialogNewPayerOrReceiver} onOpenChange={setOpenDialogNewPayorReceiver}>
                    <DialogTrigger >
                    </DialogTrigger>
                    <PayerOrReceiverDialogFormUpdate onClose={setOpenDialogNewPayorReceiver} item={item} />
                </Dialog>
            </TableCell>

            <TableCell >
                <AlertDialog open={opneDialogAlertDelete} onOpenChange={setOpenDialogAlertDelete}>
                    <AlertDialogTrigger></AlertDialogTrigger>
                    <AlertDelete onConfirm={() => handleDeleteitem(item.id)} />
                </AlertDialog>
            </TableCell>
        </TableRow >
    )
}
