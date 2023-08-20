import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
    const listings = await getListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return <EmptyState showReset />;
    }

    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-ols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((item) => (
                    <ListingCard
                        key={item.id}
                        data={item}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
