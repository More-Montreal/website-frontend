import { getImage } from "gatsby-plugin-image";
import * as React from "react";
import { KeyPoint as KeyPointProps } from "../helpers/content-types";

const KeyPoint = ({ title, icon, color, content }: KeyPointProps) => {
    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex items-center gap-4">
                <img
                    className={`aspect-square bg-${color}-50 rounded-full p-4 w-16 h-16`}
                    src={icon.localFile.publicURL}
                />
                <p className={`text-2xl font-display font-bold text-${color}-900`}>{title}</p>
            </div>
            <p className="text-lg text-gray-600">{content.data.content}</p>
        </div>
    );
};

export default KeyPoint;
