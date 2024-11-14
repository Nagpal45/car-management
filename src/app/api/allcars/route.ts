import { NextResponse } from 'next/server';
import { Car } from '@/lib/models';
import { connectToDb } from '@/lib/utils';

export async function GET() {
    connectToDb();
    try {
        const cars = await Car.find().exec();
        return NextResponse.json({ cars }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}