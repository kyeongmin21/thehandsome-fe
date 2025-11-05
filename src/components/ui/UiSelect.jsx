import {Description, Field, Select, Label} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import clsx from 'clsx'

export default function UiSelect({
    label,
    description,
    value,
    onChange,
    options = [],
    className,
}) {
    return (
        <div className="w-full max-w-md">
            <Field>
                <Label className="text-sm/6 font-medium text-black">{label}</Label>
                {description && <Description className="text-sm/6">{description}</Description>}

                <div className="relative">
                    <Select
                        value={value}
                        onChange={onChange}
                        className={clsx(
                            'px-2 mt-3 block w-full appearance-none bg-white/5 ' +
                            'py-1.5 text-sm/6 outline outline-1 outline-gray-300 text-black',
                            className)}>
                        {options.map((option) => (
                            <option key={option.value} value={option.label}>{option.label}</option>
                        ))}
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
