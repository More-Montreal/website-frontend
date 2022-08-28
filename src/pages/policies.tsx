import { graphql, PageProps } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonType } from '../components/button';
import GradeMedal from '../components/policies/grade-medal';
import SupportTick from '../components/policies/support-tick';
import SEO from '../components/seo';
import { Nodes, PolicyCategoryData, PolicyData, PolicyGrade, PolicySupportData, PoliticalPartyData, StrapiImage } from '../helpers/content-types';
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

    const pointsForGrade = {
        [PolicyGrade.BRONZE]: 1,
        [PolicyGrade.SILVER]: 2,
        [PolicyGrade.GOLD]: 4
    };
    let maxScore = 0;
    policyCategories.forEach(category => {
        category.policies?.forEach(policy => {
            maxScore += pointsForGrade[policy.grade];
        });
    });

    const getPartySupport = (party: PoliticalPartyData, policy: PolicyData) => {
        return policy.policy_supports?.find((support) => {
            return support.political_party?.shortName === party.shortName;
        });
    };

    const renderPartyScore = (party: PoliticalPartyData) => {
        let score = 0;
        party.policy_supports?.forEach(support => {
            score += (support.fullSupport) ? pointsForGrade[support.policy!.grade] : pointsForGrade[support.policy!.grade] / 2;
        });

        const supportPercentage = score / maxScore * 100;
        const supportToTen = (score / maxScore * 10).toFixed(1);
        const color = party.color || 'gray';

        return (
            <div className="">
                <div className="px-8 py-4">
                    <p className={`text-xl font-display font-bold text-${color}-800 text-right`}>{supportToTen}/10</p>
                    <div className="w-full h-4 relative bg-gray-100 rounded-full overflow-hidden">
                        <span className={`block h-full bg-${color}-500`} style={{width: `${supportPercentage}%`}}></span>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <p className={`mx-1 rounded-full inline-block font-medium px-3 py-1.5 bg-${color}-100 text-${color}-800`}>{party.name}</p>
                </div>
            </div>
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
                    <div className="py-10 flex">
                        <h2 className="text-3xl"></h2>
                        {parties.nodes.map((party, index) => {
                            return (
                                <div className="flex-1" key={index}>{renderPartyScore(party)}</div>
                            )
                        })}
                    </div>
                    <div className="py-10">
                        <div className="grid grid-cols-12 gap-4">
                            <p className="text-3xl font-display text-gray-800 font-bold col-span-7">Idées</p>
                            <p className="text-3xl font-display text-gray-800 font-bold text-center col-span-5">Soutien des partis</p>
                        </div>
                        {policyCategories.map((category: PolicyCategoryData, index: number) => {
                            return (
                                <div className="py-8" key={'cat-' + index}>
                                    <div className="grid grid-cols-12">
                                        <p className="mb-4 text-2xl font-bold text-gray-800 font-display col-span-7">{category.name}</p>
                                        <div className="flex col-span-5">
                                            {parties.nodes.map((party: PoliticalPartyData, index: number) => {
                                                const color = party.color || 'gray';
                                                const background = (index % 2 == 0) ? 'bg-gray-100 rounded-t-xl' : '';

                                                return (
                                                    <div className={`flex flex-1 justify-center items-center ${background}`} key={index}>
                                                        <p className={`text-xs mx-1 rounded-full inline-block font-medium px-2 py-1.5 bg-${color}-100 text-${color}-800`}>{party.shortName}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12">
                                        {category.policies?.map((policy: PolicyData, policyIndex: number) => {
                                            return [
                                                <div className="col-span-7 pr-4 py-2" key={policyIndex}>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4"><GradeMedal grade={policy.grade}/></div>
                                                        <p className="text-lg font-medium text-gray-700 flex items-center">{policy.title}</p>
                                                    </div>
                                                    <p className="text-gray-600">{policy.explanation}</p>
                                                </div>,
                                                <div className="flex col-span-5" key={'supports-' + policyIndex}>
                                                    {parties.nodes.map((party: PoliticalPartyData, index: number) => {
                                                        const partySupport = getPartySupport(party, policy);
                                                        const background = (index % 2 == 0) ? 'bg-gray-100' : '';
                                                        const rounded = (policyIndex === category.policies!.length - 1) ? 'rounded-b-xl' : '';

                                                        return (
                                                            <div className={`flex flex-1 justify-center items-center ${background} ${rounded}`} key={`policy-${policyIndex}-support-${index}`}>
                                                                {typeof partySupport !== 'undefined' && <SupportTick color={party.color} full={partySupport.fullSupport}/>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ];
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
                grade
                policy_supports {
                    quote
                    source
                    author
                    fullSupport
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
            policy_supports {
                quote
                source
                author
                fullSupport
                policy {
                    title
                    explanation
                    justification
                    grade
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

export default PoliciesPage;