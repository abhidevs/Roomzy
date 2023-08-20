import { NextResponse } from "next/server";

import prismaDb from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listing Id");
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds.push(listingId);
    const user = await prismaDb.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favouriteIds: favouriteIds,
        },
    });

    return NextResponse.json(user, { status: 200 });
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listing Id");
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds = favouriteIds.filter((id) => id !== listingId);
    const user = await prismaDb.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favouriteIds: favouriteIds,
        },
    });

    return NextResponse.json(user, { status: 200 });
}
