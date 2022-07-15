import { getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { KeyPoint as KeyPointProps } from '../helpers/content-types';

const KeyPoint = ({title, icon, color, content}: KeyPointProps) => {
    return (
        <div className="w-full">
            <div className={`mx-12 xl:mx-12 md:mx-32 flex flex-col items-center justify-center aspect-square bg-${color}-50 rounded-full`}>
                <img src={icon.localFile.publicURL}/>
                <p className={`text-2xl font-display font-bold text-${color}-900 pt-3`}>{title}</p>
            </div>
            <p className="text-lg text-center text-gray-600 pt-7">{content.data.content}</p>
        </div>
    );
};

export default KeyPoint;