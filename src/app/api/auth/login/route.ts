import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDb } from '@/lib/utils';
import { User } from '@/lib/models';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const { username, password } = await req.json();
    connectToDb();

    try {
        const user = await User.findOne({ username }).exec();
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        if (!process.env.JWT_SECRET) {
            return NextResponse.json({ message: "JWT secret not configured" }, { status: 500 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const response = NextResponse.json({ user }, { status: 200 });
        response.headers.set(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=3600; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} SameSite=Strict`
        );

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
