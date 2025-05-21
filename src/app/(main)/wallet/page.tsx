import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator";
import { WalletContainer } from "./wallet-container";

export default function WalletPage() {
    return (
        <div className="space-y-6 p-10 min-w-full w-full m-auto">
            <div className="">
                <HeaderPageUi title="Carteira" description="Gerencie sua carteira" />
            </div>
            <Separator />
            <WalletContainer />
        </div>
    );
}
