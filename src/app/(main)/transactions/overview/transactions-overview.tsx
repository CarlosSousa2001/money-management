"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "@/components/pagination-base";
import { useState } from "react";
import { useGetAllTransactions } from "../hooks/use-get-all-transactions";
import { TransactionsTableRow } from "./transactions-table-row";
import { Input } from "@/components/ui/input";
import { format } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bolt, CalendarIcon, Download, FileDown } from "lucide-react";
import { Calendar } from "@/components/extends/calendar-edit";
import { ContainerIcon } from "@/components/container-icon";
import { downloadReport } from "../_api/download-report";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export function TransactionsOverview() {

    const currentYear = new Date().getFullYear();

    const [searchValue, setSearchValue] = useState<string>("")
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(currentYear, 0, 1),
        to: new Date(currentYear, 11, 31),
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { data, isLoading, isError } = useGetAllTransactions({
        search: searchValue,
        page: currentPage,
        perPage: perPage,
        startDate: date?.from ? format(date.from, "yyyy-MM-dd HH:mm") : undefined,
        endDate: date?.to ? format(date.to, "yyyy-MM-dd HH:mm") : undefined,
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
        setCurrentPage(1);
    };

    const rows = data?.data && Array.isArray(data.data) ? data.data : [];

    async function handleDownloadReport() {
        const url = await downloadReport();

        window.open(url, '_blank');

        // Opcional: libera o recurso após um tempo
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    function handleResetFilters() {
        setSearchValue("");
        setDate({
            from: new Date(currentYear, 0, 1),
            to: new Date(currentYear, 11, 31),
        });
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="w-full">
                <div className="flex flex-wrap gap-4 items-center">
                    <Input
                        className="flex-1 min-w-[180px]"
                        placeholder="Buscar por..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant="outline"
                                className={cn(
                                    "min-w-[200px] sm:w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>

                    <ContainerIcon>
                        <FileDown className="size-5 mt-[2px]" onClick={() => handleDownloadReport()} />
                    </ContainerIcon>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <ContainerIcon>
                                <Bolt className="size-5 mt-[2px]" />
                            </ContainerIcon>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleResetFilters()}>
                                Resetar filtros
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>


            <div className="max-xs:hidden min-h-[400px]  max-h-[60vh]  overflow-auto border rounded-lg bg-slate-100 dark:bg-black/20 border-gray-200 dark:border-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]"></TableHead>
                            <TableHead title="Description">Descrição</TableHead>
                            <TableHead title="Email">Email</TableHead>
                            <TableHead title="Amount">Valor</TableHead>
                            <TableHead title="Currency">Moeda</TableHead>
                            <TableHead title="Status">Status</TableHead>
                            <TableHead title="Transaction Type">Tipo da transação</TableHead>
                            <TableHead title="Payer/Receiver">Pagador/Recebedor</TableHead>
                            <TableHead title="Payments">Pagamentos</TableHead>
                            <TableHead title=""></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((transaction) => (
                                <TransactionsTableRow key={transaction.id} transaction={transaction} />
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
        </div>
    )
}