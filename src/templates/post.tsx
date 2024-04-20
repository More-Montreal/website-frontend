import * as React from "react";
import { graphql, PageProps } from "gatsby";
import JsonDebug from "../helpers/json-debug";
import Header from "../components/blog/header";
import { RichTextContent, SocialLinks, StrapiImage } from "../helpers/content-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useTranslation } from "@herob/gatsby-plugin-react-i18next";
import InvolvementCallout, { InvolvementData } from "../components/involvement-callout";
import Footer from "../components/footer";
import { Link } from "@herob/gatsby-plugin-react-i18next";
import SEO from "../components/seo";

type PostData = {
    strapiPost: {
        title: string;
        excerpt: string;
        slug: string;
        postCategories: { title: string }[];
        publishedAt: string;
        updatedAt: string;
        thumbnail: StrapiImage;
        seoThumbnail: StrapiImage;
        content: RichTextContent<"content">;
        author: {
            firstname: string;
            lastname: string;
        };
        locale: string;
        localizations: {
            data: {
                attributes: {
                    slug: string;
                    locale: string;
                };
            }[];
        };
    };
    socials: SocialLinks;
    involvementCallout: InvolvementData;
};

const PostTemplate = ({ data }: PageProps<PostData>) => {
    const { t } = useTranslation();
    const content = data.strapiPost;

    const author = `${content.author?.firstname} ${content.author?.lastname}`;
    const publishedDate = new Date(content.publishedAt);
    const date = `${t("blog.post.published")} ${publishedDate.toLocaleDateString(undefined, { dateStyle: "medium" })}`;

    const thumbnail = getImage(content.thumbnail.localFile);

    /**
     * Override the footer lang links since slugs are different
     */
    let langLinks: { [lang: string]: string } = {};
    const addLangLink = (lang: string, slug: string) => {
        const locale = lang === "en" ? "en/" : "";
        langLinks[lang] = `/${locale}blog/${slug}`;
    };

    content.localizations.data.forEach((localization) =>
        addLangLink(localization.attributes.locale, localization.attributes.slug),
    );
    addLangLink(content.locale, content.slug);

    return (
        <div>
            <SEO
                metaTitle={content.title}
                metaDescription={content.excerpt}
                article={true}
                shareImage={content.seoThumbnail.localFile.url}
            />
            <Header />
            <div className="w-full p-2 m-auto md:p-4 md:max-w-screen-2xl">
                <div className="relative h-full">
                    <div className="absolute z-20 flex-col items-center justify-end hidden w-full h-full overflow-hidden md:flex rounded-2xl">
                        <div className="absolute w-full h-full bg-gradient-to-t from-black/80 via-black/40"></div>
                        <div className="flex flex-col gap-4 relative max-w-[810px] mb-10 px-4 lg:px-0">
                            <p>
                                {content.postCategories.map((category: { title: string }, index: number) => {
                                    return (
                                        <span
                                            className="text-lg font-medium text-gray-300 uppercase drop-shadow-md"
                                            key={index}
                                        >
                                            {category.title}
                                            {index < content.postCategories.length - 1 ? ", " : ""}
                                        </span>
                                    );
                                })}
                            </p>
                            <h1 className="text-6xl font-bold text-white drop-shadow-lg font-display">
                                {content.title}
                            </h1>
                            <p className="text-xl italic text-gray-400 drop-shadow-md">{content.excerpt}</p>
                            <p className="mt-2 text-lg text-gray-300 drop-shadow-md">
                                {t("blog.post.by")} {author} &bull; {date}
                            </p>
                        </div>
                    </div>
                    <GatsbyImage
                        className="relative z-10 w-full shadow-xl rounded-xl md:rounded-2xl"
                        image={thumbnail!}
                        alt={content.thumbnail.alternativeText}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 px-4 mt-4 md:hidden">
                <p>
                    {content.postCategories.map((category: { title: string }, index: number) => {
                        return (
                            <span className="text-sm font-medium text-gray-600 uppercase" key={index}>
                                {category.title}
                                {index < content.postCategories.length - 1 ? ", " : ""}
                            </span>
                        );
                    })}
                </p>
                <h1 className="text-xl font-bold text-gray-800 font-display">{content.title}</h1>
                <p className="italic text-gray-500">{content.excerpt}</p>
                <p className="mt-2 text-gray-600">
                    {t("blog.post.by")} {author} &bull; {date}
                </p>
            </div>
            <div className="w-full max-w-[810px] p-4 m-auto mb-20">
                <article
                    className="mt-10 prose prose-headings:font-display lg:prose-xl max-w-none prose-img:rounded-xl prose-img:shadow-xl prose-img:z-10"
                    dangerouslySetInnerHTML={{ __html: content.content.data.childMarkdownRemark.html }}
                />
                <p className="mt-8 text-lg italic text-gray-700">{author}</p>
            </div>
            <InvolvementCallout
                title={data.involvementCallout.title}
                content={data.involvementCallout.content}
                image={data.involvementCallout.image}
                joinLink={data.involvementCallout.joinLink}
            />
            <Footer overrideLangLinks={langLinks} socials={data.socials}>
                <Link to="/blog" className="hidden text-lg font-medium text-white lg:inline">
                    {t("blog.header.post")}
                </Link>
                <Link to="/blog" className="hidden text-lg font-medium text-white lg:inline">
                    {t("blog.header.event")}
                </Link>
                {/* <a href="#involvement" className="hidden text-lg font-medium text-white lg:inline">{t('blog.header.action')}</a> */}
                <Link to="/" className="hidden text-lg font-medium text-white lg:inline">
                    {t("blog.header.about")}
                </Link>
            </Footer>
        </div>
    );
};

export const pageQuery = graphql`
    query ($slug: String, $language: String!) {
        strapiPost(slug: { eq: $slug }) {
            title
            slug
            excerpt
            publishedAt
            updatedAt
            content {
                data {
                    childMarkdownRemark {
                        html
                    }
                }
            }
            author {
                firstname
                lastname
            }
            postCategories {
                title
            }
            thumbnail {
                alternativeText
                localFile {
                    childImageSharp {
                        gatsbyImageData(width: 1200, placeholder: BLURRED)
                    }
                    url
                }
            }
            seoThumbnail {
                alternativeText
                localFile {
                    childImageSharp {
                        gatsbyImageData(width: 1200, placeholder: BLURRED)
                    }
                    url
                }
            }
            locale
            localizations {
                data {
                    attributes {
                        slug
                        locale
                    }
                }
            }
        }
        involvementCallout: strapiInvolvementCallout(locale: { eq: $language }) {
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
        locales: allLocale(filter: { language: { eq: $language } }) {
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

export default PostTemplate;
