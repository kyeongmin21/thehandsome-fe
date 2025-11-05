'use client'
import clsx from 'clsx'
import React, { useState, forwardRef } from 'react'
import {Description, Field, Input, Label} from '@headlessui/react'
import { LuEye, LuEyeClosed } from "react-icons/lu"


const UiInput = forwardRef(function UiInput({
        label,
        description,
        name, value,
        onChange,
        placeholder,
        className,
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
                    className={clsx(
                        'block w-full px-3 py-1.5 text-sm/6',
                        'border-b border-gray-300',
                        'focus:border-b focus:border-black',
                        'focus:outline-none',
                    )}
                />
                {type ==='password' && (
                    <div className="eyes-icon"
                          onClick={handleShowPassword}>
                        {showPassword ? (<span><LuEye /></span>) : (<span><LuEyeClosed /></span>)}
                    </div>
                )}
            </Field>
        </div>
    )
})

export default UiInput;