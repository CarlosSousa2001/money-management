"use client";

import {
  Home,
  CreditCard,
  Clipboard,
  DollarSign,
  Settings,
  HelpCircle,
  AlignJustify,
  WalletCards,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { JSX, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SideBarBase {
  path: string;
  name: string;
  icon: JSX.Element;
  module: "Home" | "Utilities" | "Extra" | "Manager";
}

const moduleLabels: Record<SideBarBase["module"], string> = {
  Home: "Início",
  Utilities: "Utilitários",
  Extra: "Extras",
  Manager: "Gerenciamento",
};

export function SideBarShadcnUi() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);

  const data_sidebar: SideBarBase[] = [
    { path: "/home", name: "Dashboard", icon: <Home size={20} />, module: "Home" },
    { path: "/transactions/overview", name: "Transações", icon: <CreditCard size={20} />, module: "Utilities" },
    { path: "/card/new", name: "Cartão de crédito", icon: <WalletCards size={20} />, module: "Utilities" },
    { path: "/payerOrReceiver", name: "Pagadores", icon: <Users size={20} />, module: "Manager" },
    { path: "/settings", name: "Configurações", icon: <Settings size={20} />, module: "Extra" },
    { path: "/help", name: "Ajuda", icon: <HelpCircle size={20} />, module: "Extra" },
  ];

  const modules: SideBarBase["module"][] = ["Home", "Utilities", "Manager", "Extra"];

  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify className="text-black dark:text-white" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-2xl font-extrabold mb-6 bg-blue-400 text-white p-3 rounded-lg mt-4">
            💰 FinancialsNice
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <aside className="w-64 h-screen px-4">
          <nav>
            {modules.map((module) => {
              const moduleItems = data_sidebar.filter((item) => item.module === module);
              if (moduleItems.length === 0) return null;

              return (
                <div key={module} className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                    {moduleLabels[module]}
                  </h3>
                  <ul>
                    {moduleItems.map((item) => (
                      <li key={item.path}>
                        <button
                          onClick={() => {
                            setActive(item.path);
                            router.push(item.path);
                          }}
                          className={`flex items-center w-full px-4 py-2 my-2 rounded-lg transition ${
                            active === item.path
                              ? "border-2 border-blue-500 text-blue-500"
                              : "hover:underline"
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
      </SheetContent>
    </Sheet>
  );
}
