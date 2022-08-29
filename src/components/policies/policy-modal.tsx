import { OutboundLink } from 'gatsby-plugin-google-gtag';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PolicyData } from '../../helpers/content-types';
import GradeMedal from './grade-medal';
import SupportTick from './support-tick';

type PolicyModalProps = {
    policy: PolicyData;
    onClose: Function;
};

const PolicyModal = ({policy, onClose}: PolicyModalProps) => {
    const {t} = useTranslation();

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target !== e.currentTarget) return;
        onClose();
    };


    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full backdrop-blur bg-black/20" onClick={closeModal}>
            <div className="absolute max-w-full -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl top-1/2 left-1/2 w-[700px] rounded-3xl overflow-y-auto max-h-full">
                <div className="flex justify-end">
                    <p onClick={closeModal} className="flex-shrink px-4 text-3xl text-gray-700 align-middle cursor-pointer">&times;</p>
                </div>
                <div className="p-4">
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600">{policy.policy_category?.name}</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-shrink w-4"><GradeMedal grade={policy.grade}/></div>
                            <p className="flex-1 text-xl font-display font-bold text-gray-800">{policy.title}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">{policy.explanation}</p>
                    {policy.justification && <p className="text-lg text-gray-700 font-medium">{t('policies.why_it_matters')}</p>}
                    <p className="text-gray-600 mb-4">{policy.justification}</p>
                    <p className="text-lg text-gray-700 font-medium">{policy.policy_supports.length ? t('policies.political_support') : t('policies.no_support')}</p>
                    <div className="py-2">
                        {policy.policy_supports.map((support, index) => {
                            const color = support.political_party?.color || 'gray';
                            const background = (index % 2 == 0) ? 'bg-gray-100' : '';

                            return (
                                <div className={`rounded-xl p-4 ${background}`} key={index}>
                                    <div className="inline-block">
                                        <div className={`flex items-center bg-${color}-100 rounded-full px-0.5`}>
                                            <SupportTick color={support.political_party!.color} full={support.fullSupport}/>
                                            <p className={`text-sm font-medium px-2 py-1.5 text-${color}-800`}>{support.political_party!.name}</p>
                                        </div>
                                    </div>
                                    <p className="italic py-2 text-gray-700">{support.quote}</p>
                                    <div className="flex justify-end gap-2 items-center">
                                        {support.author && <p className="text-sm text-gray-600">{support.author}</p>}
                                        <OutboundLink className="text-xs text-gray-400 underline" href={support.source} target="_blank">Source</OutboundLink>
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

export default PolicyModal;