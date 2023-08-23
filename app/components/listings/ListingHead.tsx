"use client";

import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    id: string;
    title: string;
    imageSrc: string;
    location: string;
    currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    id,
    title,
    imageSrc,
    location,
    currentUser,
}) => {
    const { getByValue } = useCountries();

    const country = getByValue(location);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${country?.region}, ${country?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt={title}
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
};

export default ListingHead;
