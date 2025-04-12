import { isAuthenticated } from "@/auth/auth";
import { redirect } from 'next/navigation'

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const authenticated = await isAuthenticated();

    if (authenticated) {
        redirect('/home');
    }

    return children
}