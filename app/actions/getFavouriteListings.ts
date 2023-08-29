import prismaDb from "@/app/libs/prismaDb";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

export default async function getFavouriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            NextResponse.json(
                { message: "Not authorized" },
                {
                    status: 403,
                }
            );
        }

        const favourites = prismaDb.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser?.favouriteIds || [])],
                },
            },
        });

        return favourites;
    } catch (error: any) {
        throw new Error(error);
    }
}
