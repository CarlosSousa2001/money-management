"use client"
import { SideBar } from "./side-bar";
import { HeaderUi } from "./header-ui";
import { useMediaQuery } from "@/hooks/use-media-query";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    const isDesktop = useMediaQuery("(min-width: 788px)");

    return (
        <div className="flex min-h-screen">
            {/* Sidebar Mobile com Sheet */}
            {/* Sidebar Desktop */}
            {isDesktop && (
                <aside className="w-64 bg-white  text-zinc-900">
                    <SideBar />
                </aside>
            )}

            {/* Conteúdo Central */}
            <main className="flex-1">
                <HeaderUi />
                <div className={`w-full bg-slate-50 rounded-4xl min-h-screen  ${isDesktop ? "p-6" : "p-0"}`}>
                    {/* Conteúdo Principal */}
                    <div className="flex flex-col mx-auto max-w-6xl">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
