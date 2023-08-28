import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaDb from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            {
                message: "Please login to your account to cancel reservation",
            },
            {
                status: 403,
            }
        );
    }

    const { reservationId } = params;
    if (!reservationId || typeof reservationId !== "string") {
        return NextResponse.json(
            {
                message: "Invalid reservation Id",
            },
            {
                status: 400,
            }
        );
    }

    const listingAndReservation = await prismaDb.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { createdById: currentUser.id },
                { listing: { createdById: currentUser.id } },
            ],
        },
    });

    return NextResponse.json(listingAndReservation, { status: 200 });
}
