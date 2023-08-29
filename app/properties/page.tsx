import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Not authorized"
                subtitle="Please login top your account!"
            />
        );
    }

    const properties = await getListings({
        createdById: currentUser.id,
    });

    if (!properties.length) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you haven't listed any property!"
            />
        );
    }

    return (
        <PropertiesClient currentUser={currentUser} properties={properties} />
    );
};

export default PropertiesPage;
