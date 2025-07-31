import UiTab from "@/components/ui/UiTab";
import UiDropdown from "@/components/ui/UiDropdown";

export default function MyPage() {
    const animals = ['고양이', '강아지', '햄스터']
    const tabContents = [
        <p>고양이는 귀엽습니다</p>,
        <p>강아지는 충직합니다</p>,
        <p>햄스터는 바쁩니다</p>,
    ]

    const names = ['김', '박', '최'];

    return (
        <>
            <UiTab titles={animals}
                   contents={tabContents}/>

            <UiDropdown titles={names}
                         contents={tabContents}/>
        </>
    )
}