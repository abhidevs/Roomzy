import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import NotFound from "@/app/components/NotFound";
import DetailedListingPage from "./DetailedListingPage";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    let listing;
    const currentUser = await getCurrentUser();

    try {
        listing = await getListingById(params);
    } catch (error) {
        listing = null;
    }

    if (listing === null) {
        return <NotFound showGoToHome />;
    }

    const reservations = await getReservations(params);

    return (
        <DetailedListingPage
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
        />
    );
};

export default ListingPage;
