import prismaDb from "@/app/libs/prismaDb";

interface IParams {
    listingId?: string;
    buyerId?: string;
    ownerId?: string;
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, buyerId, ownerId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (buyerId) {
            query.createdById = buyerId;
        }

        if (ownerId) {
            query.listing = { createdById: ownerId };
        }

        const reservations = prismaDb.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return reservations;
    } catch (error: any) {
        throw new Error(error);
    }
}
