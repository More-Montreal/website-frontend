import { Link } from "@herob/gatsby-plugin-react-i18next";
import * as React from "react";
import { useTranslation } from "@herob/gatsby-plugin-react-i18next";

type HeaderProps = {
    type: "post" | "action" | "event" | "blog";
};

const Header = ({ type }: HeaderProps) => {
    const { t } = useTranslation();
    const pillColors = {
        post: "bg-blue-500 text-white",
        action: "bg-red-500 text-white",
        event: "bg-indigo-500 text-white",
        blog: "bg-gray-200 text-gray-700",
    };

    return (
        <div className="px-4 py-6 m-auto max-w-screen-2xl">
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
                <Link to="/blog" className="flex items-center gap-2 md:gap-4">
                    <p className="text-xl font-bold text-gray-800 md:text-3xl font-display">{t("site_title")}</p>
                    <p
                        className={
                            "px-2 md:px-4 py-0.5 text-xs font-bold rounded-full md:py-1 md:text-sm font-display " +
                            pillColors[type]
                        }
                    >
                        {t(`blog.header.${type}`)}
                    </p>
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
