import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { StrapiImage } from '../helpers/content-types';

type ImageCardProps = {
    image: StrapiImage;
}

const ImageCard = ({image, children}: React.PropsWithChildren<ImageCardProps>) => {
    const background = getImage(image.localFile);

    return (
        <div className="rounded-2xl overflow-hidden h-[435px] relative box-content flex-auto">
            <div className="relative w-full h-full">
                <div className="relative z-10 w-full h-full bg-gradient-to-t from-black/90 via-black/40"></div>
                <GatsbyImage
                    className="!absolute top-0 object-cover w-full h-full"
                    image={background!}
                    alt={image.alternativeText}
                />
            </div>
            <div className="absolute bottom-0 z-20 px-3 py-5">
                {children}
            </div>
        </div>
    );
};

export default ImageCard;