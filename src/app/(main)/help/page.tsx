import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator";
import { HelpFAQSection } from "./help-faq-section";
import HelpContactForm from "./help-contact-form";
import HelpDevLinks from "./help-dev-links";


export default function UserProfilePage() {
    return (
        <div className="space-y-6 p-10 max-w-[800px] w-full m-auto">
            <div className="">
                <HeaderPageUi title="Ajuda" description="Perguntas frequentes e envio de dúvidas" />
            </div>
            <Separator />
            <div className="space-y-6">
                <HelpFAQSection />
                <HelpContactForm />
                <HelpDevLinks />
            </div>
        </div>
    )
}