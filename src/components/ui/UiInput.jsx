import {Description, Field, Input, Label} from '@headlessui/react'
import clsx from 'clsx'

export default function UiInput({description, value, onChange}) {
    return (
        <div className="w-full max-w-md px-4">
            <Field>
                <Label className="text-sm/6 font-medium text-black">아이디</Label>
                {description && <Description className="text-sm/6">{description}</Description>}
                <Input
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
