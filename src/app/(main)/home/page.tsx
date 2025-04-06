"use client"
import { CardProgressItem } from "@/components/card-progress-item";
import { Box, Settings } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react";
import { HomeCharts } from "./home-charts";
import { HomeDataTable } from "./home-data-table";

const transactions = [
    {
        date: "2025-03-29", // Exemplo de transação de hoje
        title: "Pagamento de Serviços",
        description: "Pagamento realizado hoje por serviços prestados.",
    },
    {
        date: "2025-03-28", // Exemplo de transação de ontem
        title: "Pagamento de Produtos",
        description: "Pagamento realizado ontem por compra de produtos.",
    },
    {
        date: "2025-03-30", // Exemplo de transação futura
        title: "Pagamento Futuro",
        description: "Pagamento para o próximo mês.",
    },
];


function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Retorna apenas a data (YYYY-MM-DD)
}

export default function HomePage() {

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

    return (
        <div className="flex flex-col w-full p-4 2md:p-0">
            <div className="flex-4">
                <div className="grid grid-cols-6 gap-8">
                    <div className="col-span-6 2md:col-span-4">
                        <HomeCharts />
                    </div>
                    <div className="col-span-6 2md:col-span-2 grid grid-cols-1 md:grid-cols-2 2md:grid-cols-1 gap-8">
                        <CardProgressItem title={"Saúde da carteira"} icon={<Settings className="text-green-600" />} color={"bg-green-200"}>
                            <div className="flex items-center justify-between mb-3">
                                <span>Meta</span>
                                <span>75%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                                <div className="bg-green-300  h-1.5 rounded-full dark:bg-green-300" style={{ width: "75%" }}></div>
                            </div>
                        </CardProgressItem>

                        <CardProgressItem title={"Gastos"} icon={<Box className="text-red-600" />} color={"bg-red-200"}>
                            <div className="flex items-center justify-between mb-3">
                                <span>Meta</span>
                                <span>45%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                                <div className="bg-red-300  h-1.5 rounded-full dark:bg-red-300" style={{ width: "45%" }}></div>
                            </div>
                        </CardProgressItem>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-6 gap-8 mt-8">
                <div className="col-span-6 2md:col-span-4">
                    <HomeDataTable />
                </div>
                <div className="col-span-6 2md:col-span-2 grid grid-cols-1 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Atividades Diárias</CardTitle>
                            <CardDescription>Descrição do Cartão</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                                {transactions.map((transaction, index) => {
                                    const ballColor = getBallColor(transaction.date); // Obtém a cor da bolinha
                                    return (
                                        <li key={index} className="mb-10 ms-4">
                                            <div
                                                className={`absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 ${ballColor}`}
                                            ></div> {/* Bolinha colorida */}

                                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                {transaction.date}
                                            </time> {/* Cor do texto da data */}

                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {transaction.title}
                                            </h3> {/* Título com cor padrão */}

                                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                                {transaction.description}
                                            </p> {/* Descrição com cor padrão */}
                                        </li>
                                    );
                                })}
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* <div className="flex-1">
                <CreditCardItem />
            </div>  */}
        </div>
    )
}