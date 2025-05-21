"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from 'next/navigation';
import { validateToken } from '@/app/auth/_api/validate-token';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const publicRoutes = [
        '/auth/sign-in',
        '/auth/sign-up',
        '/auth/forgot-password',
        '/auth/reset-password',
    ];

    const openAuthenticatedRoutes = [
        '/home',
        '/user',
        '/help',
        '/plan',
        '/wallet'
    ];

    useEffect(() => {
        const token = getCookie('sshtk');
        const isPublic = publicRoutes.some(route => pathname.startsWith(route));
        const isOpenAuthenticated = openAuthenticatedRoutes.some(route => pathname.startsWith(route));

        if (isPublic) {
            setLoading(false);
            return;
        }

        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            router.push('/auth/sign-in');
            return;
        }

        const authenticateUser = async () => {
            const isValid = await validateToken(token as string);

            if (!isValid) {
                setIsAuthenticated(false);
                setLoading(false);
                router.push('/auth/sign-in');
                return;
            }

            if (isOpenAuthenticated) {
                setIsAuthenticated(true);
                setLoading(false);
                return;
            }

            const userStr = localStorage.getItem('user');
            if (!userStr) {
                setIsAuthenticated(false);
                setLoading(false);
                router.push('/auth/sign-in');
                return;
            }

            const user = JSON.parse(userStr);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const allPermissions = user.roles?.flatMap((role: any) => role.permissions.map((p: any) => p.name)) || [];

            if (!allPermissions.includes(pathname)) {
                setIsAuthenticated(false);
                setLoading(false);
                router.push('/home');
                return;
            }

            setIsAuthenticated(true);
            setLoading(false);
        };

        authenticateUser();
    }, [pathname]);


    return (
        <AuthContext.Provider value={{ isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
