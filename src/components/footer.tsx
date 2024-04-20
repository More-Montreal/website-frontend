import * as React from "react";
import { useI18next } from "@herob191/gatsby-plugin-react-i18next";
import { useTranslation } from "@herob191/gatsby-plugin-react-i18next";
import DiscordIcon from "../../assets/Discord.svg";
import FacebookIcon from "../../assets/Facebook.svg";
import InstagramIcon from "../../assets/Instagram.svg";
import TwitterIcon from "../../assets/Twitter.svg";
import { SocialLinks } from "../helpers/content-types";

type FooterProps = {
    overrideLangLinks?: {
        [lang: string]: string;
    };
    socials: SocialLinks;
};

const Footer = ({ overrideLangLinks, socials, children }: React.PropsWithChildren<FooterProps>) => {
    const { t } = useTranslation();
    const { language, languages, changeLanguage } = useI18next();
    const setLanguage = (lang: string) => {
        return (event: React.MouseEvent) => {
            event.preventDefault();
            if (overrideLangLinks !== undefined) {
                return (window.location.href = overrideLangLinks[lang]);
            }
            changeLanguage(lang);
        };
    };

    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full bg-gray-600">
            <div className="px-4 py-8 m-auto max-w-screen-2xl">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full lg:basis-1/2">
                        <p className="text-gray-300">Langue/Language</p>
                        <div className="flex gap-2">
                            {languages.map((lang: string, index: number) => {
                                return (
                                    <a
                                        className={
                                            "text-lg uppercase " +
                                            (lang === language ? "text-white font-medium" : "text-gray-300")
                                        }
                                        key={index}
                                        href="#"
                                        onClick={setLanguage(lang)}
                                    >
                                        {lang}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-8">
                        <div className="flex items-center justify-end gap-10">{children}</div>
                        <div className="flex flex-wrap items-center justify-end gap-4">
                            <p className="w-full text-lg font-medium text-right text-gray-400 lg:w-auto">
                                {currentYear} — {t("site_title")}
                            </p>
                            {socials.discordLink && (
                                <a href={socials.discordLink} target="_blank">
                                    <DiscordIcon />
                                </a>
                            )}
                            {socials.facebookLink && (
                                <a href={socials.facebookLink} target="_blank">
                                    <FacebookIcon />
                                </a>
                            )}
                            {socials.instagramLink && (
                                <a href={socials.instagramLink} target="_blank">
                                    <InstagramIcon />
                                </a>
                            )}
                            {socials.twitterLink && (
                                <a href={socials.twitterLink} target="_blank">
                                    <TwitterIcon />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
