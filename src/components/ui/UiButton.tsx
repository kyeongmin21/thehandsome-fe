import React, {Ref, ReactNode, MouseEventHandler, ButtonHTMLAttributes} from 'react';
import classNames from 'classnames';

const sizeMap = {
    s: 'px-2 py-1 text-sm',
    m: 'px-4 py-3 text-base',
    l: 'px-5 py-5 text-lg'
} as const;

const colorMap = {
    whiteOutline: 'btn-white-outline',
    blackOutline: 'btn-black-outline',
    grayOutline: 'btn-gray-outline',

    blackFill: 'btn-black-fill',
    grayFill: 'bg-gray-300 text-white',
    yellowFill: 'bg-yellow-300',

    blackText: 'btn-black-text',
    grayText: 'text-gray-500',
    whiteText: 'btn-white-text',

    lightGrayOutline: 'border border-gray-300 text-black bg-white',
    none: 'border-none bg-transparent text-black'
} as const;

interface UiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnText?: string;
    btnIcon?: ReactNode;
    size?: keyof typeof sizeMap;
    color?: keyof typeof colorMap;
    ref?: Ref<HTMLButtonElement>;
}

const UiButton = ({
                      type = "button",
                      size = 's',
                      className = '',
                      color = 'blackOutline',
                      ref,
                      btnText,
                      btnIcon,
                      ...rest
                  }: UiButtonProps) => {

    const sizeStyle = sizeMap[size] || sizeMap.m;
    const colorStyle = colorMap[color] || colorMap.whiteOutline;
    const baseStyle = 'transition duration-200 cursor-pointer';
    const btnClass = classNames(baseStyle, sizeStyle, colorStyle, className);

    return (
        <button
            {...rest}
            ref={ref}
            type={type}
            className={btnClass}
        >
            {btnIcon && <span className="mr-2 inline-block">{btnIcon}</span>}
                {btnText}
        </button>
    );
}

export default UiButton;