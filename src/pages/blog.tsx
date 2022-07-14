import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby-plugin-react-i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/blog/header';
import InvolvementCallout, { InvolvementData } from '../components/involvement-callout';
import { ActionCardData, EventCardData, Nodes, PostCardData, SocialLinks } from '../helpers/content-types';
import PillDecorator from '../../assets/PillDecorator.svg';
import CalendarDate from '../components/calendar-date';
import Footer from '../components/footer';

type BlogData = {
    posts: Nodes<PostCardData>;
    events: Nodes<EventCardData>;
    actions: Nodes<ActionCardData>;
    socials: SocialLinks;
    involvementCallout: InvolvementData;
};

const BlogPage = ({data}: PageProps<BlogData>) => {

    data.posts.nodes.push(data.posts.nodes[0]);
    data.posts.nodes.push(data.posts.nodes[0]);
    data.posts.nodes.push(data.posts.nodes[0]);
    data.posts.nodes.push(data.posts.nodes[0]);
    data.posts.nodes.push(data.posts.nodes[0]);

    const latestPost = data.posts.nodes[0];
    const latestThumbnail = getImage(latestPost.thumbnail.localFile);
    const latestPublishedDate = (new Date(latestPost.publishedAt)).toLocaleDateString(undefined, {dateStyle: 'medium'});

    const events = data.events.nodes.sort((eventA, eventB) => {
        const scheduledA = (new Date(eventA.scheduledDate)).getTime();
        const scheduledB = (new Date(eventB.scheduledDate)).getTime();

        if (scheduledA < scheduledB) return 1;
        return -1;
    });

    const {t} = useTranslation();

    return (
        <div>
            <Header type="blog"/>
            <div className="p-4 m-auto mb-20 max-w-screen-2xl">
                <Link to={`/blog/${latestPost.slug}`} className="flex flex-col md:flex-row">
                    <GatsbyImage
                        className="relative flex-1 w-full shadow-xl rounded-xl md:rounded-2xl"
                        image={latestThumbnail!}
                        alt={latestPost.thumbnail.alternativeText}
                    />
                    <div className="flex flex-col justify-center flex-1 gap-4 py-4 md:p-12">
                        <div className="hidden md:block">
                            <p className="inline px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-full">{t('blog.index.latest')}</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-800 md:text-3xl font-display">{latestPost.title}</p>
                        <p className="text-lg italic text-gray-500 md:text-xl">{latestPost.excerpt}</p>
                        <p className="text-gray-700">{t('blog.post.published')} {latestPublishedDate}</p>
                    </div>
                </Link>
                <div className="flex flex-wrap gap-20 mt-10 md:mt-20 md:gap-0">
                    <div className="basis-12/12 md:basis-6/12 lg:basis-8/12 xl:basis-9/12">
                        <div className="relative">
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-800 font-display">{t('blog.index.latest_posts')}</p>
                            </div>
                            <PillDecorator className="absolute w-14 -bottom-14 -left-4 fill-blue-100"/>
                        </div>
                        <div className="grid gap-8 mt-8 md:pr-8 xl:grid-cols-2">
                            {data.posts.nodes.map(post => {
                                const thumbnail = getImage(post.thumbnail.localFile);
                                const publishedDate = (new Date(post.publishedAt)).toLocaleDateString(undefined, {dateStyle: 'medium'});

                                return (
                                    <Link to={`/blog/${post.slug}`} className="flex" key={post.slug}>
                                        <GatsbyImage
                                            className="self-center flex-1 w-full mr-2 shadow-md h-28 md:h-32 rounded-xl"
                                            image={thumbnail!}
                                            alt={post.thumbnail.alternativeText}
                                        />
                                        <div className="flex flex-col justify-center w-2/3 gap-1 pl-2 md:px-2">
                                            {post.postCategories.length && <p className="text-xs font-medium text-gray-600 uppercase">{post.postCategories[0].title}</p>}
                                            <p className="text-lg font-bold text-gray-800 font-display">{post.title}</p>
                                            <p className="text-sm italic text-gray-500">{publishedDate}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="basis-12/12 md:basis-6/12 lg:basis-4/12 xl:basis-3/12">
                        <div className="relative">
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-800 font-display">{t('blog.index.upcoming_events')}</p>
                            </div>
                            <PillDecorator className="absolute w-14 -left-4 -bottom-14 fill-indigo-100"/>
                        </div>
                        <div className="flex flex-col gap-8 mt-8">
                            {events.map(event => {
                                const scheduledDate = (new Date(event.scheduledDate)).toLocaleString(undefined, {dateStyle: 'medium', timeStyle: "short"});

                                return (
                                    <div className="flex" key={event.slug}>
                                        <div className="flex-shrink">
                                            <CalendarDate date={new Date(event.scheduledDate)}/>
                                        </div>
                                        <div className="flex flex-col justify-center flex-1 gap-1 pl-4 md:px-4">
                                            <p className="text-gray-600">{scheduledDate}</p>
                                            <p className="text-lg font-bold text-gray-800 font-display">{event.title}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Future actions integration 
                    <div className="basis-3/12">
                        <div className="relative">
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-800 font-display">{t('blog.index.latest_actions')}</p>
                            </div>
                            <PillDecorator className="absolute w-14 -bottom-4 -left-4 md:-bottom-14 fill-red-100"/>
                        </div>
                    </div> */}
                </div>
            </div>
            <InvolvementCallout
                title={data.involvementCallout.title}
                content={data.involvementCallout.content}
                image={data.involvementCallout.image}
                joinLink={data.involvementCallout.joinLink}
            />
            <Footer socials={data.socials}>
                <Link to="/blog" className="hidden text-lg font-medium text-white lg:inline">{t('blog.header.post')}</Link>
                <Link to="/blog" className="hidden text-lg font-medium text-white lg:inline">{t('blog.header.event')}</Link>
                {/* <a href="#involvement" className="hidden text-lg font-medium text-white lg:inline">{t('blog.header.action')}</a> */}
                <Link to="/" className="hidden text-lg font-medium text-white lg:inline">{t('blog.header.about')}</Link>
            </Footer>
        </div>
    );
};

export const pageQuery = graphql`

query ($language: String!) {
    posts: allStrapiPost(limit: 6, sort: {order: DESC, fields: id}, filter: {locale: {eq: $language}}) {
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
    events: allStrapiEvent(limit: 4, sort: {order: DESC, fields: id}, filter: {locale: {eq: $language}}) {
        nodes {
            title
            slug
            scheduledDate
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
    actions: allStrapiAction(limit: 5, sort: {order: DESC, fields: id}, filter: {locale: {eq: $language}}) {
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