"use client";

import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import categories from "@/app/constants/categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.CATEGORY);
    const rentModal = useRentModal();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guesCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
    });

    const selectedCategory = watch("category");
    const selectedLocation = watch("location");

    // Have to import and use the location map component this way, unless it not gonna work in nextjs
    const LocationMap = useMemo(
        () =>
            dynamic(() => import("../LocationMap"), {
                ssr: false,
            }),
        [selectedLocation]
    );

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onBack = () => {
        setCurrentStep((value) => Math.max(value - 1, STEPS.CATEGORY));
    };

    const onNext = () => {
        setCurrentStep((value) => Math.min(value + 1, STEPS.PRICE));
    };

    const actionLabel = useMemo(() => {
        if (currentStep === STEPS.PRICE) {
            return "Create";
        }

        return "Next";
    }, [currentStep]);

    const secondaryActionLabel = useMemo(() => {
        if (currentStep === STEPS.CATEGORY) {
            return undefined;
        }

        return "Back";
    }, [currentStep]);

    let bodyContent = <></>;

    // Rent form body content for category step
    const categoryStepContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your property"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue("category", category)
                            }
                            selected={selectedCategory === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    // Rent form body content for location step
    const locationStepContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where is your property located?"
                subtitle="Help guests find your property"
            />
            <CountrySelect
                value={selectedLocation}
                onChange={(value) => setCustomValue("location", value)}
            />
            <LocationMap center={selectedLocation?.latlng} />
        </div>
    );

    switch (currentStep) {
        case STEPS.CATEGORY:
            bodyContent = categoryStepContent;
            break;

        case STEPS.LOCATION:
            bodyContent = locationStepContent;
            break;

        default:
            break;
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            title="Airbnb your home!"
            onClose={rentModal.onClose}
            body={bodyContent}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={
                currentStep === STEPS.CATEGORY ? undefined : onBack
            }
            onSubmit={onNext}
        />
    );
};

export default RentModal;
