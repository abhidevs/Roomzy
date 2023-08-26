import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaDb from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            {
                message: "Please login to your account to book reservation",
            },
            {
                status: 403,
            }
        );
    }

    const body = await request.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.json(
            {
                message: "Please fill all the fields",
            },
            {
                status: 400,
            }
        );
    }

    const listingAndReservation = await prismaDb.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    createdById: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation, { status: 201 });
}
