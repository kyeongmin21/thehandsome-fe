import UiTab from "@/components/ui/UiTab";

export default function MyPage() {
    const animals = ['고양이', '강아지', '햄스터']
    const tabContents = [
        <p>고양이는 귀엽습니다</p>,
        <p>강아지는 충직합니다</p>,
        <p>햄스터는 바쁩니다</p>,
    ]

    return (
        <>
            <UiTab titles={animals}
                   contents={tabContents}/>
        </>
    )
}