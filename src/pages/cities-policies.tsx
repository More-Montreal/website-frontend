import { graphql, Link, PageProps } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "@herob191/gatsby-plugin-react-i18next";
import Button, { ButtonType } from "../components/button";
import Footer from "../components/footer";
import InvolvementCallout, { InvolvementData } from "../components/involvement-callout";
import SEO from "../components/seo";
import {
    CityPolicyQuestion,
    RichTextContent,
    SocialLinks,
    StrapiImage,
} from "../helpers/content-types";
import JsonDebug from "../helpers/json-debug";
import { AnchorLink } from "gatsby-plugin-anchor-links";

type CityPoliciesPageData = {
    content: {
        heroTitle: string;
        heroDescription: string;
        heroBackground: StrapiImage;
        seoImage: StrapiImage;
        cityPolicyQuestions: CityPolicyQuestion[];
        footerInfo: RichTextContent<"footerInfo">;
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
    const [queryParams, setQueryParams] = useState<string | null>(null); 
    
    const [selectedCity, setSelectedCity] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            const cityParam = searchParams.get("city");
            if (cityParam && cities.includes(cityParam)) {
                setQueryParams(`${window.location.pathname}?${searchParams.toString()}`);
                return cityParam;
            }
        }
        return cities[0];
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("city", selectedCity);
        setQueryParams(`${window.location.pathname}?${searchParams.toString()}`);
        window.history.replaceState({}, "", queryParams);
    }, [selectedCity]);

    const cityQuestions = content.cityPolicyQuestions.filter((q) => selectedCity === "Montréal" ? q.displayForMontreal : q.displayOutsideMontreal);
    
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
                <div key={party} className={`inline-flex w-fit px-4 py-2 self-start text-lg font-medium border backdrop-blur-md rounded-full bg-gray-50/50`}>
                    {partyLogos[party] ?? <p className="text-gray-600">{party}</p>}
                </div>
            ))}
        </div>
    );

    const renderQuestion = (question: string, index: number) => (
        <AnchorLink
            to={`${queryParams}#question-${index}`}
            className="text-xl font-bold text-gray-800 lg:text-2xl font-display"
        >
            {question}
        </AnchorLink>
    );

    const gridCols: Record<number, string> = {
        1: "grid-cols-1",
        2: "grid-cols-1 xl+:grid-cols-2",
        3: "grid-cols-1 xl:grid-cols-3",
        4: "grid-cols-1 xl:grid-cols-4",
        5: "grid-cols-1 xl:grid-cols-5",
    };

    const partyLogos: Record<string, ReactNode> = {
        "Projet Montréal": <StaticImage src="../images/parties/projet-montreal.png" alt="Projet Montreal" height={40} />,
        "Ensemble Montréal": <StaticImage src="../images/parties/ensemble-montreal.png" alt="Ensemble Montreal" height={40} />,
        "Futur Montréal": <StaticImage src="../images/parties/futur-montreal.png" alt="Futur Montreal" height={40} />,
        "Transition Montréal": <StaticImage src="../images/parties/transition-montreal.webp" alt="Transition Montreal" height={40} />,
        "Coalition Longueuil": <StaticImage src="../images/parties/coalition-longueuil.png" alt="Coalition Longueuil" height={40} />,
        "Mouvement Lavallois": <StaticImage src="../images/parties/mouvement-lavallois.svg" alt="Mouvement Lavallois" height={40} />,
    };
    
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
                        <h1 className="text-2xl font-bold text-white lg:text-4xl font-display text-balance">{content.heroTitle}</h1>
                        <p className="text-lg font-medium text-white opacity-80 text-balance">{content.heroDescription}</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto bg-white">
                <div className={`m-auto p-4 ${cityPoliticalParties.length <= 3 ? "max-w-screen-2xl" : "max-w-full"}`}>
                    <div className="flex flex-col gap-2">
                        <p className="uppercase font-bold text-sm text-gray-600 tracking-wide px-0.5">{t('cities_policies.filter_by_city')}</p>
                        {renderCities()}
                    </div>
                    <div className="flex flex-col gap-16 py-12">
                        {cityQuestions.map((q, qi) => (
                            <div id={'question-' + qi.toString()} key={qi} className="flex flex-col gap-6">
                                {renderQuestion(q.question, qi)}
                                {renderPoliticalPartiesHeader()}
                                <div className={`grid ${gridCols[cityPoliticalParties.length]} gap-10 xl:gap-4`}>
                                    {cityPoliticalParties.map((party, pi) => (
                                        <div className="flex flex-col gap-4 xl:gap-0">
                                            <div key={party} className={`xl:hidden inline-flex w-fit px-4 py-2 font-medium border backdrop-blur rounded-full sticky top-4`}>
                                                {partyLogos[party] ?? <p className="text-gray-600">{party}</p>}
                                            </div>
                                            {getAnswerForQuestionAndParty(q, party).map((a, ai) => (
                                                <div key={ai} className={`p-4 ${pi % 2 === 0 ? "bg-white" : "bg-gray-50"} rounded-lg`}>
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
                <div className="prose max-w-screen-xl m-auto mb-16 px-4" dangerouslySetInnerHTML={{ __html: content.footerInfo.data.childMarkdownRemark.html }} />
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
                displayForMontreal
                displayOutsideMontreal
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
            footerInfo {
                data {
                    childMarkdownRemark {
                        html
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
