import * as React from "react";
import { useState } from "react";
import { useTranslation } from "@herob191/gatsby-plugin-react-i18next";
import { Link } from "@herob191/gatsby-plugin-react-i18next";
import { StaticImage } from "gatsby-plugin-image";
import NavLinks from "./nav-links";

type NavHeaderProps = {
    variant: "light" | "dark";
};

const NavHeader = ({ variant }: NavHeaderProps) => {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const titleClass =
        variant === "light"
            ? "text-xl md:text-3xl font-bold text-white font-display"
            : "text-xl font-bold text-gray-800 md:text-3xl font-display";

    const iconColor = variant === "light" ? "text-white" : "text-gray-800";

    return (
        <div className="relative flex items-center justify-between w-full">
            <Link to="/" className="flex items-center gap-4">
                <StaticImage
                    width={45}
                    height={45}
                    layout="fixed"
                    className="overflow-visible"
                    src="../images/logo.png"
                    alt="Logo"
                />
                <p className={titleClass}>{t("site_title")}</p>
            </Link>
            <div className="hidden lg:flex items-center gap-10">
                <NavLinks variant={variant} />
            </div>
            <button
                className={`lg:hidden ${iconColor}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? t("nav.close_menu") : t("nav.open_menu")}
            >
                {menuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
            {menuOpen && (
                <div className="absolute top-full right-0 mt-2 lg:hidden z-50 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4 min-w-[200px]">
                    <NavLinks variant="dark" />
                </div>
            )}
        </div>
    );
};

export default NavHeader;
