import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet, useTranslation } from "gatsby-plugin-react-i18next"
import { StrapiImage } from "../helpers/content-types";
import { getImage } from "gatsby-plugin-image";

type SEOProps = {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: string;
    article?: boolean;
};

const SEO = (seo: SEOProps) => {
    const {t} = useTranslation();
    const siteName = t('site_title');

    const defaultSeo = {
        metaTitle: null,
        metaDescription: t('site_description')
    };

    // Merge default and page-specific SEO values
    const fullSeo = { ...defaultSeo, ...seo };

    // Add site name to title
    fullSeo.metaTitle = (fullSeo.metaTitle) ? `${fullSeo.metaTitle} - ${siteName}` : siteName;

    const getMetaTags = () => {
        const tags = []

        if (fullSeo.metaTitle) {
            tags.push({
                property: "og:title",
                content: fullSeo.metaTitle,
            },{
                name: "twitter:title",
                content: fullSeo.metaTitle,
            });
        }
        if (fullSeo.metaDescription) {
            tags.push({
                    name: "description",
                    content: fullSeo.metaDescription,
                }, {
                    property: "og:description",
                    content: fullSeo.metaDescription,
                }, {
                    name: "twitter:description",
                    content: fullSeo.metaDescription,
            });
        }
        if (fullSeo.shareImage) {
            tags.push({
                name: "image",
                content: fullSeo.shareImage,
            }, {
                property: "og:image",
                content: fullSeo.shareImage,
            }, {
                name: "twitter:image",
                content: fullSeo.shareImage,
            });
        }
        if (fullSeo.article) {
            tags.push({
                property: "og:type",
                content: "article",
            });
        }
        tags.push({ name: "twitter:card", content: "summary_large_image" });

        return tags;
    }

    const metaTags = getMetaTags();

    return (
        <Helmet
            title={fullSeo.metaTitle}
            meta={metaTags}
        />
    );
}

export default SEO;