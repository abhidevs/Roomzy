"use client";

import { useMemo } from "react";
import { RiFilter3Line } from "react-icons/ri";
import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import useFiltersModal from "@/app/hooks/useFiltersModal";

const Filtersbar = () => {
    const filtersModal = useFiltersModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const location = params?.get("location");
    const startDate = params?.get("startDate");
    const endDate = params?.get("endDate");
    const guestCount = params?.get("guestCount");

    const locationLabel = useMemo(() => {
        if (location) {
            return getByValue(location as string)?.label;
        }

        return "Anywhere";
    }, [location, getByValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);

            if (diff === 0) {
                diff = 1;
            }

            return `${diff} Days`;
        }

        return "Anytime";
    }, [startDate, endDate]);

    const guestsLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`;
        }

        return "Any Guests";
    }, [guestCount]);

    return (
        <div
            onClick={filtersModal.onOpen}
            className="border-[1px] w-2/3 md:w-auto py-1 md:py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold   px-6 border--x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm pl-6 pr-1 md:pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">{guestsLabel}</div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <RiFilter3Line size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filtersbar;
