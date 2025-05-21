
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/pagination-base";
import {useState } from "react";
import { TransactionResponsePaginated } from "./types/home-types-schema";
import { HomeTableRow } from "./home-table-row";
import { useGetAllTransactions } from "../transactions/hooks/use-get-all-transactions";

export function HomeDataTable() {

    const [trasanctionData, setTrasactionData] = useState<TransactionResponsePaginated>();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { data, isLoading, isError } = useGetAllTransactions({
        search: "",
        page: currentPage,
        perPage: perPage
    })


    const totalItems = data?.meta.totalItems ?? 0;
    const totalPages = data?.meta.totalPages ?? 1;
    const hasNextPage = data?.meta.nextPage ?? false;
    const hasPrevPage = data?.meta.prevPage ?? false;

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
                </div>
                <div className="max-xs:hidden min-h-[400px]  h-[40vh]  overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Pagador/Recebedor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Transaction</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>           
                            {Array.isArray(data?.data) && data.data.length > 0 ? (
                                data.data.map((item) => (
                                    <HomeTableRow key={item.id} item={item} />
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