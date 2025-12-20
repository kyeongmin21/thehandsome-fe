'use client'
import clsx from 'clsx'
import React, {useState, Ref, InputHTMLAttributes} from 'react'
import {Description, Field, Input, Label} from '@headlessui/react'
import {LuEye, LuEyeClosed} from "react-icons/lu"


// 우리가 원하는 커스텀 props + <input>이 받을 수 있는 모든 속성들 자동 포함
interface UiInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    className?: string;
    ref?: Ref<HTMLInputElement>;
}

const UiInput = ({
                     label,
                     description,
                     className,
                     type = 'text',
                     ref,
                     ...rest
                 }: UiInputProps) => {

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {setShowPassword(!showPassword)}
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

    return (
        <div className={clsx(className)}>
            <Field className="relative">
                <Label className="text-sm/6 font-medium text-black">{label}</Label>
                {description && <Description className="text-sm/6">{description}</Description>}
                <Input
                    {...rest}
                    ref={ref}
                    type={inputType}
                    autoComplete="off"
                    autoCapitalize="none"
                    className={clsx(
                        'block w-full py-1.5 text-sm/6',
                        'border-b border-gray-300',
                        'focus:border-b focus:border-black',
                        'focus:outline-none',
                        'disabled:text-gray-500 disabled:border-none disabled:bg-transparent disabled:cursor-not-allowed'
                    )}
                />
                {type === 'password' && (
                    <div className="eyes-icon"
                         onClick={handleShowPassword}>
                        {showPassword ? (
                            <span><LuEye className="text-black"/></span>
                        ) : (
                            <span><LuEyeClosed className="text-black"/></span>
                        )}
                    </div>
                )}
            </Field>
        </div>
    )
}

export default UiInput;