import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLgoinModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

interface IUseFavourties {
    listingId: string;
    currentUser?: User | null;
}

const useFavourites = ({ listingId, currentUser }: IUseFavourties) => {
    const router = useRouter();
    const loginModal = useLgoinModal();

    const hasFavourited = useMemo(() => {
        const existingFavourites = currentUser?.favouriteIds || [];
        return existingFavourites.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavourite = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!currentUser) {
                return loginModal.onOpen();
            }

            try {
                let request;

                if (hasFavourited) {
                    request = () =>
                        axios.delete(`/api/favourites/${listingId}`);
                } else {
                    request = () => axios.post(`/api/favourites/${listingId}`);
                }

                await request();
                router.refresh();
                toast.success(
                    hasFavourited
                        ? "Removed from favourites"
                        : "Added to favourites"
                );
            } catch (error: any) {
                toast.error(error.message || "Something went wronng");
            }
        },
        [currentUser, listingId, hasFavourited, loginModal, router]
    );

    return { hasFavourited, toggleFavourite };
};

export default useFavourites;
