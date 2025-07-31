import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react'

export default function UiTab({titles = [], contents = []}) {
    return (
        <TabGroup>
            <TabList className="flex space-x-2">
                {titles.map((title, index) => (
                    <Tab key={index}
                        className="data-hover:underline
                        data-selected:bg-blue-500
                        data-selected:text-white p-4">{title}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {contents.map((content, index) => (
                    <TabPanel key={index}>{content}</TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    )
}