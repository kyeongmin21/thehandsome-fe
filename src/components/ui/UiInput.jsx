import clsx from 'clsx'
import React, { forwardRef } from 'react'
import {Description, Field, Input, Label} from '@headlessui/react'

const UiInput = forwardRef(function UiInput(
    {label, description, value, onChange, placeholder},
    ref
) {
    return (
        <div className="w-full max-w-md">
            <Field>
                <Label className="text-sm/6 font-medium text-black">{label}</Label>
                {description && <Description className="text-sm/6">{description}</Description>}
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    ref={ref}
                    className={clsx(
                        'block w-full rounded-lg border-none px-3 py-1.5 text-sm/6',
                        'outline outline-1 outline-black',
                        'focus:outline-red-500 focus:outline-1 '
                    )}
                />
            </Field>
        </div>
    )
})

export default UiInput;