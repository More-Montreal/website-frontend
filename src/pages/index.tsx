import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { KeyPoint } from "../helpers/content-types";
import JsonDebug from "../helpers/json-debug";

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
            <p className="text-3xl font-display">{t('site_title')}</p>
            <GatsbyImage
                image={heroBackground!}
                alt={content.heroBackground.alternativeText}
            />
            <pre>
                <JsonDebug data={content}/>
            </pre>
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
