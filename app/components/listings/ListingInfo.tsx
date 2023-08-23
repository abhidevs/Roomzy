"use client";

import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
    createdBy: User | null;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    location: string;
    category?: {
        icon: IconType;
        label: string;
        description: string;
    };
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    createdBy,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    location,
    category,
}) => {
    const { getByValue } = useCountries();

    const locationCoordinates = getByValue(location)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {createdBy?.name}</div>
                    <Avatar src={createdBy?.image} />
                </div>

                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
        </div>
    );
};

export default ListingInfo;
