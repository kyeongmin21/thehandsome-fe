'use client';

import MainBanner from "@/components/layout/Main/MainBanner";
import PopularBrand from "@/components/layout/Main/PopularBrand";

export default function Home() {
    return (
        <>
            <MainBanner  style={{ border: '2px solid red; '}}/>
            <PopularBrand style={{ border: '2px solid red; '}}/>
        </>
    )
}