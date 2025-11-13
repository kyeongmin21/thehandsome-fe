'use client';

import MainBanner from "@/components/layout/Main/MainBanner";
import PopularBrand from "@/components/layout/Main/PopularBrand";
import NewItem from "@/components/layout/Main/NewItem";

export default function Home() {
    return (
        <>
            <MainBanner />
            <PopularBrand />
            <NewItem />
        </>
    )
}