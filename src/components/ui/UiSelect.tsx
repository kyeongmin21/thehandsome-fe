
import clsx from 'clsx'
import React, {ChangeEvent} from 'react'
import {Description, Field, Select, Label} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'


// 옵션 한 개에 대한 타입을 객체로 정의
interface SelectOption {
    label: string;
    value: string;
}

interface UiSelectProps {
    label?: string;
    description?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    className?: string;
}

export default function UiSelect({
    label,
    description,
    value,
    onChange,
    options = [],
    className,
}: UiSelectProps) {

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    }


    return (
        <div className="w-full max-w-md">
            <Field>
                <Label className="text-sm/6 font-medium text-black">{label}</Label>
                {description && <Description className="text-sm/6">{description}</Description>}

                <div className="relative">
                    <Select
                        value={value}
                        onChange={handleChange}
                        className={clsx(
                            'px-2 mt-3 block w-full appearance-none bg-white/5 ' +
                            'py-1.5 text-sm/6 outline outline-1 outline-gray-300 text-black',
                            className)}>
                        {options.map((option) => (
                            <option key={option.value}
                                    value={option.value}>
                                {option.label}
                            </option>
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
