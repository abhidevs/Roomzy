"use client";

import Container from "../Container";
import CategoryItem from "./CategoryItem";
import categories from "@/app/constants/categories";

const Categories = () => {
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryItem
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
