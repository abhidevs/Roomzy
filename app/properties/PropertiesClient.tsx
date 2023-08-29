"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    currentUser: User;
    properties: Listing[];
}

const TripsClient: React.FC<TripsClientProps> = ({
    currentUser,
    properties,
}) => {
    const router = useRouter();

    const [deletingId, setDeletingId] = useState("");

    const onDelete = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success("Listing deleted successfully");
                    router.refresh();
                })
                .catch((err) => {
                    toast.error(
                        err?.response?.data?.error || "Something went wrong"
                    );
                })
                .finally(() => {
                    setDeletingId("");
                });
        },
        [router]
    );

    return (
        <Container>
            <Heading
                title="My properties"
                subtitle="Properties that you have listed"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {properties.map((property: any) => (
                    <ListingCard
                        key={property.id}
                        data={property}
                        actionId={property.id}
                        onAction={onDelete}
                        disabled={deletingId === property.id}
                        actionLabel="Delete property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default TripsClient;
