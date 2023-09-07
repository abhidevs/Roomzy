"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push("/")}
            alt="Roomzy"
            className="w-16 md:w-20 cursor-pointer"
            height="100"
            width="100"
            src="/images/roomzy_logo.webp"
        />
    );
};

export default Logo;
