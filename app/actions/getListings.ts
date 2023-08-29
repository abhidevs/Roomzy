import prismaDb from "@/app/libs/prismaDb";

export interface IListingParams {
    createdById?: string;
}

export default async function getListings(params: IListingParams) {
    try {
        const { createdById } = params;

        let query: any = {};

        if (createdById) {
            query.createdById = createdById;
        }

        const listings = await prismaDb.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc",
            },
        });

        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}
