import { Link } from "@herob/gatsby-plugin-react-i18next";
import * as React from "react";
import { useTranslation } from "@herob/gatsby-plugin-react-i18next";
import { StaticImage } from "gatsby-plugin-image";

const Header = () => {
    const { t } = useTranslation();

    return (
        <div className="px-4 py-6 m-auto max-w-screen-2xl">
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
                <Link to="/blog" className="flex items-center gap-2 md:gap-4">
                    <StaticImage className="h-12 w-12" src="../../images/logo.png" alt="Logo" />
                    <p className="text-xl font-bold text-gray-800 md:text-3xl font-display">{t("site_title")}</p>
                </Link>
                <div className="flex justify-between w-full lg:w-auto lg:items-center lg:gap-10">
                    <Link to="/blog" className="font-medium text-gray-500 md:text-lg">
                        {t("blog.header.post")}
                    </Link>
                    <Link to="/blog" className="font-medium text-gray-500 md:text-lg">
                        {t("blog.header.event")}
                    </Link>
                    {/* <Link className="font-medium text-gray-500 md:text-lg">{t('blog.header.action')}</Link> */}
                    <Link to="/" className="font-medium text-gray-500 md:text-lg">
                        {t("blog.header.about")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
