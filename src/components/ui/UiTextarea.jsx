import {Description, Field, Textarea} from '@headlessui/react'
import clsx from 'clsx'

export default function UiTextarea({
                                       description,
                                       name,
                                       value,
                                       onChange,
                                       placeholder,
                                       className,
                                       height= '400px',
}) {
    return (
        <div className={clsx(className, "ui-textarea")}>
            <Field>
                {description && <Description className="text-sm/6">{description}</Description>}
                <Textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={clsx(
                        'mt-3 w-full block rounded-lg border-none px-3 py-1.5 text-sm/6',
                        'outline outline-1 outline-gray-300',
                        'focus:outline-red-500 focus:outline-1',
                        className
                    )}
                    style={{ height }}
                />
            </Field>
        </div>
    )
}
