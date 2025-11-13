'use client'
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import { popularSlides } from "@/config/MainPageConfig";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PopularBrand = () => {
    return (
        <div className='main-layout'>
            <h2>인기 브랜드 신상품</h2>
            <Swiper
                className='swiper'
                modules={[Pagination, Grid]}
                slidesPerView={6}
                grid={{rows: 2, fill: 'row'}}
                slidesPerGroup={3}
                loop={false}
                spaceBetween={20}
                pagination={{ clickable: true, type: 'bullets', }}
            >
                {popularSlides.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <Image src={item.src}
                               width={200}
                               height={250}
                                alt='인기브랜드 이미지'/>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )

}
export default PopularBrand;