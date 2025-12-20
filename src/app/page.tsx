import MainBanner from "@/components/layout/Main/MainBanner";
import PopularBrand from "@/components/layout/Main/PopularBrand";
import NewItem from "@/components/layout/Main/NewItem";
import Magazine from "@/components/layout/Main/Magazine";
import QuickMenu from "@/components/layout/Main/QuickMenu";
import MainPopup from "@/components/common/MainPopup";

export default function Home() {
    return (
        <div className='main'>
            <MainBanner />
            <PopularBrand />
            <NewItem />
            <Magazine />
            <QuickMenu />
            <MainPopup />
        </div>
    )
}