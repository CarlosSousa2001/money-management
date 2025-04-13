import React, { JSX } from "react";
interface CardProgressItemProps {
    title: string;
    icon: JSX.Element;
    color: string;
    children?: React.ReactNode;
}


export function CardProgressItem({ title, icon, color, children }: CardProgressItemProps) {
    return (
        <div className="bg-card rounded-xl shadow-md p-8">

            <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-md flex items-center justify-center ${color}`}>
                    {icon}
                </div>
                <h3 className="text-xl text-dark font-semibold">{title}</h3>
            </div>

            {children}
        </div>
    );
}