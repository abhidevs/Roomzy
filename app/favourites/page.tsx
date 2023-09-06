import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import FavouritesClient from "./FavouritesClient";

interface IParams {
    listingId?: string;
}

const FavouritesPage = async ({ params }: { params: IParams }) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Not authorized"
                subtitle="Please login to your account to see your favourites!"
                showLogin
            />
        );
    }

    const favourites = await getFavouriteListings();

    if (!favourites.length) {
        return (
            <EmptyState
                title="No favourites found"
                subtitle="Looks like you haven't favourited any listing!"
            />
        );
    }

    return (
        <FavouritesClient currentUser={currentUser} favourites={favourites} />
    );
};

export default FavouritesPage;
