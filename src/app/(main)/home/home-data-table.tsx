
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { Box, Search, Settings } from "lucide-react";
import { DATA_CONST_PAGINATED } from "@/utils/paginated-base";
import { DataTablePagination } from "@/components/pagination-base";
import { useEffect, useState } from "react";
import { TransactionResponsePaginated } from "./types/home-types-schema";
import { getAllTransactionHomeBase } from "./_api/get-all-trasanction-home-base";
import { HomeTableRow } from "./home-table-row";

export function HomeDataTable() {

    const [trasanctionData, setTrasactionData] = useState<TransactionResponsePaginated>();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        (async () => {
            const res = await getAllTransactionHomeBase();
            setTrasactionData(res);
        })();
    }, [])


    const totalItems = DATA_CONST_PAGINATED?.meta.totalItems ?? 0;
    const totalPages = DATA_CONST_PAGINATED?.meta.totalPages ?? 1;
    const hasNextPage = DATA_CONST_PAGINATED?.meta.nextPage ?? false;
    const hasPrevPage = DATA_CONST_PAGINATED?.meta.prevPage ?? false;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset para a primeira página ao mudar o tamanho da página
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="w-full bg-card rounded-lg shadow-md flex-1 ">
                <div className="p-6 flex max-md:flex-col items-center justify-between">
                    <span className="leading-none font-semibold text-xl flex-2">Transactions</span>
                    <div className="flex items-center justify-end flex-1 gap-1 max-md:mt-4">
                        <Input className="w-full" placeholder="Pesquisar..." />
                        <div className="rounded-md border bg-transparent  h-9 px-3 py-1 flex items-center justify-between border-green-300 text-green-600 cursor-pointer hover:bg-green-100 dark:hover:bg-card transition-all duration-200 ease-in-out">
                            <Search className="size-5" />
                        </div>
                    </div>
                </div>
                <div className="max-xs:hidden min-h-[400px]  h-[40vh]  overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">User | Company</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Transaction</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trasanctionData?.data.map(item => (
                                <HomeTableRow key={item.id} item={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div>
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
    );
}