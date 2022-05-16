import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { KeyPoint } from "../helpers/content-types";
import JsonDebug from "../helpers/json-debug";
import HeroOverlay from '../../assets/HeroOverlay.svg';
import Button, { ButtonType } from "../components/button";

type IndexData = {
    content: {
        heroBackground: {
            alternativeText: string;
            localFile: ImageDataLike;
        };
        heroDescription: string;
        heroTitle: string;
        visionPoints: KeyPoint[];
    };
};

const IndexPage = ({data}: PageProps<IndexData>) => {
    const content = data.content;
    const {t} = useTranslation();
    const heroBackground = getImage(content.heroBackground.localFile);

    return (
        <div>
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
                    className="absolute object-cover w-full h-full"
                    image={heroBackground!}
                    alt={content.heroBackground.alternativeText}
                />
                <div className="relative z-10 flex flex-col h-full px-4 py-6 m-auto max-w-screen-2xl">
                    <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-white font-display">{t('site_title')}</p>
                        <div className="flex items-center gap-10">
                            <a href="" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.actions.nav')}</a>
                            <a href="" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.fight.nav')}</a>
                            <a href="" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.involvement.nav')}</a>
                            <Button type={ButtonType.TRANSPARENT} onClick={() => console.log('test')}>{t('home.sections.blog.nav')}</Button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center flex-1 gap-4 pt-16 pb-8 lg:p-0 lg:w-1/2">
                        <p className="text-2xl font-bold text-white lg:text-4xl font-display">{content.heroTitle}</p>
                        <p className="text-lg font-medium text-white opacity-80">{content.heroDescription}</p>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:justify-start md:mt-0">
                            <Button onClick={() => console.log('test')}>{t('home.cta')}</Button>
                            <a className="text-lg font-medium text-white border-b-2 border-white border-dashed cursor-pointer opacity-90 border-opacity-90 hover:opacity-100 hover:border-opacity-100">{t('home.secondary_cta')}</a>
                        </div>
                    </div>
                </div>
            </div>
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
            content {
                data {
                    content
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
