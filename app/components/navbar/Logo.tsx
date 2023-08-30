"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push("/")}
            alt="Roomzy"
            className="hidden md:block cursor-pointer"
            height="100"
            width="100"
            src="/images/roomzy4.webp"
        />
    );
};

export default Logo;
