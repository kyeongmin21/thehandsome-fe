import {SlHeart} from "react-icons/sl";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import Image from "next/image";
import {Tab} from '@headlessui/react'
import {newItems} from "@/config/MainPageConfig";
import {eventBanner} from "@/config/MainPageConfig";

const newItem = () => {
    return (
        <>
            <div className="new-items bg-light-gray py-1">
                <div className='layout-custom'>
                    <h2>새로 들어온 신상품</h2>
                    <Tab.Group>
                        <div className="flex w-full">
                            <Tab.List className="flex flex-col w-1/4 text-lg mr-10">
                                {newItems.map((category) => (
                                    <Tab key={category.cate}
                                         className={({selected}) =>
                                             `py-2 text-left focus:outline-none ${selected ? 'font-semibold' : 'font-normal '}`
                                         }>
                                        {category.cate}
                                    </Tab>
                                ))}
                            </Tab.List>

                            {/* 오른쪽 내용 */}
                            <Tab.Panels className="w-3/4 tab-panels mr-5">
                                {newItems.map((category) => (
                                    <Tab.Panel key={category.cate}>
                                        <Swiper
                                            key={category.cate}
                                            observer={true}
                                            observeParents={true}
                                            modules={[Navigation]}
                                            navigation
                                            spaceBetween={20}
                                            slidesPerView={5}>

                                            {category.items.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="relative text-sm relative w-full aspect-[0.652/1] overflow-hidden">
                                                        <Image src={item.src}
                                                               alt={item.name}
                                                               width={246}
                                                               height={377}/>
                                                        <SlHeart className="heart-icon" size={23}/>
                                                    </div>
                                                    <p className='mt-3 text-center font-semibold text-sm'>{item.brand}</p>
                                                    <p className="mt-1 text-center text-sm">{item.name}</p>
                                                    <p className="mt-2 text-center font-semibold text-sm">{item.price.toLocaleString()}</p>
                                                </SwiperSlide>
                                            ))}

                                        </Swiper>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </div>
                    </Tab.Group>
                </div>
            </div>
            <div className="hover-navigation layout-custom">
                <Swiper
                    className='swiper'
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    loop={true}
                    pagination={{clickable: true}}
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
                                priority
                                alt={`띠배너 이미지 ${idx + 1}`}
                                style={{width: "100%", height: "auto"}}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default newItem;