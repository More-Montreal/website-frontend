import * as React from 'react';

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TRANSPARENT = 'transparent',
    GRAY = 'gray'
};

export type ButtonProps = {
    type?: ButtonType;
    href?: string;
    target?: string;
    onClick?: React.MouseEventHandler;
};

const Button = ({children, type, onClick, href, target}: React.PropsWithChildren<ButtonProps>) => {

    let color = '';
    switch (type) {
        case ButtonType.GRAY: color = `bg-gray-200 text-gray-800`; break;
        case ButtonType.TRANSPARENT: color = `bg-white bg-opacity-20 text-white`; break;
        case ButtonType.SECONDARY: color = `bg-blue-600 text-white shadow-lg`; break;
        case ButtonType.PRIMARY:
        default: color = `bg-red-500 text-white shadow-lg`; break;
    }

    const Tag = (href) ? 'a' : 'div';

    return (
        <Tag href={href || ''} target={target || ''} className={"flex-shrink text-lg cursor-pointer py-2 px-5 rounded-full font-semibold " + color} onClick={onClick}>{children}</Tag>
    );
};

export default Button;