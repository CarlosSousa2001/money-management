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


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AlertDelete } from "@/components/alert-delete";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { GoalResponseUnit } from "./types/goals-schema-types";
import { translateGoalType } from "@/utils/translations-goals-type";
import { useDeleteGoal } from "./hooks/use-delete-goal";
import { GoalDialogFormUpdate } from "./goal-dialog-form-update";


interface GoalTableRowBase {
    item: GoalResponseUnit
}

export function GoalTableRow({ item }: GoalTableRowBase) {

    const [openDialogNewGoal, setOpenDialogNewGoal] = useState(false)
    const [openDialogAlertDelete, setOpenDialogAlertDelete] = useState(false)
    const [open, setOpen] = useState(false)

    const { mutate: deleteGoal, isPending } = useDeleteGoal()

    function handleDeleteitem(id: string) {
        deleteGoal(id)
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
                            setOpenDialogNewGoal(true)
                            setOpen(false)
                        }}>
                            Editar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </TableCell>
            <TableCell>
                        teste
            </TableCell>
            <TableCell className="">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{translateGoalType(item.goalType)}</p>
            </TableCell>


            <TableCell className="">
                <Dialog open={openDialogNewGoal} onOpenChange={setOpenDialogNewGoal}>
                    <DialogTrigger >
                    </DialogTrigger>
                    <GoalDialogFormUpdate onClose={setOpenDialogNewGoal} item={item} />
                </Dialog>
            </TableCell>

            <TableCell >
                <AlertDialog open={openDialogAlertDelete} onOpenChange={setOpenDialogAlertDelete}>
                    <AlertDialogTrigger></AlertDialogTrigger>
                    <AlertDelete onConfirm={() => handleDeleteitem(item.id)} />
                </AlertDialog>
            </TableCell>
        </TableRow >
    )
}
