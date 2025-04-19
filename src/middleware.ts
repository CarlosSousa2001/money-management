import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { validateToken } from './app/auth/_api/validate-token';

export function middleware(request: NextRequest) {

    const token = request.cookies.get("token")?.value;
    console.log(token)

    if (!token) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl))

        // const signInUrl = new URL('/auth/sign-in', request.url);
        // return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|auth/sign-in|auth/sign-up|auth/forgot-password|auth/reset-password).*)'],
};
