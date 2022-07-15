import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { StrapiImage } from '../helpers/content-types';

type ImageCardProps = {
    image: StrapiImage;
}

const ImageCard = ({image, children}: React.PropsWithChildren<ImageCardProps>) => {
    const background = getImage(image.localFile);

    return (
        <div className="rounded-2xl overflow-hidden h-[435px] relative box-content flex-auto z-10">
            <div className="relative w-full h-full">
                <div className="relative z-20 w-full h-full bg-gradient-to-t from-black/90 via-black/40"></div>
                <GatsbyImage
                    className="!absolute top-0 object-cover w-full h-full z-10"
                    image={background!}
                    alt={image.alternativeText}
                />
            </div>
            <div className="absolute bottom-0 z-30 px-3 py-5">
                {children}
            </div>
        </div>
    );
};

export default ImageCard;