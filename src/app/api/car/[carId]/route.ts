import { NextResponse } from 'next/server';
import { Car } from '@/lib/models';
import type { NextRequest } from 'next/server';
import { connectToDb } from '@/lib/utils';

export const GET = async(req: NextRequest, { params }: { params: Promise<{ carId: string }> }) => {
    const {carId} = await params;
    try {
        await connectToDb();
        const car = await Car.findById(carId).exec();
        return NextResponse.json({ car }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ carId: string }> }) => {
    const { carId } = await params;
    const { title, desc, tags, images } = await req.json();
    try {
        await connectToDb();
        const car = await Car.findById(carId).exec()
        if (!car) {
            return NextResponse.json({ message: "Car not found" }, { status: 404 });
        }
        car.title = title;
        car.desc = desc;
        car.tags = tags;
        car.images = images;
        await car.save();
        return NextResponse.json({ car }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ carId: string }> }) => {
    const { carId } = await params;
    try {
        await connectToDb();
        const car = await Car.findById(carId).exec();
        if (!car) {
            return NextResponse.json({ message: "Car not found" }, { status: 404 });
        }
        await Car.deleteOne({ _id: carId }).exec();
        return NextResponse.json({ message: "Car deleted" }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}