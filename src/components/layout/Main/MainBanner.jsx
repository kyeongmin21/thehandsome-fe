'use client'
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay} from "swiper/modules";
import { bannerSlides } from "@/config/MainPageConfig";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainBanner = () => {
    return (
        <>
            <div className="main-banner relative w-full">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    loop={true}
                    pagination={{ clickable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false, // 사용자가 조작해도 자동 슬라이드 계속
                    }}
                >
                    {bannerSlides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="relative w-full">
                                <Image
                                    src={slide.src}
                                    width={1920}
                                    height={960}
                                    alt={`메인 배너 이미지 ${idx + 1}`}
                                    style={{ width: "100%", height: "auto" }}
                                />
                                {/* 텍스트 오버레이 */}
                                <div className="absolute inset-0 flex flex-col justify-center items-left text-left text-white px-20 pt-30 animate-fadeIn">
                                    <h2 className="text-7xl mb-10 leading-tight">
                                        {slide.title.map((line, i) => (
                                        <div key={i}>{line}<br /></div>
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