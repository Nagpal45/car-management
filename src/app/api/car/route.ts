import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/lib/models';
import { connectToDb } from '@/lib/utils';

//find all cars of current user
export async function GET(req: NextRequest) {
    await connectToDb();
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    
    try {
        const cars = await Car.find({ userId });
        return NextResponse.json({ cars });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await connectToDb();
    const { title, desc, tags, images } = await req.json();
    console.log(title, desc, tags, images);
    
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    
    try {
        const car = new Car({
            title,
            desc,
            tags,
            userId,
            images,
            slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now(),
        });
        await car.save();
        return NextResponse.json({ car }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}