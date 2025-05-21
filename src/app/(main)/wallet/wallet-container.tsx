import { CardInfoItem } from "@/components/card-infor-item";
import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    ArrowDownCircle,
    ArrowUpCircle,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WalletChartLines } from "./wallet-chart-lines";
import { ContainerIcon } from "@/components/container-icon";
import Link from "next/link";

export function WalletContainer() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-6">
            {/* COLUNA 1: Perfil */}
            <div className="space-y-4 col-span-1 xl:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Perfil</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                            {/* Avatar */}
                            <div className="relative w-24 h-24">
                                <Image
                                    src="https://picsum.photos/200"
                                    alt="User Avatar"
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </div>

                            {/* Informações */}
                            <div className="flex flex-col flex-1 gap-2 text-center sm:text-left">
                                <div className="space-y-1">
                                    <p className="text-lg font-semibold">João Silva</p>
                                    <p className="text-sm text-muted-foreground">
                                        joao@email.com
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Entrou em 2025
                                    </p>
                                </div>

                                <Button variant="secondary" className="w-full sm:w-max" asChild>
                                    <Link href="/user">
                                        Editar perfil
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>


                {/* Cards de estatísticas pequenas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CardInfoItem
                        title="50%"
                        description="Performance"
                        variant="green"
                    />
                    <CardInfoItem
                        title="80%"
                        description="Mín. Performance"
                        variant="blue"
                    />
                </div>

                {/* Ganhos e metas */}
                <Card>
                    <CardContent className="py-3 space-y-5">
                        {/* Item - Ganhos */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <ContainerIcon>
                                    <ArrowUpCircle className="text-green-500 size-5 mt-1" />
                                </ContainerIcon>
                                <span className="text-sm text-muted-foreground">Ganhos de hoje</span>
                            </div>
                            <div className="text-lg font-semibold text-green-500">$11.240</div>
                        </div>

                        <div className="border-t" />

                        {/* Item - Gastos */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <ContainerIcon>
                                    <ArrowDownCircle className="text-red-500 size-5 mt-1" />
                                </ContainerIcon>
                                <span className="text-sm text-muted-foreground">Gastos de hoje</span>
                            </div>
                            <div className="text-lg font-semibold text-red-500">$2.340</div>
                        </div>

                        <div className="border-t" />

                        {/* Item - Saldo */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <ContainerIcon>
                                    <Wallet className="text-blue-500 size-5 mt-1" />
                                </ContainerIcon>
                                <span className="text-sm text-muted-foreground">Saldo atual</span>
                            </div>
                            <div className="text-lg font-semibold text-blue-500">$8.900</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* COLUNA 2: Indicadores + Gráfico */}
            <div className="flex flex-col gap-4 col-span-1 xl:col-span-4">
                {/* Indicadores */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CardInfoItem
                        title="50%"
                        icon={<Wallet size={20} />}
                        description="Performance"
                        variant="green"
                    />
                    <CardInfoItem
                        title="80%"
                        icon={<ArrowUpRight size={20} />}
                        description="Mín. Performance"
                        variant="blue"
                    />
                    <CardInfoItem
                        title="75%"
                        icon={<ArrowDownRight size={20} />}
                        description="Média Performance"
                        variant="red"
                    />
                </div>

                {/* Gráfico */}
                <WalletChartLines />
            </div>
        </div>
    );
}
