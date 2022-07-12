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