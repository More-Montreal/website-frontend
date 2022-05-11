import * as React from "react"
import { graphql, PageProps } from 'gatsby';``

// markup
const IndexPage = ({data}: PageProps) => {
    return (
        <div>
            <p className="text-3xl font-display">Construisons Montréal</p>
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
