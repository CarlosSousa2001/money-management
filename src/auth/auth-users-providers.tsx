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

    useEffect(() => {
        const token = getCookie('sshtk');
        const isPublic = publicRoutes.some(route => pathname.startsWith(route));

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
            if (isValid) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push('/auth/sign-in');
            }

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
