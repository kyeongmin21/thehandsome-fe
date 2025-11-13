import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {eventBanner} from "@/config/MainPageConfig";
import Image from "next/image";

const newItem = () => {
    return (
        <div className="main-banner layout-custom">
            <Swiper
                className='swiper'
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                loop={true}
                pagination={{ clickable: true }}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}>
                {eventBanner.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <Image
                            src={slide.src}
                            width={1920}
                            height={300}
                            alt={`띠배너 이미지 ${idx + 1}`}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default newItem;