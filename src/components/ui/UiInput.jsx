'use client'
import clsx from 'clsx'
import React, { useState, forwardRef } from 'react'
import {Description, Field, Input, Label} from '@headlessui/react'
import { LuEye, LuEyeClosed } from "react-icons/lu"


const UiInput = forwardRef(function UiInput({
        label,
        description,
        name,
        value,
        onChange,
        placeholder,
        className,
        disabled,
        type= 'text'
    },
    ref
) {

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {setShowPassword(!showPassword)}
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

    return (
        <div className={clsx(className)}>
            <Field>
                <Label className="text-sm/6 font-medium text-black">{label}</Label>
                {description && <Description className="text-sm/6">{description}</Description>}
                <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    ref={ref}
                    type={inputType}
                    disabled={disabled}
                    className={clsx(
                        'block w-full py-1.5 text-sm/6',
                        'border-b border-gray-300',
                        'focus:border-b focus:border-black',
                        'focus:outline-none',
                        'disabled:text-gray-500 disabled:border-none disabled:bg-transparent disabled:cursor-not-allowed'
                    )}
                />
                {type ==='password' && (
                    <div className="eyes-icon"
                          onClick={handleShowPassword}>
                        {showPassword ? (
                            <span><LuEye className="text-black" /></span>
                        ) : (
                            <span><LuEyeClosed className="text-black" /></span>
                        )}
                    </div>
                )}
            </Field>
        </div>
    )
})

export default UiInput;