"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import queryString from "query-string";
import { formatISO } from "date-fns";

import useFiltersModal from "@/app/hooks/useFiltersModal";
import Modal from "./Modal";
import { CountrySelectValue } from "@/app/types";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const FiltersModal = () => {
    const filtersModal = useFiltersModal();
    const router = useRouter();
    const params = useSearchParams();

    const [currentStep, setCurrentStep] = useState(STEPS.LOCATION);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const Map = useMemo(
        () => dynamic(() => import("../LocationMap"), { ssr: false }),
        [location]
    );

    const onBack = useCallback(() => {
        setCurrentStep((value) => Math.max(value - 1, STEPS.LOCATION));
    }, []);

    const onNext = useCallback(() => {
        setCurrentStep((value) => Math.min(value + 1, STEPS.INFO));
    }, []);

    const onSubmit = useCallback(async () => {
        if (currentStep !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = queryString.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            location: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = queryString.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        setCurrentStep(STEPS.LOCATION);
        filtersModal.onClose();
        router.push(url);
    }, [
        currentStep,
        filtersModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params,
    ]);

    const actionLabel = useMemo(() => {
        return currentStep === STEPS.INFO ? "Search" : "Next";
    }, [currentStep]);

    const secondaryActionLabel = useMemo(() => {
        return currentStep !== STEPS.LOCATION ? "Back" : undefined;
    }, [currentStep]);

    let bodyContent;

    if (currentStep === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where do you wanna go?"
                    subtitle="Find your desired location"
                />

                <CountrySelect
                    value={location}
                    onChange={(value) =>
                        setLocation(value as CountrySelectValue)
                    }
                />
                <hr />

                <Map center={location?.latlng} />
            </div>
        );
    } else if (currentStep === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Select your dates to reserve"
                />

                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    } else if (currentStep === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Give a little more info to find suitable places"
                    subtitle="Find the perfect places for your trip"
                />

                <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />

                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />

                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={filtersModal.isOpen}
            onClose={filtersModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            body={bodyContent}
            secondaryAction={
                currentStep !== STEPS.LOCATION ? onBack : undefined
            }
            secondaryActionLabel={secondaryActionLabel}
        />
    );
};

export default FiltersModal;
