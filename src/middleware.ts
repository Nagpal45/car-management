import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    console.log("Token:", token);

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret));
        console.log("Payload:", payload);
        
        const response = NextResponse.next();

        if (payload && 'userId' in payload) {
            response.headers.set('x-user-id', payload.userId as string);
        } else {
            throw new Error('Invalid token payload');
        }
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/api/car/:path*', '/product/:path*'],
};
