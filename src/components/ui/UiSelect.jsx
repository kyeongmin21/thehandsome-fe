import {Description, Field, Select, Label} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import clsx from 'clsx'

export default function UiSelect({description, value, onChange}) {
    return (
        <div className="w-full max-w-md px-4">
            <Field>
                <Label className="text-sm/6 font-medium text-black">아이디</Label>
                {description && <Description className="text-sm/6">{description}</Description>}

                <div className="relative">
                    <Select
                        value={value}
                        onChange={onChange}
                        className={clsx(
                            'mt-3 block w-full appearance-none rounded-lg bg-white/5 px-3 py-1.5 text-sm/6 outline outline-1 outline-black',
                            'text-black'
                        )}
                    >
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="delayed">Delayed</option>
                        <option value="canceled">Canceled</option>
                    </Select>
                    <ChevronDownIcon
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                        aria-hidden="true"
                    />
                </div>

            </Field>
        </div>
    )
}
