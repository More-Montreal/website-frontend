import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql, PageProps } from 'gatsby';

// markup
const IndexPage = ({data}: PageProps) => {
    const {t} = useTranslation();

    return (
        <div>
            <p className="text-3xl font-display">{t('site_title')}</p>
            <pre>
                {JSON.stringify(data)}
            </pre>
        </div>
    );
}

export const query = graphql`

query($language: String!) {
    content: allStrapiHomepage(filter: {locale: {eq: $language}}) {
        nodes {
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
