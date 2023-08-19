"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import axios from "axios";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import categories from "@/app/constants/categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "./ImageUpload";
import Input from "../inputs/Input";

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
    const [isLoading, setIsLoading] = useState(false);

    const rentModal = useRentModal();
    const router = useRouter();

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
            guestCount: 1,
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
    const selectedGuestCount = watch("guestCount");
    const selectedRoomCount = watch("roomCount");
    const selectedBathroomCount = watch("bathroomCount");
    const selectedImageSrc = watch("imageSrc");

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (currentStep !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);
        axios
            .post("/api/listings", data)
            .then(() => {
                toast.success("Listing created successfully!");
                router.refresh();
                reset();
                setCurrentStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch((err) => {
                toast.error(err.message || "Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            });
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

    // Returns rent form body content for category step
    const getCategoryStepContent = () => (
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

    // Returns rent form body content for location step
    const getLocationStepContent = () => (
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

    // Returns body content for info step
    const getInfoStepContent = () => (
        <div className="flex flex-col gap-8">
            <Heading
                title="Share some basic info about your property"
                subtitle="What amentities do you have?"
            />
            <hr />

            <Counter
                title="Guests"
                subtitle="How many guests do you allow?"
                value={selectedGuestCount}
                onChange={(value) => setCustomValue("guestCount", value)}
            />
            <hr />

            <Counter
                title="Rooms"
                subtitle="How many rooms do you have?"
                value={selectedRoomCount}
                onChange={(value) => setCustomValue("roomCount", value)}
            />
            <hr />

            <Counter
                title="Bathroom"
                subtitle="How many bathrooms do you have?"
                value={selectedBathroomCount}
                onChange={(value) => setCustomValue("bathroomCount", value)}
            />
            <hr />
        </div>
    );

    // Returns body content for images step
    const getImagesStepContent = () => (
        <div className="flex flex-col gap-8">
            <Heading
                title="Add some photos of your property"
                subtitle="Show guests how your property looks like!"
            />

            <ImageUpload
                value={selectedImageSrc}
                onChange={(value) => setCustomValue("imageSrc", value)}
            />
        </div>
    );

    // Returns body content for description step
    const getDescriptionStepContent = () => (
        <div className="flex flex-col gap-8">
            <Heading
                title="How would you describe your property?"
                subtitle="Short and brief works best!"
            />

            <Input
                id="title"
                label="Title"
                disabled={isLoading}
                registerField={register}
                errors={errors}
                required
            />
            <hr />
            <Input
                id="description"
                label="Description"
                disabled={isLoading}
                registerField={register}
                errors={errors}
                required
            />
        </div>
    );

    // Returns body content for price step
    const getPriceStepContent = () => (
        <div className="flex flex-col gap-8">
            <Heading
                title="Now, set your price"
                subtitle="How much will it cost per night?"
            />

            <Input
                id="price"
                label="Price"
                type="number"
                disabled={isLoading}
                registerField={register}
                errors={errors}
                formatPrice
                required
            />
        </div>
    );

    switch (currentStep) {
        case STEPS.CATEGORY:
            bodyContent = getCategoryStepContent();
            break;

        case STEPS.LOCATION:
            bodyContent = getLocationStepContent();
            break;

        case STEPS.INFO:
            bodyContent = getInfoStepContent();
            break;

        case STEPS.IMAGES:
            bodyContent = getImagesStepContent();
            break;

        case STEPS.DESCRIPTION:
            bodyContent = getDescriptionStepContent();
            break;

        case STEPS.PRICE:
            bodyContent = getPriceStepContent();
            break;

        default:
            bodyContent = getCategoryStepContent();
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
            onSubmit={handleSubmit(onSubmit)}
        />
    );
};

export default RentModal;
