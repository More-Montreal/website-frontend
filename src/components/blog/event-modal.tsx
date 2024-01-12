import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { useTranslation } from '@herob/gatsby-plugin-react-i18next';
import { EventData } from '../../helpers/content-types';
import Button, { ButtonType } from '../button';

type EventModalProps = {
    event: EventData;
    onClose: Function;
};

const EventModal = ({event, onClose}: EventModalProps) => {
    const {t} = useTranslation();

    const scheduledDate = (new Date(event.scheduledDate)).toLocaleString(undefined, {dateStyle: "long", timeStyle: "short"});
    const thumbnail = getImage(event.thumbnail.localFile);
    const eventStyle = (event.inPerson) ? `👥 ${t('blog.event.in_person')}` : `🌐 ${t('blog.event.online')}`;

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target !== e.currentTarget) return;
        onClose();
    };


    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full backdrop-blur bg-black/20" onClick={closeModal}>
            <div className="absolute max-w-full -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl top-1/2 left-1/2 w-[500px] rounded-3xl overflow-y-auto max-h-full">
                <div className="relative">
                    <GatsbyImage
                        className="w-full shadow-md"
                        image={thumbnail!}
                        alt={event.thumbnail.alternativeText}
                    />
                    <div className="absolute top-0 flex items-center justify-between w-full pt-4 pl-4">
                        <p className="px-3 py-1 text-sm font-bold text-white uppercase rounded-full drop-shadow bg-white/20">{t('blog.event.label')}</p>
                        <p onClick={closeModal} className="px-4 text-3xl text-white align-middle cursor-pointer drop-shadow-md">&times;</p>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-sm font-medium text-gray-500">{eventStyle}</p>
                    <p className="text-xl font-bold font-display">{event.title}</p>
                    <p className="font-medium text-gray-600">{scheduledDate}</p>
                    <article className="pt-2 pb-4 prose-sm prose-p:text-gray-700 prose-headings:font-display max-w-none prose-img:rounded-lg prose-img:shadow-lg" dangerouslySetInnerHTML={{__html: event.description.data.childMarkdownRemark.html}}/>
                    <div className="grid grid-cols-2 gap-4">
                        {event.locationLink && <Button href={event.locationLink} target="_blank"type={ButtonType.GRAY}>{t('blog.event.directions')}</Button>}
                        <Button href={event.rsvpLink} target="_blank" type={ButtonType.SECONDARY}>{t('blog.event.join')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;