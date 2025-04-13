import { Home, CreditCard, Clipboard, DollarSign, Settings, HelpCircle, WalletCards } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { JSX, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SideBarBase {
    path: string;
    name: string;
    icon: JSX.Element;
    module: "Home" | "Utilities" | "Extra";
}

export function SideBar() {
    const router = useRouter();
    const pathname = usePathname();
    const [active, setActive] = useState(pathname);

    const data_sidebar: SideBarBase[] = [
        { path: "/home", name: "Dashboard", icon: <Home size={20} />, module: "Home" },
        { path: "/transactions/new", name: "Transactions", icon: <CreditCard size={20} />, module: "Utilities" },
        { path: "/plan", name: "Plan", icon: <Clipboard size={20} />, module: "Utilities" },
        { path: "/credit-card/new", name: "Credit card", icon: <WalletCards size={20} />, module: "Utilities" },
        { path: "/budget", name: "Budget", icon: <DollarSign size={20} />, module: "Utilities" },
        { path: "/settings", name: "Settings", icon: <Settings size={20} />, module: "Utilities" },
        { path: "/help", name: "Help", icon: <HelpCircle size={20} />, module: "Extra" },
    ];

    const modules = ["Home", "Utilities", "Extra"];

    return (
        <aside className="w-64 h-screen p-4">
            <h2 className="text-xl font-extrabold mb-6 b bg-green-400 text-white p-3 rounded-lg">
                💰 FinancialsNice
            </h2>

            <nav>
                {modules.map((module) => {
                    const moduleItems = data_sidebar.filter((item) => item.module === module);
                    if (moduleItems.length === 0) return null;

                    return (
                        <div key={module} className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">{module}</h3>
                            <ul>
                                {moduleItems.map((item) => (
                                    <li key={item.path}>
                                        <button
                                            onClick={() => router.push(item.path)}
                                            className={`flex items-center w-full px-4 py-2 my-2 rounded-lg transition ${active === item.path ? "border-2 border-green-500 text-green-500" : "hover:underline"
                                                }`}
                                        >
                                            {item.icon}
                                            <span className="ml-3">{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {module !== "Extra" && <Separator className="my-4" />}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
