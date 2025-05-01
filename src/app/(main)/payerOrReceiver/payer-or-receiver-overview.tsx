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
import { DataTablePagination } from "@/components/pagination-base";
import { PayerOrReceiverTableRow } from "./payer-or-receiver-table-row";
import { useState } from "react";
import { useGetAllPayerOrReceiver } from "./hooks/use-get-all-payer-or-receiver";
import { CirclePlus } from "lucide-react";
import { PayerOrReceiverDialogForm } from "../transactions/form/payer-or-receiver-dialog-form";

export function PayerOrReceiverOverview() {

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [openDialogNewPayerOrReceiver, setOpenDialogNewPayorReceiver] = useState(false)
    const { data, isLoading, isError } = useGetAllPayerOrReceiver({
        search: "",
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

    return (
        <div>
            <div className="max-xs:hidden min-h-[400px]  h-[60vh]  overflow-auto border rounded-lg bg-slate-100 dark:bg-black/20 border-gray-200 dark:border-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[40px] w-[40px]" onClick={() => setOpenDialogNewPayorReceiver(true)}>
                                <CirclePlus className="text-emerald-500 hover:text-emerald-400" />
                            </TableHead>
                            <TableHead className="">Usuário</TableHead>
                            <TableHead className="">Tipo</TableHead>
                            <TableHead className=""></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map(item => (
                                <PayerOrReceiverTableRow key={item.id} item={item} />
                            ))
                        ) : (
                            <TableRow className="h-[90px]">
                                <TableCell className="">
                                    <div className="flex items-center justify-center w-full h-full">
                                        {isLoading ? (
                                            <p>Carregando...</p>
                                        ) : isError ? (
                                            <p>Erro ao carregar os dados</p>
                                        ) : (
                                            <p>Nenhum dado encontrado</p>
                                        )}
                                    </div>
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
                <Dialog open={openDialogNewPayerOrReceiver} onOpenChange={setOpenDialogNewPayorReceiver}>
                    <DialogTrigger></DialogTrigger>
                    <PayerOrReceiverDialogForm onClose={setOpenDialogNewPayorReceiver} isTanstack={true} />
                </Dialog>
            )}
        </div>
    )
}