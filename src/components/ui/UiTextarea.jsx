import {Description, Field, Textarea, Label} from '@headlessui/react'
import clsx from 'clsx'

export default function UiTextarea({description, value, onChange}) {
    return (
        <div className="w-full max-w-md px-4">
            <Field>
                <Label className="text-sm/6 font-medium text-black">메모</Label>
                {description && <Description className="text-sm/6">{description}</Description>}
                <Textarea
                    value={value}
                    onChange={onChange}
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none px-3 py-1.5 text-sm/6',
                        'outline outline-1 outline-black',
                        'focus:outline-red-500 focus:outline-1 '
                    )}
                />
            </Field>
        </div>
    )
}
