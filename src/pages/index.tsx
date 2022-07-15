import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { KeyPoint as KeyPointData, Nodes, RichTextContent, SocialLinks, StrapiImage, EventCardData, PostCardData, ActionCardData } from "../helpers/content-types";
import JsonDebug from "../helpers/json-debug";
import HeroOverlay from '../../assets/HeroOverlay.svg';
import PillDecorator from '../../assets/PillDecorator.svg';
import PillBackground from '../../assets/PillBackground.svg';
import Button, { ButtonType } from "../components/button";
import ImageCard from "../components/image-card";
import KeyPoint from "../components/key-point";
import InvolvementCallout, { InvolvementData } from "../components/involvement-callout";
import Footer from "../components/footer";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from "gatsby-plugin-react-i18next";
import SEO from "../components/seo";

type IndexCardData<T extends (PostCardData | ActionCardData | EventCardData)> = T & {
    type: "post" | "action" | "event";
};

type IndexData = {
    content: {
        heroBackground: StrapiImage;
        heroDescription: string;
        heroTitle: string;
        visionPoints: KeyPointData[];
    };
    socials: SocialLinks;
    involvementCallout: InvolvementData;
    events: Nodes<EventCardData>;
    posts: Nodes<PostCardData>;
    actions: Nodes<ActionCardData>;
};

const IndexPage = ({data}: PageProps<IndexData>) => {
    const content = data.content;

    const actions: IndexCardData<EventCardData | PostCardData | ActionCardData>[] = [];
    for (const post of data.posts.nodes) {
        actions.push({type: "post", ...post});
    }
    for (const event of data.events.nodes) {
        actions.push({type: "event", ...event});
    }
    for (const action of data.actions.nodes) {
        actions.push({type: "action", ...action});
    }

    const pillStyles = {
        post: "bg-blue-200 text-blue-900",
        event: "bg-indigo-200 text-indigo-900",
        action: "bg-red-200 text-red-900"
    };

    const {t} = useTranslation();
    const heroBackground = getImage(content.heroBackground.localFile);

    const truncateText = (text: string) => {
        if (text.length > 120) {
            return text.slice(0, 120).trim() + '...';
        }
        return text;
    };

    return (
        <div>
            <SEO/>
            <div className="w-full h-auto lg:h-[645px] relative bg-opacity-90 overflow-hidden">
                <div className="absolute w-full h-full">
                    <div className="relative h-full m-auto max-w-screen-2xl">
                        <div className="absolute w-full h-full">
                            <div className="bg-blue-600 bg-opacity-90 left-[-999px] right-full h-full absolute z-20"></div>
                            <div className="bg-blue-600 bg-opacity-90 right-[-999px] left-full h-full absolute z-20"></div>
                        </div>
                        <HeroOverlay className="absolute right-0 z-10 h-full opacity-0 lg:opacity-100"/>
                        <div className="absolute z-10 w-full h-full bg-blue-600 bg-opacity-90 lg:opacity-0"></div>
                    </div>
                </div>
                <GatsbyImage
                    className="!absolute object-cover w-full h-full"
                    image={heroBackground!}
                    alt={content.heroBackground.alternativeText}
                />
                <div className="relative z-10 flex flex-col h-full px-4 py-6 m-auto max-w-screen-2xl">
                    <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-white font-display">{t('site_title')}</p>
                        <div className="flex items-center gap-10">
                            <AnchorLink stripHash to="#actions" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.actions.nav')}</AnchorLink>
                            <AnchorLink stripHash to="#vision" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.fight.nav')}</AnchorLink>
                            <AnchorLink stripHash to="#involvement" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.involvement.nav')}</AnchorLink>
                            <Button type={ButtonType.TRANSPARENT} href="/blog">{t('home.sections.blog.nav')}</Button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center flex-1 gap-4 pt-16 pb-8 lg:p-0 lg:w-1/2">
                        <h1 className="text-2xl font-bold text-white lg:text-4xl font-display">{content.heroTitle}</h1>
                        <p className="text-lg font-medium text-white opacity-80">{content.heroDescription}</p>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:justify-start md:mt-0">
                            <Button href="#actions">{t('home.cta')}</Button>
                            <AnchorLink stripHash to="#involvement" className="text-lg font-medium text-white border-b-2 border-white border-dashed cursor-pointer opacity-90 border-opacity-90 hover:opacity-100 hover:border-opacity-100">{t('home.secondary_cta')}</AnchorLink>
                        </div>
                    </div>
                </div>
            </div>
            <div id="actions" className="w-full overflow-hidden bg-white">
                <div className="p-4 m-auto max-w-screen-2xl">
                    <div className="pt-20">
                        <div className="relative">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-gray-800 font-display">{t('home.sections.actions.heading')}</h3>
                                <p className="text-lg text-gray-500">{t('home.sections.actions.subheading')}</p>
                            </div>
                            <PillDecorator className="absolute -bottom-4 -left-8 md:-bottom-10 fill-red-100"/>
                        </div>
                        <div className="relative flex flex-col xl:flex-row py-14">
                            <div className="flex flex-col flex-wrap flex-1 gap-12 md:flex-row">
                                {actions.slice(0, 3).map((action, index) => {
                                    return (
                                        <Link className="flex-auto" to={`/blog/${(action.type === 'post') ? action.slug : ''}`} key={index}>
                                            <ImageCard image={action.thumbnail}>
                                                <p><span className={"rounded-full px-3 py-1 text-xs font-semibold " + pillStyles[action.type]}>{t(action.type)}</span></p>
                                                <p className="py-2 text-xl font-semibold text-white">{action.title}</p>
                                                <p className="text-sm text-white">{("description" in action) ? truncateText(action.description.data.description) : truncateText(action.excerpt)}</p>
                                            </ImageCard>
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="relative flex w-full pt-20 xl:w-1/3 xl:pt-0">
                                <div className="relative z-10 flex flex-col items-center justify-center w-full gap-6 text-center xl:pl-7">
                                    <p className="text-2xl font-bold text-gray-700 font-display">{t('home.sections.actions.more.title')}</p>
                                    <p className="text-lg text-gray-600 xl:max-w-xs">{t('home.sections.actions.more.description')}</p>
                                    <Button href="/blog" type={ButtonType.GRAY}>{t('home.sections.actions.more.cta')}</Button>
                                </div>
                                <PillBackground className="absolute hidden xl:block bottom-10 left-14"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="vision" className="w-full mb-20 bg-white">
                <div className="p-4 m-auto max-w-screen-2xl">
                    <div className="pt-10 pb-20 text-center">
                        <h3 className="text-3xl font-bold text-gray-800 font-display">{t('home.sections.fight.heading')}</h3>
                        <p className="text-lg text-gray-500">{t('home.sections.fight.subheading')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-11">
                        {content.visionPoints.map((vp: KeyPointData, index: number) => {
                            return (
                                <div key={index}>
                                    <KeyPoint title={vp.title} icon={vp.icon} color={vp.color} content={vp.content}/>
                                </div>
                            );
                        })}
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
                <a href="#actions" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.actions.nav')}</a>
                <a href="#vision" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.fight.nav')}</a>
                <a href="#involvement" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.involvement.nav')}</a>
                <Button type={ButtonType.TRANSPARENT} href="/blog">{t('home.sections.blog.nav')}</Button>
            </Footer>
        </div>
    );
}

export const query = graphql`

query($language: String!) {
    content: strapiHomepage(locale: {eq: $language}) {
        heroBackground {
            alternativeText
            localFile {
                childImageSharp {
                    gatsbyImageData(breakpoints: [320, 768, 1536], placeholder: BLURRED)
                }
            }
        }
        heroDescription
        heroTitle
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
    }
    involvementCallout: strapiInvolvementCallout(locale: {eq: $language}) {
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
    }
    events: allStrapiEvent(limit: 3, sort: {order: DESC, fields: id}, filter: {locale: {eq: $language}}) {
        nodes {
            title
            slug
            publishedAt
            description {
                data {
                    description
                }
            }
            thumbnail {
                alternativeText
                localFile {
                    childImageSharp {
                        gatsbyImageData(height: 438, placeholder: BLURRED)
                    }
                }
            }
        }
    }
    posts: allStrapiPost(limit: 3, sort: {order: DESC, fields: id}, filter: {locale: {eq: $language}}) {
        nodes {
            title
            slug
            publishedAt
            postCategories {
                title
            }
            excerpt
            thumbnail {
                alternativeText
                localFile {
                    childImageSharp {
                        gatsbyImageData(height: 438, placeholder: BLURRED)
                    }
                }
            }
        }
    }
    actions: allStrapiAction(limit: 3, sort: {order: DESC, fields: id}, filter: {locale: {eq: $language}}) {
        nodes {
            title
            slug
            description {
                data {
                    description
                }
            }
            thumbnail {
                alternativeText
                localFile {
                    childImageSharp {
                        gatsbyImageData(height: 438, placeholder: BLURRED)
                    }
                }
            }
        }
    }
    locales: allLocale(filter: {language: {eq: $language}}) {
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

export default IndexPage
