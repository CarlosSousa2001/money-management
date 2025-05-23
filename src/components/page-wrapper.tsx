"use client"
import { SideBar } from "./side-bar";
import { HeaderUi } from "./header-ui";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from "react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    const isDesktop = useMediaQuery("(min-width: 788px)");

    const [queryClient] = useState(() => new QueryClient())

    return (
        <div className="flex min-h-screen">
            <QueryClientProvider client={queryClient}>
                {/* Sidebar Mobile com Sheet */}
                {/* Sidebar Desktop */}
                {isDesktop && (
                    <aside className="w-64  text-zinc-900 dark:text-white">
                        <SideBar />
                    </aside>
                )}

                {/* Conteúdo Central */}
                <main className="flex-1">
                    <HeaderUi />
                    <div className={`w-full bg-slate-200 dark:bg-neutral-950 rounded-4xl min-h-screen  ${isDesktop ? "p-6" : "p-0"}`}>
                        {/* Conteúdo Principal */}
                        <div className="flex flex-col mx-auto max-w-7xl">
                            {children}
                        </div>
                    </div>
                </main>
            </QueryClientProvider>
        </div>
    );
}
