import {
  Home,
  CreditCard,
  Clipboard,
  DollarSign,
  Settings,
  HelpCircle,
  WalletCards,
  Users,
  Wallet,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { JSX } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

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

export function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const data_sidebar: SideBarBase[] = [
    { path: "/home", name: "Dashboard", icon: <Home size={20} />, module: "Home" },
    { path: "/transactions/overview", name: "Transações", icon: <CreditCard size={20} />, module: "Utilities" },
    // { path: "/plan", name: "Plan", icon: <Clipboard size={20} />, module: "Utilities" },
    { path: "/card/new", name: "Cartão de crédito", icon: <WalletCards size={20} />, module: "Utilities" },
    { path: "/wallet", name: "Carteira", icon: <Wallet size={20} />, module: "Utilities" },
    // { path: "/budget", name: "Budget", icon: <DollarSign size={20} />, module: "Utilities" },
    { path: "/payerOrReceiver", name: "Pagadores", icon: <Users size={20} />, module: "Manager" },

    { path: "/help", name: "Ajuda", icon: <HelpCircle size={20} />, module: "Extra" },
    { path: "/settings", name: "Configurações", icon: <Settings size={20} />, module: "Extra" },
  ];

  const modules: SideBarBase["module"][] = ["Home", "Utilities", "Manager", "Extra"];

  return (
  <aside className="fixed top-0 left-0 w-64 h-screen p-4 flex flex-col justify-between ">
    <div>
      <h2 className="text-xl font-extrabold mb-6 bg-primary text-white p-3 rounded-lg">
        💰 FinancialsNice
      </h2>

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
                      onClick={() => router.push(item.path)}
                      className={`flex items-center w-full px-4 py-2 my-2 rounded-lg transition ${
                        pathname === item.path
                          ? "bg-primary text-white"
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
    </div>

    {/* Botão "Obtenha Pro" fixo no final */}
    <div className="pt-4 border-t mt-4">
      <button
        onClick={() => router.push('/plan')}
        className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        aria-label="Obtenha a versão Pro"
      >
        Obtenha Pro
      </button>
    </div>
  </aside>
);

}
