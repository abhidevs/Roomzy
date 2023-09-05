import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

interface IParams {
    listingId?: string;
}

const TripsPage = async ({ params }: { params: IParams }) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Not authorized"
                subtitle="Please login to your account!"
                showLogin
            />
        );
    }

    const reservations = await getReservations({
        buyerId: currentUser.id,
    });

    if (!reservations.length) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you haven't reserved any trips!"
            />
        );
    }

    return (
        <TripsClient currentUser={currentUser} reservations={reservations} />
    );
};

export default TripsPage;
