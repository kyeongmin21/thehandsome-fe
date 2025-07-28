import React from 'react';
import classNames from 'classnames';

const sizeMap = {
    s: 'px-3 py-1 text-sm',
    m: 'px-4 py-2 text-base',
    l: 'px-5 py-3 text-lg'
};

const colorMap = {
    whiteOutline: 'btn-white-outline',
    blackOutline: 'btn-black-outline',
    grayOutline: 'btn-gray-outline',
    blackFill: 'btn-black-fill',
    blackText: 'btn-black-text',
    whiteText: 'btn-white-text'
};

export default function Button({
                                   btnText,
                                   btnIcon,
                                   onClick,
                                   size = 'm',
                                   color = 'whiteOutline',
                               }) {

    const sizeStyle = sizeMap[size] || sizeMap.m;
    const colorStyle = colorMap[color] || colorMap.whiteOutline;
    const baseStyle = 'rounded transition duration-200 cursor-pointer';
    const btnClass = classNames(baseStyle, sizeStyle, colorStyle);

    return (
        <button onClick={onClick}
                className={btnClass}>
            {btnIcon && <span className="mr-2 inline-block">{btnIcon}</span>}
            {btnText}
        </button>
    );
}