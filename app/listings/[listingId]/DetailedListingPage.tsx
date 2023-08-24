"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Listing, Reservation, User } from "@prisma/client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import categories from "@/app/constants/categories";
import useLgoinModal from "@/app/hooks/useLoginModal";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

interface DetailedListingPageProps {
    reservations?: Reservation[];
    listing: Listing & {
        createdBy: User;
    };
    currentUser?: User | null;
}

const DetailedListingPage: React.FC<DetailedListingPageProps> = ({
    listing,
    currentUser,
    reservations = [],
}) => {
    const loginModal = useLgoinModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: Reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios
            .post("/api/reservations", {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then((res) => {
                toast.success("Reservation added successfully");
                setDateRange(initialDateRange);

                // Redirect to "/trips"
                router.refresh();
            })
            .catch((err) => {
                toast.error(err.message || "Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentUser, reservations, listing, router, dateRange, loginModal]);

    const category = useMemo(
        () => categories.find((item) => item.label === listing.category),
        [listing.category]
    );

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        id={listing.id}
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        location={listing.location}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            createdBy={listing.createdBy}
                            category={category}
                            description={listing.description}
                            guestCount={listing.guestCount}
                            roomCount={listing.roomCount}
                            bathroomCount={listing.bathroomCount}
                            location={listing.location}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default DetailedListingPage;
