import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export const GET = async (request: NextRequest) => {
    const token = request.cookies.get('token');

    if (!token) {
        return NextResponse.json({ userId: null });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret));

        if (payload && 'userId' in payload) {
            return NextResponse.json({ userId: payload.userId });
        } else {
            throw new Error('Invalid token payload');
        }
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
