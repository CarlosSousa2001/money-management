"use client";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/pagination-base";
import { PayerOrReceiverTableRow } from "./payer-or-receiver-table-row";
import { useEffect, useState } from "react";
import { PayerOrReceiverResponse } from "../transactions/types/transactions-schema-types";
import { gelAllPayerOrReceiver } from "./_api/get-all-payer-or-receiver";
import { TransactionPayerReceiverBase } from "../home/types/home-types-schema";

export function PayerOrReceiverOverview() {

    const [items, setItems] = useState<PayerOrReceiverResponse>({
        data: [],
        meta: {
            totalItems: 0,
            totalPages: 1,
            page: 1,
            perPage: 10,
            nextPage: null,
            prevPage: null,
        },
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        (async () => {
            const res = await gelAllPayerOrReceiver();
            console.log('PayerOrReceiver response:', res);
            setItems(res);
        })();
    }, [])


    const totalItems = items?.meta.totalItems ?? 0;
    const totalPages = items?.meta.totalPages ?? 1;
    const hasNextPage = items?.meta.nextPage ?? false;
    const hasPrevPage = items?.meta.prevPage ?? false;


    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset para a primeira página ao mudar o tamanho da página
    };

    return (
        <div>
            <div className="max-xs:hidden min-h-[400px]  h-[40vh]  overflow-auto border rounded-md border-gray-200 dark:border-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[40px] w-[40px]"></TableHead>
                            <TableHead className="">Usuário</TableHead>
                            <TableHead className="">Tipo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.data.map(item => (
                            <PayerOrReceiverTableRow key={item.id} item={item} />
                        ))}
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
        </div>
    )
}