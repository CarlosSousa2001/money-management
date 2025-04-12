import React from 'react';

interface SubHeaderProps {
    title: string;
    description: string;
}

export function HeaderPageUi({ title, description }: SubHeaderProps) {
    return (
        <div className="flex flex-col space-y-1.5">
            <h2 data-testid="header-page-title" className="text-2xl font-semibold leading-none tracking-tight">{title}</h2>
            <p data-testid="header-page-description" className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
};
