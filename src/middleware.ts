import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const origin = request.headers.get('origin');
    const allowedOrigins = ['https://car-management-phi.vercel.app', 'http://localhost:3000'];

    if (request.method === 'OPTIONS') {
        const response = new NextResponse(null, { status: 204 });
        response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes(origin!) ? origin! : '');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    }

    // Check for token
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret));

        const response = NextResponse.next();

        if (payload && 'userId' in payload) {
            response.headers.set('x-user-id', payload.userId as string);
        } else {
            throw new Error('Invalid token payload');
        }
        if (origin && allowedOrigins.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
            response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/api/car/:path*', '/product/:path*', '/productCreate', '/productList'],
};
