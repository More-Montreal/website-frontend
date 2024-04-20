import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useTranslation } from "@herob191/gatsby-plugin-react-i18next";
import { StrapiImage } from "../helpers/content-types";
import { getImage } from "gatsby-plugin-image";
import { i18n } from "i18next";

type SEOProps = {
    i18n: i18n;
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: string;
    article?: boolean;
};

const SEO = (seo: SEOProps) => {
    const siteName = seo.i18n.language == "en" ? "More Montreal" : "Construisons Montréal";

    const defaultSeo = {
        metaTitle: null,
        metaDescription:
            seo.i18n.language == "en"
                ? "We want to make housing in the Greater Montreal Region affordable for all, sustainable and inclusive through local actions and voicing support to realistic solutions and developments."
                : "Nous voulons rendre l'accès au logement du Grand Montréal plus facile, durable et inclusif à l'aide d'actions locales en supportant des solutions et développements réalistes.",
    };

    // Merge default and page-specific SEO values
    const fullSeo = { ...defaultSeo, ...seo };

    // Add site name to title
    fullSeo.metaTitle = fullSeo.metaTitle ? `${fullSeo.metaTitle} - ${siteName}` : siteName;

    return (
        <>
            <title>{fullSeo.metaTitle}</title>
            <meta name="twitter:title" content={fullSeo.metaTitle} />
            <meta property="og:title" content={fullSeo.metaTitle} />
            <meta name="description" content={fullSeo.metaDescription} />
            <meta name="twitter:description" content={fullSeo.metaDescription} />
            <meta property="og:description" content={fullSeo.metaDescription} />
            {fullSeo.shareImage && (
                <>
                    <meta name="image" content={fullSeo.shareImage} />
                    <meta name="twitter:image" content={fullSeo.shareImage} />
                    <meta property="og:image" content={fullSeo.shareImage} />
                </>
            )}
            {fullSeo.article && (
                <>
                    <meta property="og:type" content="article" />
                    <meta name="twitter:card" content="summary_large_image" />
                </>
            )}
        </>
    );
};

export default SEO;
