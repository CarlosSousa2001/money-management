"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DataTablePagination } from "@/components/pagination-base";
import { PayerOrReceiverTableRow } from "./payer-or-receiver-table-row";
import { useState } from "react";
import { useGetAllPayerOrReceiver } from "./hooks/use-get-all-payer-or-receiver";
import { PayerOrReceiverDialogForm } from "../transactions/form/payer-or-receiver-dialog-form";
import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { TransactionPayerReceiverBase } from "../home/types/home-types-schema";
import { translatePayerOrReceiver } from "@/utils/translations-payer-or-receiver";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ContainerIcon } from "@/components/container-icon";
import { Bolt } from "lucide-react";

export function PayerOrReceiverOverview() {

    const [searchValue, setSearchValue] = useState<string>("")
    const [selectedTransactionType, setSelectedTransactionType] = useState<string | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [openDialogNewPayerOrReceiver, setOpenDialogNewPayorReceiver] = useState(false)
    const { data, isLoading, isError } = useGetAllPayerOrReceiver({
        search: searchValue,
        page: currentPage,
        perPage: perPage
    })

    const totalItems = data?.meta.totalItems ?? 0;
    const totalPages = data?.meta.totalPages ?? 1;
    const hasNextPage = data?.meta.nextPage === true;
    const hasPrevPage = data?.meta.prevPage === true;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset para a primeira página ao mudar o tamanho da página
    };

    const rows = data?.data && Array.isArray(data.data) ? data.data : [];

    const handleOpenDialog = () => {
        setOpenDialogNewPayorReceiver(true)
    }

    function handleResetFilters() {
        setSearchValue("");
        setSelectedTransactionType(undefined);
    }


    return (
        <div className="space-y-4 p-10  w-full m-auto">
            <div className="space-y-6">
                <div className="">
                    <HeaderPageUi title="Gerenciamento de usuários" description="Gerencie seus pagadores e recebedores" onHandleClick={handleOpenDialog} onhandleClickTtitle="Novo pagador" />
                </div>
                <Separator />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
                <Input placeholder="Buscar por..." value={searchValue} className=" flex-1 min-w-[180px]" onChange={(e) => setSearchValue(e.target.value)} />

                <Select
                    value={selectedTransactionType}
                    onValueChange={(value) => setSelectedTransactionType(value)}
                >
                    <SelectTrigger className="min-w-[240px] max-sm:flex-1">
                        <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(TransactionPayerReceiverBase).map(([key, value]) => (
                            <SelectItem key={value} value={value}>
                                {translatePayerOrReceiver(value)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>


                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <ContainerIcon>
                            <Bolt className="size-5 mt-[2px]" />
                        </ContainerIcon>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleResetFilters()}>Resetar filtros</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
            <div className="max-xs:hidden min-h-[400px] max-h-[60vh] overflow-auto border rounded-lg bg-slate-100 dark:bg-black/20 border-gray-200 dark:border-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[40px] w-[40px]"></TableHead>
                            <TableHead className="">Usuário</TableHead>
                            <TableHead className="">Tipo</TableHead>
                            <TableHead className=""></TableHead>
                            <TableHead className=""></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map(item => (
                                <PayerOrReceiverTableRow key={item.id} item={item} />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                                    Nenhuma transação encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4">
                <DataTablePagination
                    totalItems={totalItems}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    perPage={perPage}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            </div>

            {openDialogNewPayerOrReceiver && (
                <Dialog modal open={openDialogNewPayerOrReceiver} onOpenChange={setOpenDialogNewPayorReceiver}>
                    <DialogTrigger></DialogTrigger>
                    <PayerOrReceiverDialogForm onClose={setOpenDialogNewPayorReceiver} isTanstack={true} />
                </Dialog>
            )}
        </div>
    )
}