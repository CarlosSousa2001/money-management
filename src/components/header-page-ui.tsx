import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

interface LinkProps {
    link: string;
    title: string;
}

interface SubHeaderProps {
    title: string;
    description: string;
    link?: LinkProps;
    onHandleClick?: () => void;
    onhandleClickTtitle?: string;
}

export function HeaderPageUi({ title, description, link, onHandleClick, onhandleClickTtitle }: SubHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col space-y-1.5">
                <h2
                    data-testid="header-page-title"
                    className="text-2xl font-bold leading-none tracking-tight"
                >
                    {title}
                </h2>
                <p
                    data-testid="header-page-description"
                    className="text-sm text-muted-foreground"
                >
                    {description}
                </p>
            </div>

            {(link || onHandleClick) && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    {link && (
                        <Link
                            href={link.link}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            {link.title}
                        </Link>
                    )}

                    {onHandleClick && (
                        <Button onClick={onHandleClick}>
                            {onhandleClickTtitle}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

