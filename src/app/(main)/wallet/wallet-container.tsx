import {
    DollarSign,
    ArrowUpCircle,
    ArrowDownCircle,
    Wallet
} from "lucide-react";
import { MetricCard } from "./components/day-orders-amount-card";
import { WalletChartUniqueLines } from "./wallet-chat-unique-line";
import { WalletChartCircleCategories } from "./wallet-chart-circle-categorie";

export function WalletContainer() {
    return (
        <div className="flex flex-col gap-6">
            {/* Cards superiores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <MetricCard
                    title="Receita (dia)"
                    icon={<ArrowUpCircle className="w-4 h-4 text-emerald-500" />}
                    amount={11240}
                    diff={+8}
                    isLoading={false}
                />
                <MetricCard
                    title="Despesas (dia)"
                    icon={<ArrowDownCircle className="w-4 h-4 text-rose-500" />}
                    amount={2340}
                    diff={-5}
                    isLoading={false}
                />
                <MetricCard
                    title="Saldo atual"
                    icon={<Wallet className="w-4 h-4 text-blue-500" />}
                    amount={8900}
                    isLoading={false}
                />
                <MetricCard
                    title="Meta mensal"
                    icon={<DollarSign className="w-4 h-4 text-yellow-500" />}
                    amount={15000}
                    diff={+12}
                    isLoading={false}
                />
            </div>

            {/* Gráfico */}
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 md:col-span-2">
                      <WalletChartUniqueLines />
                </div>
                <div className="col-span-3 md:col-span-1">
                    <WalletChartCircleCategories />
                </div>
            </div>
        </div>
    );
}
