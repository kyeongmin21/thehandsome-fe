import clsx from 'clsx'
import React, { forwardRef } from 'react'
import {Description, Field, Label, Textarea} from '@headlessui/react'

const UiTextarea = forwardRef(function UiTextarea({
      label,
      description,
      name,
      value,
      onChange,
      placeholder,
      className,
      height= '400px',
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
                    className={clsx(
                        'mt-3 w-full block border-none px-3 py-1.5 text-sm/6',
                        'outline outline-1 outline-gray-300',
                        'focus:outline-black focus:outline-1',
                        className
                    )}
                    style={{ height }}
                />
            </Field>
        </div>
    )
})


export default UiTextarea;