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
import { addDays, format } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/extends/calendar-edit";


const transactions = [
    {
        id: "txn_001",
        description: "Payment for subscription",
        email: "customer@example.com",
        currency: "USD",
        amount: 199.99,
        transactionScheduledDate: "2025-04-28T10:00:00Z",
        category: "Subscription",
        transactionType: "Credit",
        status: "Completed",
        payerReceiverId: "user_001",
        payerReceiver: {
            name: "John Doe",
            description: "Regular customer",
            imgUrl: "https://via.placeholder.com/40",
            userType: "Customer"
        },
        payments: [
            {
                id: "pay_001",
                amount: 199.99,
                installments: 1,
                valuePerInstallment: 199.99,
                paymentType: "Credit Card",
                cardId: "card_001"
            }
        ]
    },
    {
        id: "txn_002",
        description: "Payment for subscription",
        email: "customer@example.com",
        currency: "USD",
        amount: 199.99,
        transactionScheduledDate: "2025-04-28T10:00:00Z",
        category: "Subscription",
        transactionType: "Credit",
        status: "Completed",
        payerReceiverId: "user_001",
        payerReceiver: {
            name: "John Doe",
            description: "Regular customer",
            imgUrl: "https://via.placeholder.com/40",
            userType: "Customer"
        },
        payments: [
            {
                id: "pay_001",
                amount: 199.99,
                installments: 1,
                valuePerInstallment: 199.99,
                paymentType: "Credit Card",
                cardId: "card_001"
            }
        ]
    },
    {
        id: "txn_003",
        description: "Payment for subscription",
        email: "customer@example.com",
        currency: "USD",
        amount: 199.99,
        transactionScheduledDate: "2025-04-28T10:00:00Z",
        category: "Subscription",
        transactionType: "Credit",
        status: "Completed",
        payerReceiverId: "user_001",
        payerReceiver: {
            name: "John Doe",
            description: "Regular customer",
            imgUrl: "https://via.placeholder.com/40",
            userType: "Customer"
        },
        payments: [
            {
                id: "pay_001",
                amount: 199.99,
                installments: 1,
                valuePerInstallment: 199.99,
                paymentType: "Credit Card",
                cardId: "card_001"
            }
        ]
    },
    {
        id: "txn_004",
        description: "Payment for subscription",
        email: "customer@example.com",
        currency: "USD",
        amount: 199.99,
        transactionScheduledDate: "2025-04-28T10:00:00Z",
        category: "Subscription",
        transactionType: "Credit",
        status: "Completed",
        payerReceiverId: "user_001",
        payerReceiver: {
            name: "John Doe",
            description: "Regular customer",
            imgUrl: "https://via.placeholder.com/40",
            userType: "Customer"
        },
        payments: [
            {
                id: "pay_001",
                amount: 199.99,
                installments: 1,
                valuePerInstallment: 199.99,
                paymentType: "Credit Card",
                cardId: "card_001"
            }
        ]
    }
];

export function TransactionsOverview() {

    const [searchValue, setSearchValue] = useState<string>("")
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    console.log("date", date)

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { data, isLoading, isError } = useGetAllTransactions({
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
        setCurrentPage(1); 
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="">
                <div className="flex items-center gap-4">
                    <Input placeholder="Buscar por..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
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
                            <TableHead title="Payer/Receiver">Pagador/Recebedor</TableHead>
                            <TableHead title="Payments">Pagamentos</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(data?.data) && data.data.length > 0 ? (
                            data.data.map((transaction) => (
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