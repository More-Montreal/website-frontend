import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonType } from './button';
import PillImageMask from '../../assets/PillImageMask.svg';
import { StrapiImage } from '../helpers/content-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export type InvolvementData = {
    title: string;
    content: string;
    joinLink: string;
    image: StrapiImage;
};

const InvolvementCallout = ({title, content, image, joinLink}: InvolvementData) => {

    const {t} = useTranslation();
    const imageData = getImage(image.localFile);

    return (
        <div id="involvement" className="w-full bg-gray-50">
            <div className="flex flex-row gap-20 px-4 m-auto max-w-screen-2xl">
                <div className="relative hidden mt-10 overflow-hidden basis-1/3 lg:block">
                    <div className="absolute w-full h-full p-[1px] pb-0">
                        <GatsbyImage
                            className="relative object-cover w-full h-full"
                            alt={image.alternativeText}
                            image={imageData!}
                        />
                    </div>
                    <PillImageMask className="relative bottom-[-1px] z-10 object-cover w-full h-full"/>
                </div>
                <div className="self-center flex-1 py-10 text-center lg:py-0 lg:text-left">
                    <p className="mb-4 text-4xl font-bold text-gray-800 font-display">{title}</p>
                    <p className="mb-8 text-lg font-medium text-gray-600">{content}</p>
                    <div className="flex flex-col justify-center gap-5 md:flex-row lg:justify-start">
                        <Button href={joinLink} target="_blank" type={ButtonType.SECONDARY}>{t('home.sections.involvement.join')}</Button>
                        <Button href="/blog" type={ButtonType.GRAY}>{t('home.sections.involvement.view_events')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvolvementCallout;