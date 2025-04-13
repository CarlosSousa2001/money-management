import { ResetPasswordForm } from "./reset-password-form";

interface Props {
    params: {
        token: string
    }
}

export default async function SignInPage({ params }: Props) {
    const token = params.token
    return <ResetPasswordForm token={{ token }}/>
}