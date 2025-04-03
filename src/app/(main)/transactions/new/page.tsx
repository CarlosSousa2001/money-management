import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator";
import { TransactionsForm } from "./transactions-form";

export default function TransactionsPage() {
    return (
        <div className="space-y-6 p-10">
            <div className="">
                <HeaderPageUi title="Transactions" description="Manager your transactions" />
            </div>
            <Separator />
            <TransactionsForm />
        </div>
    )
}