import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "../components/EmptyState";
import ManageReservationsPage from "./ManageReservationsPage";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Not authorized"
                subtitle="Please login to your account to view reservations"
            />
        );
    }

    const reservations = await getReservations({
        ownerId: currentUser.id,
    });

    if (!reservations.length) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like there are no reservations on your properties"
            />
        );
    }

    return (
        <ManageReservationsPage
            reservations={reservations}
            currentUser={currentUser}
        />
    );
};

export default ReservationsPage;
