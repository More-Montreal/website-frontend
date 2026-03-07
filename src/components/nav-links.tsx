import * as React from "react";
import { useTranslation } from "@herob191/gatsby-plugin-react-i18next";
import { Link } from "@herob191/gatsby-plugin-react-i18next";
import Button, { ButtonType } from "./button";

type NavLinksProps = {
    variant: "light" | "dark";
};

const NavLinks = ({ variant }: NavLinksProps) => {
    const { t } = useTranslation();

    if (variant === "dark") {
        return (
            <>
                <Link to="/" className="font-medium text-gray-500 md:text-lg">
                    {t("nav.home")}
                </Link>
                <Link to="/policies" className="font-medium text-gray-500 md:text-lg">
                    {t("nav.policies")}
                </Link>
                <Link to="/blog" className="font-medium text-gray-500 md:text-lg">
                    {t("nav.blog")}
                </Link>
                <Link to="/contact" className="font-medium text-gray-500 md:text-lg">
                    {t("nav.contact")}
                </Link>
            </>
        );
    }

    return (
        <>
            <Link to="/" className="hidden text-lg font-medium text-white lg:inline">
                {t("nav.home")}
            </Link>
            <Link to="/policies" className="hidden text-lg font-medium text-white lg:inline">
                {t("nav.policies")}
            </Link>
            <Link to="/contact" className="hidden text-lg font-medium text-white lg:inline">
                {t("nav.contact")}
            </Link>
            <Button type={ButtonType.TRANSPARENT} href="/blog">
                {t("nav.blog")}
            </Button>
        </>
    );
};

export default NavLinks;
