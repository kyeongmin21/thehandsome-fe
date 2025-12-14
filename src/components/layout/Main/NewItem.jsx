'use client'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {SlHeart} from "react-icons/sl";
import {FaHeart} from "react-icons/fa";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useToggleWish from "@/hooks/queries/useToggleWish";
import useWishedProducts from "@/hooks/queries/useWishedProducts";
import Image from "next/image";
import apiHelper from "@/utils/apiHelper";
import {Tab} from '@headlessui/react'
import {eventBanner} from "@/config/MainPageConfig";
import {NEW_ITEM_CATEGORY} from "@/constants/category";

const NewItem = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const {toggleWish} = useToggleWish();
    const {wishedMap} = useWishedProducts();

    const {data: list = [], isLoading, isError} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            return await apiHelper.get('/products/grouped');
        }
    });

    const handleWishList = async (code) => {
        if (!session) {
            alert('로그인이 필요한 서비스 입니다.')
            router.push('/login')
            return
        }
        toggleWish(code)
    }


    if (isError) {
        return (
            <div className="h-[500px] flex items-center justify-center">
                <p className="text-red-500">상품 정보를 불러오는데 실패했습니다.</p>
            </div>
        );
    }


    return (
        <>
            {isLoading ? (
                <div className="h-[500px] spinner">
                    <LoadingSpinner/>
                </div>
            ) : (
                <>
                    <div className="new-items bg-light-gray py-1">
                        <div className='layout-custom'>
                            <h2>새로 들어온 신상품</h2>
                            <Tab.Group>
                                <div className="flex w-full min-h-[390px]">

                                    {/* 왼쪽 탭내용 */}
                                    <Tab.List className="flex flex-col w-1/4 text-lg mr-10">
                                        {list.map((category) => (
                                            <Tab key={category.cate}
                                                 className={({selected}) =>
                                                     `py-2 text-left focus:outline-none ${selected ? 'font-semibold' : 'font-normal '}`
                                                 }>
                                                {NEW_ITEM_CATEGORY[category.cate]}
                                            </Tab>
                                        ))}
                                    </Tab.List>

                                    {/* 오른쪽 내용 */}
                                    <Tab.Panels className="w-3/4 tab-panels mr-5">
                                        {list.map((category) => (
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
                                                            <Image src={item.src}
                                                                   alt={item.name}
                                                                   priority
                                                                   width={246}
                                                                   height={377}/>
                                                            {wishedMap[item.product_code] ? (
                                                                <FaHeart size={23} className="heart-icon"
                                                                         onClick={() => handleWishList(item.product_code)}/>
                                                            ) : (
                                                                <SlHeart size={23} className="heart-icon"
                                                                         onClick={() => handleWishList(item.product_code)}/>
                                                            )}
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
            )}
        </>
    )
}

export default NewItem;