import { ImageDataLike } from "gatsby-plugin-image";

export type Nodes<N> = {
    nodes: N[];
};

export type StrapiImage = {
    alternativeText: string;
    localFile: ImageDataLike & { url?: string };
};

export type SVGImage = {
    localFile: {
        publicURL: string;
    };
};

export type RichTextContent<C extends string> = {
    data: {
        childMarkdownRemark: {
            html: string;
        };
    } & { [key in C]: string };
};

export type KeyPoint = {
    title: string;
    color: string;
    icon: SVGImage;
    content: {
        data: { content: string };
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
    postCategories: { title: string }[];
    publishedAt: string;
    thumbnail: StrapiImage;
};

export type PolicyCategoryData = {
    name: string;
    policies?: PolicyData[];
};

export enum PolicyGrade {
    BRONZE = "bronze",
    SILVER = "silver",
    GOLD = "gold",
}

export type PolicyData = {
    title: string;
    explanation: string;
    justification: string;
    policy_supports: PolicySupportData[];
    policy_category?: PolicyCategoryData;
    grade: PolicyGrade;
};

export enum PoliticalPartyJurisdiction {
    FEDERAL = "federal",
    PROVINCIAL = "provincial",
    MUNICIPAL = "municipal",
}

export type PoliticalPartyData = {
    name: string;
    shortName: string;
    color: string;
    jurisdiction: PoliticalPartyJurisdiction;
    policy_supports?: PolicySupportData[];
};

export type PolicySupportData = {
    quote: string;
    source: string;
    author: string;
    political_party?: PoliticalPartyData;
    policy?: PolicyData;
    fullSupport: boolean;
};
