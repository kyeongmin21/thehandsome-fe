'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import Image from "next/image";
import {bannerSlides} from "@/config/MainPageConfig";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainBanner = () => {
    return (
        <>
            <div className="hover-navigation relative w-full">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    loop={true}
                    pagination={{clickable: true}}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}>
                    {bannerSlides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="relative w-full aspect-[2/1]">
                                <Image
                                    fill
                                    priority
                                    src={slide.src}
                                    className="object-cover"
                                    alt={`메인 배너 이미지 ${idx + 1}`}
                                />
                                {/* 텍스트 오버레이 */}
                                <div className="absolute inset-0 flex flex-col justify-center items-left text-left text-white px-20 pt-30 animate-fadeIn">
                                    <h2 className="text-7xl mb-10 leading-tight">
                                        {slide.title.map((line, i) => (
                                            <div key={i}>{line}<br/></div>
                                        ))}</h2>
                                    <p className="text-4xl">{slide.desc}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default MainBanner;