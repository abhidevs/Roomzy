"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./buttons/Button";
import useLgoinModal from "../hooks/useLoginModal";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    showLogin?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
    showReset,
    showLogin,
}) => {
    const router = useRouter();
    const loginModal = useLgoinModal();

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading title={title} subtitle={subtitle} center />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        colouredOutline
                        label="Remove all filters"
                        onClick={() => router.push("/")}
                    />
                )}
            </div>
            <div className="w-48 mt-4">
                {showLogin && (
                    <Button
                        outline
                        colouredOutline
                        label="Login"
                        onClick={() => loginModal.onOpen()}
                    />
                )}
            </div>
        </div>
    );
};

export default EmptyState;
