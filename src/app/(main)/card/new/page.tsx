import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator";
import { CreditCardForms } from "./credit-card-form";

export default function CreditCardPage(){
    return (
        <div className="space-y-6 p-10">
        <div className="">
            <HeaderPageUi title="Cartões de crédito" description="Crie novos cartões de crédito" />
        </div>
        <Separator />
        <CreditCardForms/>
    </div>
    )
}