import { ImageDataLike } from "gatsby-plugin-image";

export type Nodes<N> = {
    nodes: N[];
};

export type StrapiImage = {
    alternativeText: string;
    localFile: ImageDataLike;
};

export type SVGImage = {
    localFile: {
        publicURL: string;
    }
};

export type RichTextContent<C extends string> = {
    data: {
        childMarkdownRemark: {
            html: string;
        }
    } & { [key in C]: string; }
};

export type KeyPoint = {
    title: string;
    color: string;
    icon: SVGImage;
    content: {
        data: { content: string; }
    };
};

export type SocialLinks = {
    discordLink: string;
    facebookLink: string;
    instagramLink: string;
    twitterLink: string;
};

export type EventCardData = {
    title: string;
    slug: string;
    description: RichTextContent<"description">;
    scheduledDate: string;
    thumbnail: StrapiImage;
};

export type EventData = {
    title: string;
    slug: string;
    description: RichTextContent<"description">;
    scheduledDate: string;
    rsvpLink: string;
    inPerson: boolean;
    locationLink: string;
    thumbnail: StrapiImage;
};

export type ActionCardData = {
    title: string;
    slug: string;
    description: RichTextContent<"description">;
    publishedAt: string;
    thumbnail: StrapiImage;
};

export type PostCardData = {
    title: string;
    slug: string;
    excerpt: string;
    postCategories: {title: string}[];
    publishedAt: string;
    thumbnail: StrapiImage;
};