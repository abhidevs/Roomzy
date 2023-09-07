"use client";

import { IconType } from "react-icons/lib";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    colouredOutline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    colouredOutline,
    small,
    icon: Icon,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
            ${
                outline
                    ? "bg-white"
                    : "bg-gradient-to-r from-sky-400 to-sky-500"
            }  
            ${outline ? "text-black" : "text-white"} 
            ${
                !outline || colouredOutline
                    ? "border-sky-500 text-sky-500"
                    : "border-black text-black"
            } 
            ${
                small
                    ? "py-[6px] text-sm font-light border-0"
                    : "py-3 text-md font-semibold border-2"
            }`}
        >
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            {label}
        </button>
    );
};

export default Button;
