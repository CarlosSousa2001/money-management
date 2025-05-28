import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { MetricCardSkeleton } from "./MetricCardSkeleton";

type MetricCardProps = {
    title: string;
    icon: ReactNode;
    amount?: number;
    diff?: number;
    isLoading?: boolean;
};

export function MetricCard({
    title,
    icon,
    amount,
    diff,
    isLoading = false,
}: MetricCardProps) {
    const hasDiff = typeof diff === "number";

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between w-full">
                    <CardTitle className="text-base font-semibold">{title}</CardTitle>
                    <div className="h-4 w-4 text-muted-foreground">{icon}</div>
                </div>
            </CardHeader>
            <CardContent className="space-y-1">
                {isLoading ? (
                    <MetricCardSkeleton />
                ) : (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {amount?.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </span>
                        {hasDiff && (
                            <p className="text-xs text-muted-foreground">
                                {diff > 0 ? (
                                    <span className="text-emerald-500 dark:text-emerald-400">
                                        +{diff}% em relação a ontem
                                    </span>
                                ) : (
                                    <span className="text-rose-500 dark:text-rose-500">
                                        {diff}%
                                        {diff === 0 ? "" : " em relação a ontem"}
                                    </span>
                                )}
                            </p>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
