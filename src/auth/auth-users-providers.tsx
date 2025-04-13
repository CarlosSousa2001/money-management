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
    const pathname = usePathname(); // Obtém a URL atual

    // Definição das rotas públicas (não precisam de autenticação)
    const publicRoutes = [
        '/auth/sign-in',
        '/auth/sign-up',
        '/auth/forgot-password',
        '/auth/reset-password/[token]',
    ];

    useEffect(() => {
        const token = getCookie('token') as string;

        // Se a rota for pública, não faz redirecionamento
        if (publicRoutes.includes(pathname)) {
            setLoading(false);
            return;
        }

        // Se não tiver token e estiver em uma rota protegida, redireciona para login
        if (!token) {
            console.log('Usuário não autenticado dentro do context');
            setIsAuthenticated(false);
            setLoading(false);
            router.push('/auth/sign-in');
            return;
        }

        // Se houver token, valida o token na API
        const authenticateUser = async () => {
            if (token) {
                const response = await validateToken(token);
                if (response.valid) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push('/auth/sign-in');
                }
            } else {
                setIsAuthenticated(false);
                router.push('/auth/sign-in');
            }
            setLoading(false);
        };

        authenticateUser();
    }, [router, pathname]);

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
