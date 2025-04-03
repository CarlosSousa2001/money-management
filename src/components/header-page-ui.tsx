import React from 'react';

interface SubHeaderProps {
    title: string;
    description: string;
}

export function HeaderPageUi({ title, description }: SubHeaderProps) {
    return (
        <div className="flex flex-col space-y-1.5">
            <h2 className="text-2xl font-semibold leading-none tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
};
