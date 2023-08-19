import { NextResponse } from "next/server";

import prismaDb from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description,
    } = body;

    Object.keys(body).forEach((key: any) => {
        if (!body[key]) {
            NextResponse.error();
        }
    });

    const listing = await prismaDb.listing.create({
        data: {
            title,
            description,
            category,
            location: location.value,
            imageSrc,
            guestCount,
            roomCount,
            bathroomCount,
            price: parseInt(price, 10),
            createdById: currentUser.id,
        },
    });

    return NextResponse.json(listing, { status: 201 });
}
