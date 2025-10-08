import { graphql, Link, PageProps } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { useTranslation } from "@herob191/gatsby-plugin-react-i18next";
import Button, { ButtonType } from "../components/button";
import Footer from "../components/footer";
import InvolvementCallout, { InvolvementData } from "../components/involvement-callout";
import SEO from "../components/seo";
import {
    CityPolicyQuestion,
    SocialLinks,
    StrapiImage,
} from "../helpers/content-types";
import JsonDebug from "../helpers/json-debug";

type CityPoliciesPageData = {
    content: {
        heroTitle: string;
        heroDescription: string;
        heroBackground: StrapiImage;
        seoImage: StrapiImage;
        cityPolicyQuestions: CityPolicyQuestion[];
    };
    socials: SocialLinks;
    involvementCallout: InvolvementData;
};

export const Head = ({ data, pageContext }: any) => {
    const content = data.content;

    return <SEO
        i18n={pageContext.i18n}
        metaTitle={content.heroTitle}
        metaDescription={content.heroDescription}
        shareImage={content.seoImage.localFile.url!}
    />;
};

const PoliciesPage = ({ data }: PageProps<CityPoliciesPageData>) => {
    const content = data.content;

    const cities = Array.from(new Set(content.cityPolicyQuestions.map((q) => q.answers.map((a) => a.city)).flat()));
    const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
    
    const getAnswerForQuestionAndParty = (q: CityPolicyQuestion, party: string) => (
        q.answers.filter((a) => a.city === selectedCity && a.politicalParty === party)
    );

    const cityPoliticalParties = Array.from(new Set(content.cityPolicyQuestions
        .map((q) => q.answers.filter((a) => a.city === selectedCity).map((a) => a.politicalParty))
        .flat())
    ).sort();


    const { t } = useTranslation();

    const heroBackground = getImage(content.heroBackground.localFile);

    const renderCities = () => (
        <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
                <button
                    key={city}
                    className={`px-4 py-2 rounded-full font-medium ${
                        city === selectedCity ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200"
                    }`}
                    onClick={() => setSelectedCity(city)}
                >
                    {city}
                </button>
            ))}
        </div>
    );

    const renderPoliticalPartiesHeader = () => (
        <div className={`hidden xl:visible xl:grid ${gridCols[cityPoliticalParties.length]} gap-4 mt-4 sticky top-4`}>
            {cityPoliticalParties.map((party, pi) => (
                <div key={party} className={`inline-flex w-fit px-4 py-2 text-lg font-medium border backdrop-blur-md rounded-full ${partyColor(pi)}`}>
                    {party}
                </div>
            ))}
        </div>
    );

    const gridCols: Record<number, string> = {
        1: "grid-cols-1",
        2: "grid-cols-1 xl+:grid-cols-2",
        3: "grid-cols-1 xl:grid-cols-3",
        4: "grid-cols-1 xl:grid-cols-4",
        5: "grid-cols-1 xl:grid-cols-5",
    };

    const partyColors: Record<number, string> = {
        0: "bg-blue-50/50 text-blue-800 border-blue-100",
        1: "bg-indigo-50/50 text-indigo-800 border-indigo-100",
        2: "bg-purple-50/50 text-purple-800 border-purple-100",
        3: "bg-pink-50/50 text-pink-800 border-pink-100",
        4: "bg-red-50/50 text-red-800 border-red-100",
    };

    const partyColor = (index: number) => partyColors[index % Object.keys(partyColors).length];
    
    return (
        <div>
            <div className="relative w-full h-auto">
                <div className="absolute z-10 w-full h-full bg-blue-600/90"></div>
                <GatsbyImage
                    className="!absolute object-cover w-full h-full"
                    image={heroBackground!}
                    alt={content.heroBackground.alternativeText}
                />
                <div className="relative z-10 flex flex-col items-center h-full px-4 py-6 m-auto max-w-screen-2xl">
                    <div className="flex items-center justify-between w-full">
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
                            <Link to="/" className="hidden text-lg font-medium text-white lg:inline">
                                {t("policies.home")}
                            </Link>
                            <Button type={ButtonType.TRANSPARENT} href="/blog">
                                {t("home.sections.blog.nav")}
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-4 py-10 lg:px-32 lg:py-24 text-center">
                        <h1 className="text-2xl font-bold text-white lg:text-4xl font-display">{content.heroTitle}</h1>
                        <p className="text-lg font-medium text-white opacity-80">{content.heroDescription}</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto bg-gray-50">
                <div className={`m-auto p-4 ${cityPoliticalParties.length <= 3 ? "max-w-screen-2xl" : "max-w-full"}`}>
                    <div className="flex flex-col gap-2">
                        <p className="uppercase font-bold text-sm text-gray-600 tracking-wide px-0.5">{t('cities_policies.filter_by_city')}</p>
                        {renderCities()}
                    </div>
                    <div className="flex flex-col gap-16 py-12">
                        {content.cityPolicyQuestions.map((q, qi) => (
                            <div key={qi} className="flex flex-col gap-6">
                                <h2 className="text-xl font-bold text-gray-800 lg:text-2xl font-display">{q.question}</h2>
                                {renderPoliticalPartiesHeader()}
                                <div className={`grid ${gridCols[cityPoliticalParties.length]} gap-10 xl:gap-4`}>
                                    {cityPoliticalParties.map((party, pi) => (
                                        <div className="flex flex-col gap-4 xl:gap-0">
                                            <div key={party} className={`xl:hidden inline-flex w-fit px-4 py-2 font-medium border backdrop-blur-md rounded-full ${partyColor(pi)}`}>
                                                {party}
                                            </div>
                                            {getAnswerForQuestionAndParty(q, party).map((a, ai) => (
                                                <div key={ai} className={`p-4 ${pi % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} rounded-lg`}>
                                                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: a.answer.data.childMarkdownRemark.html }} />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <InvolvementCallout
                title={data.involvementCallout.title}
                content={data.involvementCallout.content}
                image={data.involvementCallout.image}
                joinLink={data.involvementCallout.joinLink}
            />
            <Footer socials={data.socials}>
                <Link to="/" className="hidden text-lg font-medium text-white lg:inline">
                    {t("policies.home")}
                </Link>
                <Button type={ButtonType.TRANSPARENT} href="/blog">
                    {t("home.sections.blog.nav")}
                </Button>
            </Footer>
        </div>
    );
};

export const query = graphql`
    query ($language: String!) {
        content: strapiCityPoliciesPage(locale: { eq: $language }) {
            heroTitle
            heroDescription
            heroBackground {
                alternativeText
                localFile {
                    childImageSharp {
                        gatsbyImageData(breakpoints: [320, 768, 1536], placeholder: BLURRED)
                    }
                    url
                }
            }
            seoImage {
                alternativeText
                localFile {
                    url
                }
            }
            cityPolicyQuestions {
                question
                answers {
                    city
                    politicalParty
                    answer {
                        data {
                            childMarkdownRemark {
                                html
                            }
                        }
                    }
                }
            }
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

export default PoliciesPage;
