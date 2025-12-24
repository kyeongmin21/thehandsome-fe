import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'


interface UiDropdownProps {
    titles: string[];
    contents: string[];
}

export default function UiDropdown({
                                       titles = [],
                                       contents = []
}: UiDropdownProps) {
    return (
        <div className="h-screen w-full px-4 pt-32">
            <div className="mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl bg-black/5">
                {titles.map((title, index) => (
                    <Disclosure as="div" className="p-6" defaultOpen={true} key={index}>
                        <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="text-sm/6 font-medium text-black group-data-hover:text-black/80">
                          {title}
                        </span>
                            <ChevronDownIcon
                                className="size-5 fill-black/60 group-data-hover:fill-black/50 group-data-open:rotate-180"/>
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
                            {contents[index]}
                        </DisclosurePanel>
                    </Disclosure>
                ))}

            </div>
        </div>
    )
}