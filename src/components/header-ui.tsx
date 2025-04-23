"use client"

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMediaQuery } from "@/hooks/use-media-query";
import { SideBarShadcnUi } from "./side-bar-shadcnui";
import { ModeToggle } from "./mode-theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function HeaderUi() {
    const router = useRouter();
    const isDesktop = useMediaQuery("(min-width: 788px)");

    function handleLogout() {
        setCookie("sshtk", "", { maxAge: -1 });
        router.push("/auth/sign-in");
    }
    return (
        <header className="w-full h-[72px] flex items-center justify-between  dark:border-gray-700 rounded-none bg-transparent dark:bg-transparent py-4 md:px-30 px-4">
            <div className="flex items-center gap-4">
                {!isDesktop && <SideBarShadcnUi />}
                <div className="flex">
                    <Bell size={19} className="text-zinc-500" />
                    <span className="block w-2 h-2 bg-red-500 rounded-full -ml-2"></span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ModeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="size-12">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>teste@gmail.com</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href={"/user"}>
                                    Perfil
                                </Link>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Billing
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleLogout()}>
                            Sair
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    )
}