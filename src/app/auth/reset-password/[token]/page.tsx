import { ResetPasswordForm } from "./reset-password-form";

type tParams = Promise<{ slug: string[] }>;


export default async function SignInPage({ params }: { params: tParams }) {
    const { slug }: { slug: string[] } = await params; // fix this line
    const token = slug[1];
    return <ResetPasswordForm token={{ token }} />
}