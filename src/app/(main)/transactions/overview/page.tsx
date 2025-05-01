import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator";
import { TransactionsOverview } from "./transactions-overview";


export default function TransactionsPage() {
    return (
        <div className="space-y-6 p-10">
            <div className="">
                <HeaderPageUi title="Transações" description="Filtre e pesquise por suas transasções" link={{ link: "/transactions/form", title: "Nova transação" }} />
            </div>
            <Separator />
            <TransactionsOverview />
        </div>
    )
}