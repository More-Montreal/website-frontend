import * as React from "react";
import { useTranslation } from "@herob191/gatsby-plugin-react-i18next";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { KeyPoint as KeyPointData, SocialLinks, StrapiImage } from "../helpers/content-types";
import Button, { ButtonType } from "../components/button";
import KeyPoint from "../components/key-point";
import { InvolvementData } from "../components/involvement-callout";
import Footer from "../components/footer";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import SEO from "../components/seo";
import { useForm, ValidationError } from "@formspree/react";

type IndexData = {
    content: {
        heroBackground: StrapiImage;
        heroDescription: string;
        heroTitle: string;
        visionPoints: KeyPointData[];
    };
    contact: {
        title: string;
        description: string;
        formId: string;
    };
    socials: SocialLinks;
    involvementCallout: InvolvementData;
};

export const Head = ({ pageContext }: any) => {
    return <SEO i18n={pageContext.i18n} />;
};

const ContactPage = ({ data }: PageProps<IndexData>) => {
    const content = data.content;

    const { t } = useTranslation();
    const heroBackground = getImage(content.heroBackground.localFile);
    const [state, handleSubmit] = useForm(data.contact.formId);

    return (
        <div>
            <div className="w-full h-auto lg:h-[450px] relative bg-opacity-90 overflow-hidden">
                <div className="absolute w-full h-full">
                    <div className="relative h-full m-auto max-w-screen-2xl">
                        <div className="absolute w-full h-full">
                            <div className="bg-blue-600 bg-opacity-90 left-[-999px] right-full h-full absolute z-20"></div>
                            <div className="bg-blue-600 bg-opacity-90 right-[-999px] left-full h-full absolute z-20"></div>
                        </div>
                        <div className="absolute z-10 w-full h-full bg-blue-600 bg-opacity-90"></div>
                    </div>
                </div>
                <GatsbyImage
                    className="!absolute object-cover w-full h-full"
                    image={heroBackground!}
                    alt={content.heroBackground.alternativeText}
                />
                <div className="relative z-10 flex flex-col h-full px-4 py-6 m-auto max-w-screen-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <StaticImage
                                width={45}
                                height={45}
                                layout="fixed"
                                className="overflow-visible"
                                src="../images/logo.png"
                                alt="Logo"
                            />
                            <p className="text-xl md:text-3xl font-bold text-white font-display">{t("site_title")}</p>
                        </div>
                        <div className="flex items-center gap-10">
                            <a href="/#actions" className="hidden text-lg font-medium text-white lg:inline">
                                {t("home.sections.actions.nav")}
                            </a>
                            <a href="/#vision" className="hidden text-lg font-medium text-white lg:inline">
                                {t("home.sections.fight.nav")}
                            </a>
                            <a href="/#involvement" className="hidden text-lg font-medium text-white lg:inline">
                                {t("home.sections.involvement.nav")}
                            </a>
                            <Button type={ButtonType.TRANSPARENT} href="/blog">
                                {t("home.sections.blog.nav")}
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center flex-1 gap-8 pt-16 pb-8 lg:p-0 lg:w-1/2">
                        <h1 className="text-2xl font-bold text-white lg:text-4xl font-display">{data.contact.title}</h1>
                        <p className="text-lg font-medium text-white opacity-80">{data.contact.description}</p>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="p-4 py-10 m-auto max-w-screen-lg">
                    {state.succeeded && (
                        <div>
                            <h2 className="text-2xl font-bold font-display text-gray-800">
                                {t("contact.form.success")}
                            </h2>
                            <p className="text-lg text-gray-500">{t("contact.form.success_message")}</p>
                            <p className="mt-4">
                                <a
                                    href="/"
                                    className="text-gray-500 font-medium border-b-2 border-gray-200 border-dashed hover:text-blue-600 hover:border-blue-200"
                                >
                                    {t("contact.form.learn_more")}
                                </a>
                            </p>
                        </div>
                    )}
                    {!state.succeeded && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                id="name"
                                type="name"
                                name="name"
                                placeholder={t("contact.form.name")}
                                required={true}
                                className="p-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                            <ValidationError prefix="Name" field="name" errors={state.errors} />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required={true}
                                placeholder={t("contact.form.email")}
                                className="p-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                            <textarea
                                id="message"
                                name="message"
                                required={true}
                                rows={5}
                                placeholder={t("contact.form.message")}
                                className="p-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                            <ValidationError prefix="Message" field="message" errors={state.errors} />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={state.submitting}
                                    className="p-4 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-200 disabled:text-gray-600"
                                >
                                    {state.submitting ? t("contact.form.submitting") : t("contact.form.submit")}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer socials={data.socials}>
                <a href="/#actions" className="hidden text-lg font-medium text-white lg:inline">
                    {t("home.sections.actions.nav")}
                </a>
                <a href="/#vision" className="hidden text-lg font-medium text-white lg:inline">
                    {t("home.sections.fight.nav")}
                </a>
                <a href="/#involvement" className="hidden text-lg font-medium text-white lg:inline">
                    {t("home.sections.involvement.nav")}
                </a>
                <Button type={ButtonType.TRANSPARENT} href="/blog">
                    {t("home.sections.blog.nav")}
                </Button>
            </Footer>
            <div className="hidden">
                <a rel="me" href="https://mastodon.construisonsmtl.ca/@construisonsmtl">
                    Mastodon
                </a>
            </div>
        </div>
    );
};

export const query = graphql`
    query ($language: String!) {
        content: strapiHomepage(locale: { eq: $language }) {
            heroBackground {
                alternativeText
                localFile {
                    childImageSharp {
                        gatsbyImageData(breakpoints: [320, 768, 1536], placeholder: BLURRED)
                    }
                }
            }
            visionPoints {
                title
                color
                icon {
                    localFile {
                        publicURL
                    }
                }
                content {
                    data {
                        content
                    }
                }
            }
            electionsCallout
        }
        contact: strapiContact(locale: { eq: $language }) {
            title
            description
            formId
        }
        involvementCallout: strapiInvolvementCallout(locale: { eq: $language }) {
            image {
                alternativeText
                localFile {
                    childImageSharp {
                        gatsbyImageData(breakpoints: [320, 768], placeholder: BLURRED)
                    }
                }
            }
            title
            content
            joinLink
        }
        socials: strapiSocial {
            discordLink
            facebookLink
            instagramLink
            twitterLink
            mastodonLink
            blueSkyLink
        }
        locales: allLocale(filter: { language: { eq: $language } }) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;

export default ContactPage;
