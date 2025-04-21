import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator"; import { UsersProfileForm } from "./user-profile-form";
;

export default function UserProfilePage() {
    return (
        <div className="space-y-6 p-10 max-w-[800px] w-full m-auto">
            <div className="">
                <HeaderPageUi title="Configurações do perfil" description="Gerencie seu perfil" />
            </div>
            <Separator />
            <UsersProfileForm />
        </div>
    )
}