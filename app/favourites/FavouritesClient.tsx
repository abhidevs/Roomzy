"use client";

import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavouritesClientProps {
    currentUser: User;
    favourites: Listing[];
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({
    currentUser,
    favourites,
}) => {
    return (
        <Container>
            <Heading
                title="My favourites"
                subtitle="Listings that you have favourited"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {favourites.map((favourite: Listing) => (
                    <ListingCard
                        key={favourite.id}
                        data={favourite}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default FavouritesClient;
