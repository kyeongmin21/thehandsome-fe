'use client'
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Grid} from "swiper/modules";
import {popularSlides} from "@/config/MainPageConfig";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PopularBrand = () => {
    return (
        <div className='layout-custom bullet-swiper-cont'>
            <h2>인기 브랜드 신상품</h2>
            <Swiper
                className='swiper'
                modules={[Pagination, Grid]}
                slidesPerView={6}
                slidesPerGroup={3}
                spaceBetween={24}
                grid={{rows: 2, fill: 'row'}}
                loop={false}
                observer={true}
                observeParents={true}
                pagination={{clickable: true, type: 'bullets'}}>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {popularSlides.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full aspect-[0.663/1] overflow-hidden">
                            <Image src={item.src}
                                   width={280}
                                   height={422}
                                   priority
                                   alt={`배너 이미지 ${idx + 1}`}/>
                        </div>
                    </SwiperSlide>
                ))}
                </div>

            </Swiper>
        </div>
    )
}
export default PopularBrand;