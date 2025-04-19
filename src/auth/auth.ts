import { validateToken } from '@/app/auth/_api/validate-token';
import { cookies } from 'next/headers'

export async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (token === undefined) {
        return false;
    }
    const isValid = await validateToken(token as string);
    return isValid;
}
