import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { KeyPoint } from "../helpers/content-types";
import JsonDebug from "../helpers/json-debug";
import HeroOverlay from '../../assets/HeroOverlay.svg';

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
            <div className="w-full h-[645px] relative bg-opacity-90 overflow-hidden">
                <div className="absolute w-full h-full">
                    <div className="relative h-full m-auto max-w-[1600px]">
                        <div className="absolute w-full h-full">
                            <div className="bg-blue-600 bg-opacity-90 left-[-999px] right-full h-full absolute z-20"></div>
                            <div className="bg-blue-600 bg-opacity-90 right-[-999px] left-full h-full absolute z-20"></div>
                        </div>
                        <HeroOverlay className="absolute right-0 z-10 h-full"/>
                    </div>
                </div>
                <GatsbyImage
                    className="absolute object-cover w-full h-full"
                    image={heroBackground!}
                    alt={content.heroBackground.alternativeText}
                />
                <div className="relative z-10 flex px-4 py-6 m-auto max-w-screen-2xl">
                    <p className="text-3xl font-bold text-white font-display">{t('site_title')}</p>
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
                    gatsbyImageData(width: 1920)
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
