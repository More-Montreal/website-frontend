import * as React from 'react';
import { useTranslation } from 'react-i18next';

type HeaderProps = {
    type: "post" | "action" | "event";
};

const Header = ({type}: HeaderProps) => {
    const {t} = useTranslation();

    return (
        <div className="flex flex-col px-4 py-6 m-auto max-w-screen-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold text-gray-800 font-display">{t('site_title')}</p>
                    <p className="px-4 py-1 text-sm font-bold text-white bg-blue-500 rounded-full font-display">{t(`blog.header.${type}`)}</p>
                </div>
                <div className="flex items-center gap-10">
                    <p className="text-lg font-medium text-gray-600">{t('blog.header.post')}</p>
                    <p className="text-lg font-medium text-gray-600">{t('blog.header.event')}</p>
                    <p className="text-lg font-medium text-gray-600">{t('blog.header.action')}</p>
                    <p className="text-lg font-medium text-gray-600">{t('blog.header.about')}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;