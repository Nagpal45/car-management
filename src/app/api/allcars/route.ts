import { NextResponse } from 'next/server';
import { Car } from '@/lib/models';
import { connectToDb } from '@/lib/utils';

//find all cars in db
export async function GET() {
    await connectToDb();
    try {
        const cars = await Car.find().exec();
        return NextResponse.json({ cars }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}