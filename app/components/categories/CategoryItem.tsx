"use client";

import { IconType } from "react-icons";

interface CategoryItemProps {
    icon: IconType;
    label: string;
    description: string;
    selected?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
    icon: Icon,
    label,
    description,
    selected,
}) => {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transiotion cursor-pointer 
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            ${selected ? "text-neutral-800" : "text-neutral-500"}`}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
};

export default CategoryItem;
