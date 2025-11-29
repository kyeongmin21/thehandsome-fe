'use client'
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Grid} from "swiper/modules";
import {GoArrowRight} from "react-icons/go";
import {popularSlides} from "@/config/MainPageConfig";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {useEffect, useState} from "react";
import LoadingSpinner from '@/components/common/LoadingSpinner'

const PopularBrand = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, []);


    return (
        <div className='layout-custom bullet-swiper-cont'>
            <h2>관심 있는 브랜드의 신상품이에요</h2>
            {isMounted ? (
                <Swiper
                    modules={[Pagination, Grid]}
                    slidesPerView={6}
                    slidesPerGroup={3}
                    spaceBetween={24}
                    grid={{rows: 2, fill: 'row'}}
                    loop={false}
                    observer={true}
                    observeParents={true}
                    pagination={{clickable: true, type: 'bullets'}}>

                    {popularSlides.map((item, idx) => {
                        const disabledHover = [0, 6, 12, 18].includes(idx);

                        return (
                            <SwiperSlide key={idx}>
                                <div className="group test">
                                    <Image src={item.src}
                                           width={280}
                                           height={422}
                                           alt={`배너 이미지 ${idx + 1}`}/>

                                    <div className={`
                                        cursor-pointer
                                        absolute w-[80%] bottom-5 left-1/2 -translate-x-1/2
                                        transition-all duration-300
                                        bg-white text-black px-5 py-5 text-sm
                                          ${disabledHover ? "opacity-0" : "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"}
                                    `}
                                    >
                                        <p className='font-bold mb-2'>{item.brand}</p>
                                        <p className="truncate w-full block mb-2">{item.productName}</p>
                                        <p className='font-bold mb-5'>{item.price}</p>
                                        <p style={{fontSize: '20px'}}><GoArrowRight/></p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                </Swiper>
            ) : (
                <div className="h-[500px] spinner">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    )
}
export default PopularBrand;