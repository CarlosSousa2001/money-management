import React, { JSX } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CardInfoItemProps {
    title: string;
    icon?: JSX.Element;
    description?: string;
    variant: "green" | "red" | "blue";
}

const variantStyles = {
    green: {
        bg: "border border-slate-200",
        icon: "text-green-500",
    },
    red: {
        bg: "border border-slate-200",
        icon: "text-red-500",
    },
    blue: {
        bg: "border border-slate-200",
        icon: "text-blue-500",
    },
};

export function CardInfoItem({
    title,
    icon,
    description,
    variant,
}: CardInfoItemProps) {
    const styles = variantStyles[variant];

    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center text-center gap-3 py-6">
                {icon && (
                    <div className={`p-4 rounded-md ${styles.bg}`}>
                        <div className={`text-3xl ${styles.icon}`}>{icon}</div>
                    </div>
                )}
                <p className="text-3xl font-extrabold">{title}</p>
                {description && (
                    <p className="text-muted-foreground text-sm">{description}</p>
                )}
            </CardContent>
        </Card>
    );
}
