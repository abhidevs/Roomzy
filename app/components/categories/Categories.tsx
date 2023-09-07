"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Container from "../Container";
import CategoryItem from "./CategoryItem";
import categories from "@/app/constants/categories";

const Categories = () => {
    const params = useSearchParams();
    const currentCategory = params?.get("category");
    const pathname = usePathname();

    const isHomePage = pathname === "/";

    // Only show the category buttons on home page
    if (!isHomePage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-1 2xl:pt-2 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryItem
                        key={item.label}
                        label={item.label}
                        selected={item.label === currentCategory}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
