import { NextResponse } from 'next/server';
import { User } from '@/lib/models';
import { connectToDb } from '@/lib/utils';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const { username, email, password } = await req.json();
    connectToDb();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}