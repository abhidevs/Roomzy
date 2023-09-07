import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import FiltersModal from "./components/modals/FiltersModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Roomzy",
    description: "Book hotels and villas with no extra charge",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={nunito.className}>
                <Navbar currentUser={currentUser} />
                <RegisterModal />
                <LoginModal />
                <RentModal />
                <FiltersModal />
                <ToasterProvider />
                <div className="pt-20 md:pt-28 pb-20">{children}</div>
            </body>
        </html>
    );
}
