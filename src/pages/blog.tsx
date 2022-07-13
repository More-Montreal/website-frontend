import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby-plugin-react-i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/blog/header';
import ImageCard from '../components/image-card';
import { InvolvementData } from '../components/involvement-callout';
import { ActionCardData, EventCardData, Nodes, PostCardData, SocialLinks } from '../helpers/content-types';
import PillDecorator from '../../assets/PillDecorator.svg';

type BlogData = {
    posts: Nodes<PostCardData>;
    events: Nodes<EventCardData>;
    actions: Nodes<ActionCardData>;
    socials: SocialLinks;
    involvementCallout: InvolvementData;
};

const BlogPage = ({data}: PageProps<BlogData>) => {

    // React.useEffect(() => {
    //     data.posts.nodes.push(data.posts.nodes[0]);
    //     data.posts.nodes.push(data.posts.nodes[0]);
    //     data.posts.nodes.push(data.posts.nodes[0]);
    //     data.posts.nodes.push(data.posts.nodes[0]);
    // }, []);

    const latestPost = data.posts.nodes[0];
    const latestThumbnail = getImage(latestPost.thumbnail.localFile);
    const latestPublishedDate = (new Date(latestPost.publishedAt)).toLocaleDateString(undefined, {dateStyle: 'medium'});

    const {t} = useTranslation();

    return (
        <div>
            <Header type="blog"/>
            <div className="p-4 m-auto max-w-screen-2xl">
                <Link to={`/blog/${latestPost.slug}`} className="flex">
                    <GatsbyImage
                        className="relative flex-1 w-full shadow-xl rounded-xl md:rounded-2xl"
                        image={latestThumbnail!}
                        alt={latestPost.thumbnail.alternativeText}
                    />
                    <div className="flex flex-col justify-center flex-1 gap-4 p-12">
                        <div>
                            <p className="inline px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-full">{t('blog.index.latest')}</p>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 font-display">{latestPost.title}</p>
                        <p className="text-xl italic text-gray-500">{latestPost.excerpt}</p>
                        <p className="text-gray-700">{t('blog.post.published')} {latestPublishedDate}</p>
                    </div>
                </Link>
                <div className="flex flex-wrap mt-20">
                    <div className="basis-1/3">
                        <div className="relative">
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-800 font-display">{t('blog.index.latest_posts')}</p>
                            </div>
                            <PillDecorator className="absolute w-14 -bottom-4 -left-4 md:-bottom-14 fill-blue-100"/>
                        </div>
                    </div>
                    <div className="basis-1/3">
                        <div className="relative">
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-800 font-display">{t('blog.index.upcoming_events')}</p>
                            </div>
                            <PillDecorator className="absolute w-14 -bottom-4 -left-4 md:-bottom-14 fill-indigo-100"/>
                        </div>
                    </div>
                    <div className="basis-1/3">
                        <div className="relative">
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-800 font-display">{t('blog.index.latest_actions')}</p>
                            </div>
                            <PillDecorator className="absolute w-14 -bottom-4 -left-4 md:-bottom-14 fill-red-100"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const pageQuery = graphql`

query ($language: String!) {
    posts: allStrapiPost(limit: 5, filter: {locale: {eq: $language}}) {
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
    events: allStrapiEvent(limit: 5, filter: {locale: {eq: $language}}) {
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
    actions: allStrapiAction(limit: 5, filter: {locale: {eq: $language}}) {
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

export default BlogPage;