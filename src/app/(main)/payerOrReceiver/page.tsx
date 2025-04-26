import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator"; 
import { PayerOrReceiverOverview } from "./payer-or-receiver-overview";


export default function PayerOrReceiver() {
    return (
        <div className="space-y-6 p-10  w-full m-auto">
            <div className="">
                <HeaderPageUi title="Gerenciamento de usuários" description="Gerencie seus pagadores e recebedores" />
            </div>
            <Separator />
            <PayerOrReceiverOverview />
        </div>
    )
}