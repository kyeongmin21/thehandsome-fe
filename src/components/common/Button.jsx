import React from 'react';
import classNames from 'classnames';

const sizeMap = {
    s: 'px-3 py-1 text-sm',
    m: 'px-4 py-2 text-base',
    l: 'px-5 py-3 text-lg'
};

const colorMap = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-black',
    danger: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    dark: 'bg-black text-white'
};

export default function Button({
                                   btnText,
                                   btnIcon,
                                   onClick,
                                   disabled = false,
                                   size = 'm',
                                   color = 'primary',
                                   className
                               }) {

    const sizeStyle = sizeMap[size] || sizeMap.m;
    const colorStyle = colorMap[color] || colorMap.primary;
    const baseStyle = 'rounded font-semibold transition duration-200 cursor-pointer';
    const btnClass = classNames(baseStyle, sizeStyle, colorStyle, className);

    return (
        <button disabled={disabled}
                onClick={onClick}
                className={btnClass}>
            {btnIcon && <span className="mr-2 inline-block">{btnIcon}</span>}
            {btnText}
        </button>
    );
}