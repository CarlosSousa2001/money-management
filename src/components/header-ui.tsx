import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMediaQuery } from "@/hooks/use-media-query";
import { SideBarShadcnUi } from "./side-bar-shadcnui";

export function HeaderUi() {
    const isDesktop = useMediaQuery("(min-width: 788px)");
    return (
        <header className="w-full h-[72px] flex items-center justify-between  dark:border-gray-700 rounded-none bg-transparent dark:bg-transparent py-4 md:px-30 px-4">
            <div className="flex items-center gap-4">
                {!isDesktop && <SideBarShadcnUi />}
                <div className="flex">
                    <Bell size={19} className="text-zinc-500" />
                    <span className="block w-2 h-2 bg-red-500 rounded-full -ml-2"></span>
                </div>
            </div>

            <Avatar className="size-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </header>
    )
}