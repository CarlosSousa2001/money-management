"use client"


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useGetTransactionNextToDue } from "./hooks/use-get-transaction-next-to-due";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSortable } from "@dnd-kit/sortable";
import { Grip, GripVertical } from "lucide-react";


function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Retorna apenas a data (YYYY-MM-DD)
}

export function HomeTransactionNextToDue({ id }: { id: string }) {

    const [todayDate, setTodayDate] = useState(getTodayDate());
    useEffect(() => {
        // Atualiza a data de hoje, se necessário (não é obrigatório para dados mockados estáticos)
        setTodayDate(getTodayDate());
    }, []);

    const getBallColor = (date: string) => {
        // Define a cor da bolinha para as transações de acordo com a data
        if (date === todayDate) {
            return 'bg-blue-500'; // Azul para as transações de hoje
        } else if (new Date(date) < new Date(todayDate)) {
            return 'bg-red-500'; // Vermelho para transações passadas
        } else {
            return 'bg-green-500'; // Verde para transações futuras
        }
    }

    const { data: transactionNextToDue, isLoading: isLoadingTransactionNextToDue } = useGetTransactionNextToDue();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
    };

    return (
        <Card ref={setNodeRef} {...attributes} style={style}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Transações próximas de vencer</CardTitle>
                    <Grip
                        {...listeners}
                        className="cursor-grab text-gray-500 hover:text-gray-700"
                        size={24}
                    />
                </div>
                <CardDescription>Últimas três transações que estão próximas do vencimento.</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px] min-h-full">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {transactionNextToDue?.data && transactionNextToDue.data.length > 0 ? (
                        transactionNextToDue.data.map((transaction, index) => {
                            const ballColor = getBallColor(transaction.date); // cor da bolinha
                            return (
                                <li key={index} className="ms-4 relative">
                                    <div
                                        className={`absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 ${ballColor}`}
                                    ></div>

                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                        {format(new Date(transaction.date), 'dd/MM/yyyy')}
                                    </time>

                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {transaction.description}
                                    </h3>

                                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        {transaction.description}
                                    </p>
                                </li>
                            );
                        })
                    ) : (
                        <li className="ms-4 relative">
                            <div
                                className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-400"
                            ></div>

                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                —
                            </time>

                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                   
                            </h3>

                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                Nenhum dado disponível no momento.
                            </p>
                        </li>
                    )}
                </ol>

            </CardContent>
        </Card>
    )
}