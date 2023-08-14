"use client";

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import UserMenu from "./UserMenu";
import Categories from "../categories/Categories";

interface NavbarProps {
    currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    console.log(currentUser);

    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Searchbar />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
};

export default Navbar;
