import * as React from "react"
import { graphql, PageProps } from 'gatsby';``

// markup
const IndexPage = ({data}: PageProps) => {
    return (
        <div>
            <pre>
                {JSON.stringify(data)}
            </pre>
        </div>
    );
}

export const query = graphql`

query($language: String!) {
    allStrapiHomepage(filter: {locale: {eq: $language}}) {
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
}

`;

export default IndexPage
