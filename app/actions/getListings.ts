import prismaDb from "@/app/libs/prismaDb";

export default async function getListings() {
    try {
        const listings = await prismaDb.listing.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}
