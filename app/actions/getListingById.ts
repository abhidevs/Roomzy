import prismaDb from "@/app/libs/prismaDb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(params: IParams) {
    try {
        const { listingId } = params;
        const listing = await prismaDb.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                createdBy: true,
            },
        });

        if (!listing) {
            throw new Error("404 Not found");
        }
        console.log(listing);

        return listing;
    } catch (error: any) {
        throw new Error(error);
    }
}
