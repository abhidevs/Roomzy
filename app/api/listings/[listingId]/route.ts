import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaDb from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            {
                message: "Please login to your account to delete listing",
            },
            {
                status: 403,
            }
        );
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
        return NextResponse.json(
            {
                message: "Invalid listing Id",
            },
            {
                status: 400,
            }
        );
    }

    const listing = await prismaDb.listing.deleteMany({
        where: {
            id: listingId,
            createdById: currentUser.id,
        },
    });

    return NextResponse.json(
        { message: "Listing deleted successfully" },
        { status: 200 }
    );
}
