import { graphql, PageProps } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonType } from '../components/button';
import SEO from '../components/seo';
import { Nodes, PolicyCategoryData, PolicyData, PolicySupportData, PoliticalPartyData, StrapiImage } from '../helpers/content-types';
import JsonDebug from '../helpers/json-debug';

type PoliciesPageData = {
    content: {
        heroTitle: string;
        heroDescription: string;
        heroBackground: StrapiImage;
        policy_categories: PolicyCategoryData[];
    }
    politicalParties: Nodes<PoliticalPartyData>;
};

const PoliciesPage = ({data}: PageProps<PoliciesPageData>) => {
    const content = data.content;
    const parties = data.politicalParties;

    const {t} = useTranslation();

    const heroBackground = getImage(content.heroBackground.localFile);
    const policyCategories = content.policy_categories.filter(cat => (cat.policies !== undefined && cat.policies.length > 0));

    const [selectedParties, setSelectedParties] = useState<string[]>([]);

    const toggleParty = (party: PoliticalPartyData) => {
        if (selectedParties.find(partyShortName => partyShortName === party.shortName)) {
            setSelectedParties(selectedParties.filter(partyShortName => partyShortName !== party.shortName));
        } else {
            setSelectedParties([...selectedParties, party.shortName]);
        }
    };

    const isPartySelected = (party: PoliticalPartyData) => {
        return selectedParties.find(partyShortName => partyShortName === party.shortName) === party.shortName;
    };

    const renderSupports = (policySupports: PolicySupportData[]) => {
        return (
            <p className="flex items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">{t('policies.supported_by')}</span>
                {policySupports.map((policySupport: PolicySupportData, index: number) => {
                    const color = policySupport.political_party?.color || 'gray';
                    return <span key={'party-' + index} className={`text-xs mx-1 rounded-full inline-block font-medium px-1 bg-${color}-100 text-${color}-800`}>{policySupport.political_party?.shortName}</span>
                })}
            </p>
        );
    };

    return (
        <div>
            <SEO/>
            <div className="relative w-full h-auto">
                <div className="absolute z-10 w-full h-full bg-blue-600/90"></div>
                <GatsbyImage
                    className="!absolute object-cover w-full h-full"
                    image={heroBackground!}
                    alt={content.heroBackground.alternativeText}
                />
                <div className="relative z-10 flex flex-col items-center h-full px-4 py-6 m-auto max-w-screen-2xl">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-3xl font-bold text-white font-display">{t('site_title')}</p>
                        <div className="flex items-center gap-10">
                            <AnchorLink stripHash to="#actions" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.actions.nav')}</AnchorLink>
                            <AnchorLink stripHash to="#vision" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.fight.nav')}</AnchorLink>
                            <AnchorLink stripHash to="#involvement" className="hidden text-lg font-medium text-white lg:inline">{t('home.sections.involvement.nav')}</AnchorLink>
                            <Button type={ButtonType.TRANSPARENT} href="/blog">{t('home.sections.blog.nav')}</Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-32 py-24 text-center">
                        <h1 className="text-2xl font-bold text-white lg:text-4xl font-display">{content.heroTitle}</h1>
                        <p className="text-lg font-medium text-white opacity-80">{content.heroDescription}</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto bg-gray-50">
                <div className="m-auto max-w-screen-2xl">
                    <div className="py-10">
                        <div className="">
                            <p className="mb-2 font-medium text-gray-700">{t("policies.filter_party")}</p>
                            <div className="flex gap-2">
                                {parties.nodes.map((party: PoliticalPartyData, index: number) => {
                                    const opacity = (isPartySelected(party)) ? 'opacity-100' : 'opacity-60';
                                    return (
                                        <div onClick={() => toggleParty(party)} key={'party-' + index} className={`cursor-pointer rounded-full text-sm px-3 py-1.5 font-medium bg-${party.color}-100 text-${party.color}-800 ${opacity}`}>{party.name}</div>
                                    );
                                })}
                            </div>
                        </div>
                        {policyCategories.map((category: PolicyCategoryData, index: number) => {
                            return (
                                <div className="py-8" key={'cat-' + index}>
                                    <p className="mb-4 text-2xl font-bold text-gray-800 font-display">{category.name}</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        {category.policies?.map((policy: PolicyData, policyIndex: number) => {
                                            let opacity = "opacity-100";
                                            if (selectedParties.length) {
                                                opacity = "opacity-50";
                                                policy.policy_supports?.forEach((support: PolicySupportData) => {
                                                    if (isPartySelected(support.political_party!)) {
                                                        opacity = "opacity-100";
                                                    }
                                                });
                                            }

                                            return (
                                                <div className={`p-4 transition-all duration-200 bg-white border border-gray-200 shadow-md cursor-pointer hover:shadow-xl rounded-xl ${opacity}`} key={'policy-' + policyIndex}>
                                                    <p className="text-lg font-medium text-gray-700">{policy.title}</p>
                                                    <p className="text-gray-600">{policy.explanation}</p>
                                                    <div className="flex justify-between pt-2">
                                                        {(policy.policy_supports !== undefined && policy.policy_supports.length > 0) && renderSupports(policy.policy_supports)}
                                                        <p className="text-xs font-bold text-gray-500 uppercase">{t("policies.more_info")}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const query = graphql`

query($language: String!) {
    content: strapiPoliciesPage(locale: {eq: $language}) {
        heroTitle
        heroDescription
        heroBackground {
            alternativeText
            localFile {
                childImageSharp {
                    gatsbyImageData(breakpoints: [320, 768, 1536], placeholder: BLURRED)
                }
            }
        }
        policy_categories {
            name
            policies {
                title
                explanation
                justification
                policy_supports {
                    quote
                    source
                    author
                    political_party {
                        name
                        shortName
                        color
                        jurisdiction
                    }
                }
            }
        }
    }
    politicalParties: allStrapiPoliticalParty(filter: {locale: {eq: $language}}) {
        nodes {
            name
            shortName
            color
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

export default PoliciesPage;