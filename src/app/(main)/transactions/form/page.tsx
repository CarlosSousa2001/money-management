import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator";
import { TransactionsForm } from "./transactions-form";
import { Suspense } from "react";

export default function TransactionsPage() {
    return (
        <div className="space-y-6 p-10">
            <div className="">
                <HeaderPageUi title="Transactions" description="Manager your transactions" link={{ link: "/transactions/overview", title: "Transações" }} />
            </div>
            <Separator />
            <Suspense fallback={<div>Loading...</div>}>
                <TransactionsForm />
            </Suspense>
        </div>
    )
}