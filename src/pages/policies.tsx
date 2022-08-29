import { graphql, Link, PageProps } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonType } from '../components/button';
import Footer from '../components/footer';
import InvolvementCallout, { InvolvementData } from '../components/involvement-callout';
import GradeMedal from '../components/policies/grade-medal';
import PolicyModal from '../components/policies/policy-modal';
import ScoreBreakdownModal from '../components/policies/score-breakdown-modal';
import SupportTick from '../components/policies/support-tick';
import SEO from '../components/seo';
import { Nodes, PolicyCategoryData, PolicyData, PolicyGrade, PolicySupportData, PoliticalPartyData, SocialLinks, StrapiImage } from '../helpers/content-types';
import JsonDebug from '../helpers/json-debug';

type PoliciesPageData = {
    content: {
        heroTitle: string;
        heroDescription: string;
        scoreParties: boolean;
        feedbackEmail: string;
        heroBackground: StrapiImage;
        policy_categories: PolicyCategoryData[];
    }
    politicalParties: Nodes<PoliticalPartyData>;
    socials: SocialLinks;
    involvementCallout: InvolvementData;
};

const PoliciesPage = ({data}: PageProps<PoliciesPageData>) => {
    const content = data.content;
    const parties = data.politicalParties;

    const {t} = useTranslation();

    const heroBackground = getImage(content.heroBackground.localFile);
    const policyCategories = content.policy_categories.filter(cat => (cat.policies !== undefined && cat.policies.length > 0));
    const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null);
    const [displayScoreBreakdown, setDisplayScoreBreakdown] = useState<boolean>(false);

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

        category.policies?.sort((a, b) => {
            switch (a.grade) {
                case PolicyGrade.BRONZE: {
                    if (b.grade === PolicyGrade.BRONZE) return -1;
                    return 1;
                }
                case PolicyGrade.SILVER: {
                    if (b.grade === PolicyGrade.BRONZE || b.grade === PolicyGrade.SILVER) return -1;
                    return 1;
                }
                case PolicyGrade.GOLD: return 1;
                default: return -1;
            }
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
                    <p className={`lg:text-xl font-display font-bold text-${color}-800 text-right`}>{supportToTen}/10</p>
                    <div className="w-full h-3 lg:h-4 relative bg-gray-100 rounded-full overflow-hidden">
                        <span className={`block h-full bg-${color}-500`} style={{width: `${supportPercentage}%`}}></span>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <p className={`text-sm lg:text-base mx-1 rounded-full inline-block font-medium px-3 py-1.5 bg-${color}-100 text-${color}-800`}>{party.name}</p>
                </div>
            </div>
        );
    };

    const renderScore = () => {
        const search = (typeof window !== 'undefined') ? window.location.search : undefined;
        const params = new URLSearchParams(search);

        if (content.scoreParties || params.get('score')) {
            return [
                <div className="flex justify-center flex-wrap" key={0}>
                    <h2 className="w-full text-2xl lg:text-3xl font-display font-bold text-gray-800 text-center pt-10">{t('policies.parties_score')}</h2>
                    <p onClick={() => setDisplayScoreBreakdown(true)} className="cursor-pointer text-gray-700 font-medium underline">{t('policies.how_it_works')}</p>
                </div>,
                <div className="py-10 grid grid-cols-10 gap-2" key={1}>
                    {parties.nodes.map((party, index) => {
                        return (
                            <div className="col-span-10 md:col-span-5 lg:col-span-3 xl:col-span-2" key={'score-' + index}>{renderPartyScore(party)}</div>
                        )
                    })}
                </div>
            ];
        }
        return null;
    }

    return (
        <div>
            <SEO metaTitle={content.heroTitle} metaDescription={content.heroDescription} shareImage={content.heroBackground.localFile.url!}/>
            <div className="relative w-full h-auto">
                <div className="absolute z-10 w-full h-full bg-blue-600/90"></div>
                <GatsbyImage
                    className="!absolute object-cover w-full h-full"
                    image={heroBackground!}
                    alt={content.heroBackground.alternativeText}
                />
                <div className="relative z-10 flex flex-col items-center h-full px-4 py-6 m-auto max-w-screen-2xl">
                    <div className="flex items-center justify-between w-full">
                        <Link to="/" className="text-3xl font-bold text-white font-display">{t('site_title')}</Link>
                        <div className="flex items-center gap-10">
                            <Link to="/" className="hidden text-lg font-medium text-white lg:inline">{t('policies.home')}</Link>
                            <Button type={ButtonType.TRANSPARENT} href="/blog">{t('home.sections.blog.nav')}</Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-4 py-10 lg:px-32 lg:py-24 text-center">
                        <h1 className="text-2xl font-bold text-white lg:text-4xl font-display">{content.heroTitle}</h1>
                        <p className="text-lg font-medium text-white opacity-80">{content.heroDescription}</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto bg-gray-50">
                <div className="m-auto max-w-screen-2xl">
                    {renderScore()}
                    <div className="py-10 px-2 lg:px-4">
                        <div className="hidden lg:grid grid-cols-12 gap-4">
                            <p className="text-xl lg:text-3xl font-display text-gray-800 font-bold col-span-7">{t('policies.ideas')}</p>
                            <p className="text-xl lg:text-3xl font-display text-gray-800 font-bold text-center col-span-5">{t('policies.political_support')}</p>
                        </div>
                        {policyCategories.map((category: PolicyCategoryData, index: number) => {
                            return (
                                <div className="py-4 lg:py-8" key={'cat-' + index}>
                                    <div className="grid grid-cols-12 lg:gap-2">
                                        <p className="mb-4 text-lg lg:text-2xl font-bold text-gray-800 font-display col-span-12 lg:col-span-7">{category.name}</p>
                                        <div className="hidden lg:flex col-span-7 lg:col-span-5">
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
                                    {category.policies?.map((policy: PolicyData, policyIndex: number) => {
                                        return (
                                            <div className="grid grid-cols-12 lg:gap-2 rounded-xl bg-white shadow-lg lg:shadow-none lg:bg-transparent lg:border-none p-4 mb-4 lg:p-0 lg:my-0 border-gray-300 border" key={policyIndex}>
                                                <div onClick={() => setSelectedPolicy(policy)} className="col-span-12 lg:col-span-7 pr-4 pb-2 lg:p-4 hover:shadow-xl border hover:border-gray-300 border-transparent rounded-xl transition-all duration-200 cursor-pointer">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-3 lg:w-4 flex-shrink"><GradeMedal grade={policy.grade}/></div>
                                                        <p className="lg:text-lg flex-1 font-medium text-gray-700 flex items-center">{policy.title}</p>
                                                    </div>
                                                    <p className="text-sm lg:text-base text-gray-600">{policy.explanation}</p>
                                                </div>
                                                <div className="lg:hidden col-span-12">
                                                    {policy.policy_supports.length > 0 && <p className="text-xs uppercase text-gray-500 font-medium mb-1">{t('policies.supported_by')}</p>}
                                                    <div className="flex flex-wrap gap-2">
                                                        {policy.policy_supports.map((support, index) => {
                                                            const color = support.political_party?.color || 'gray';

                                                            return (
                                                                <div className={`flex items-center bg-${color}-100 rounded-full px-0.5`} key={'party-support-' + index}>
                                                                    <SupportTick color={support.political_party!.color} full={support.fullSupport}/>
                                                                    <p className={`text-xs font-medium px-2 py-1.5 text-${color}-800`}>{support.political_party!.shortName}</p>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="hidden lg:flex col-span-7 lg:col-span-5">
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
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex justify-center pb-8">
                    <OutboundLink className="underline text-blue-500" href={`mailto: ${content.feedbackEmail}`}>{t('policies.something_missing')}</OutboundLink>
                </div>
            </div>
            <InvolvementCallout
                title={data.involvementCallout.title}
                content={data.involvementCallout.content}
                image={data.involvementCallout.image}
                joinLink={data.involvementCallout.joinLink}
            />
            <Footer socials={data.socials}>
                <Link to="/" className="hidden text-lg font-medium text-white lg:inline">{t('policies.home')}</Link>
                <Button type={ButtonType.TRANSPARENT} href="/blog">{t('home.sections.blog.nav')}</Button>
            </Footer>
            {selectedPolicy && <PolicyModal policy={selectedPolicy} onClose={() => setSelectedPolicy(null)}/>}
            {displayScoreBreakdown && <ScoreBreakdownModal onClose={() => setDisplayScoreBreakdown(false)}/>}
        </div>
    );
};

export const query = graphql`

query($language: String!) {
    content: strapiPoliciesPage(locale: {eq: $language}) {
        heroTitle
        heroDescription
        scoreParties
        feedbackEmail
        heroBackground {
            alternativeText
            localFile {
                childImageSharp {
                    gatsbyImageData(breakpoints: [320, 768, 1536], placeholder: BLURRED)
                }
                url
            }
        }
        policy_categories {
            name
            policies {
                title
                explanation
                justification
                grade
                policy_category {
                    name
                }
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

export default PoliciesPage;