"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import categories from "@/app/constants/categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";

interface DetailedListingPageProps {
    reservations?: Reservation[];
    listing: Listing & {
        createdBy: User;
    };
    currentUser?: User | null;
}

const DetailedListingPage: React.FC<DetailedListingPageProps> = ({
    listing,
    currentUser,
}) => {
    const category = useMemo(
        () => categories.find((item) => item.label === listing.category),
        [listing.category]
    );

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        id={listing.id}
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        location={listing.location}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            createdBy={listing.createdBy}
                            category={category}
                            description={listing.description}
                            guestCount={listing.guestCount}
                            roomCount={listing.roomCount}
                            bathroomCount={listing.bathroomCount}
                            location={listing.location}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default DetailedListingPage;
