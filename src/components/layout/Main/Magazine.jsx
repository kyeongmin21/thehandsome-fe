'use client'
import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import Image from "next/image";
import {coverStory, styleGuide, editorPick} from "@/config/MainPageConfig";
import "swiper/css";
import "swiper/css/navigation";

const allContents = [...coverStory, ...styleGuide, ...editorPick];

// 탭별 매핑
const contentsMap = {
    '전체': allContents,
    '커버스토리': coverStory,
    '스타일 가이드': styleGuide,
    '에디터 픽': editorPick,
};

// 탭 이름을 배열로 ['전체', '커버스토리', '스타일 가이드', '에디터 픽']
const tabNames = Object.keys(contentsMap);

const Magazine = () => {
    const [activeTab, setActiveTab] = useState('전체');

    return (
        <div className='layout-custom'>
            <h2>THE 매거진</h2>
            {/* 탭 버튼 */}
            <div className="flex border-b border-none">
                {tabNames.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(tab)}
                        className={`mt-2 pr-5 py-2 -mb-px text-black text-2xl cursor-pointer
                     ${activeTab === tab ? "font-semibold" : "font-normal text-gray-600"} `}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* 탭 내용 */}
            <div className="hover-navigation mt-4">
                <Swiper
                    key={activeTab}
                    spaceBetween={20}
                    slidesPerView={4}
                    slidesPerGroup={4}
                    modules={[Navigation]}
                    navigation>
                    {contentsMap[activeTab]?.map((item, idx) => (
                        <SwiperSlide key={idx} className="relative text-center">
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={432}
                                    height={576}/>
                            </div>
                            <h3 className="font-bold mt-3 text-sm">{item.title}</h3>
                            <p className="mt-1 text-xl">{item.subTitle}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Magazine;