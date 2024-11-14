import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/lib/models';
import { connectToDb } from '@/lib/utils';

export async function POST(req: NextRequest) {
    connectToDb();
    const { title, desc, tags, images } = await req.json();
    const userId = req.headers.get('x-user-id');
    console.log("User ID:", userId);
    
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