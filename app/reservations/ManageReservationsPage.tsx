"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface ManageReservationsPageProps {
    reservations?: Reservation[];
    currentUser?: User | null;
}

const ManageReservationsPage: React.FC<ManageReservationsPageProps> = ({
    currentUser,
    reservations = [],
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onDelete = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`/api/reservations/${id}`)
                .then(() => {
                    toast.success("Reservations cancelled successfully");
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
                title="Manage Reservations on your properties"
                subtitle="Bookings on properties made by other users"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation: any) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onDelete}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ManageReservationsPage;
