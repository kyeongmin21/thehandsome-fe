import {useState} from 'react'
import {Checkbox} from '@headlessui/react'
import {CheckIcon} from '@heroicons/react/16/solid'


export default function UiCheckbox() {
    const [enabled, setEnabled] = useState<boolean>(false)

    return (
        <Checkbox
            checked={enabled}
            onChange={setEnabled}
            className="group w-6 h-6 rounded-md bg-white/10 ring-1 ring-gray-300 ring-inset focus:outline-none data-checked:bg-white flex items-center justify-center">
            <CheckIcon className="hidden w-4 h-4 fill-black group-data-checked:block"/>
        </Checkbox>

    )
}