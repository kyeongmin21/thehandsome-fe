import clsx from 'clsx'
import React, {forwardRef} from 'react'
import {Description, Field, Label, Textarea} from '@headlessui/react'

const UiTextarea = forwardRef(function UiTextarea({
                                                      label,
                                                      description,
                                                      name,
                                                      value,
                                                      onChange,
                                                      placeholder,
                                                      className,
                                                      disabled,
                                                      height = '200px',
                                                  },
                                                  ref) {
    return (
        <div className={clsx(className, "ui-textarea")}>
            <Field>
                <Label className="text-sm/6 font-medium text-black">{label}</Label>
                {description && <Description className="text-sm/6">{description}</Description>}
                <Textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    ref={ref}
                    disabled={disabled}
                    className={clsx(
                        'mt-3 w-full block border-none py-1.5 text-sm/6',
                        'outline outline-1 outline-gray-300',
                        'focus:outline-black focus:outline-1',
                        'disabled:text-gray-500 disabled:outline-none disabled:bg-transparent disabled:cursor-not-allowed',
                        className
                    )}
                    style={{height}}
                />
            </Field>
        </div>
    )
})


export default UiTextarea;