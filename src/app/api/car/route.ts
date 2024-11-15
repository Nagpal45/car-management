import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/lib/models';
import { connectToDb } from '@/lib/utils';

//find all cars of current user
export const GET = async (req: NextRequest) => {
    await connectToDb();
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    const searchQuery = req.nextUrl.searchParams.get("search") || "";

    try {
        const searchRegex = new RegExp(searchQuery, 'i');
        const cars = await Car.find({
            userId,
            $or: [
                { title: { $regex: searchRegex } },
                { desc: { $regex: searchRegex } },
                { tags: { $in: [searchQuery] } }
            ]
        });
        return NextResponse.json({ cars });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    await connectToDb();
    const { title, desc, tags, images } = await req.json();
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
        });
        await car.save();
        return NextResponse.json({ car }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}