import prismaDb from "@/app/libs/prismaDb";

export interface IListingParams {
    createdById?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    location?: string;
    category?: string;
}

export default async function getListings(params: IListingParams) {
    try {
        let query: any = {};
        const exactParams = ["createdById", "category", "location"];
        const countParams = ["guestCount", "roomCount", "bathroomCount"];

        for (const key in params) {
            const value = (params as any)[key];

            if (!value) {
                continue;
            }

            if (exactParams.includes(key)) {
                query[key] = value;
            } else if (countParams.includes(key)) {
                query[key] = { gte: +value };
            }
        }

        const { startDate, endDate } = params;

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            },
                            {
                                startDate: { gte: startDate },
                                endDate: { lte: endDate },
                            },
                        ],
                    },
                },
            };
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
