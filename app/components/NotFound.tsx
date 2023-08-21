"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./buttons/Button";

interface NotFoundProps {
    title?: string;
    subtitle?: string;
    showGoToHome?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({
    title = "404 Not found",
    subtitle = "The item you are trying to find, is not availble!",
    showGoToHome,
}) => {
    const router = useRouter();

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading title={title} subtitle={subtitle} center />
            <div className="w-48 mt-4">
                {showGoToHome && (
                    <Button
                        outline
                        label="Go to Homepage"
                        onClick={() => router.push("/")}
                    />
                )}
            </div>
        </div>
    );
};

export default NotFound;
