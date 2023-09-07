"use client";

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Filtersbar from "./Filtersbar";
import UserMenu from "./UserMenu";
import Categories from "../categories/Categories";

interface NavbarProps {
    currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-2 2xl:py-3 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Filtersbar />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
};

export default Navbar;
