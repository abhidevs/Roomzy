import getListingById from "@/app/actions/getListingById";
import NotFound from "@/app/components/NotFound";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    let listing;

    try {
        listing = await getListingById(params);
    } catch (error) {
        listing = null;
    }

    if (listing === null) {
        return <NotFound showGoToHome />;
    }

    return <div>{listing.title}</div>;
};

export default ListingPage;
