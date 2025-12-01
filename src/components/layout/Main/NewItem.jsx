import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {SlHeart} from "react-icons/sl";
import {FaHeart} from "react-icons/fa";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import Image from "next/image";
import {Tab} from '@headlessui/react'
import {eventBanner} from "@/config/MainPageConfig";
import apiHelper from "@/utils/apiHelper";
import useUserStore from "@/store/userStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";


const newItem = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [list, setList] = useState([]);
    const [isWished, setIsWished] = useState(false);
    const login = useUserStore((state) => state.isLoginIn);

    const fetchData = async () => {
        try {
            const res = await apiHelper.get('/products')
            setList(res)
            setIsMounted(true)
        } catch (error) {
            console.log('신상품 리스트 조회 실패', error);
        }
    }

    const fetchWished = async () => {
        if (!login) return
        try {
            const res = await apiHelper.get('/wishlist/my-wished')
            const wishedMap = {};
            res.forEach(item => {
                wishedMap[item.product_code] = true;
            });
            setIsWished(wishedMap);
        } catch (error) {
            console.log('위시리스트 조회 실패')
        }
    }

    const handleWishList = async (code) => {
        if (!login) {
            alert('로그인이 필요한 서비스 입니다.')
            router.push('/login')
        }

        try {
            const res = await apiHelper.post(
                '/wishlist/toggle',
                {product_code: code})
            setIsWished((prev) => ({
                ...prev,
                [code]: !prev[code], // 해당 상품만 토글
            }))
        } catch (error) {
            console.log('위시리스트 토글 실패', error)
        }
    }

    useEffect(() => {
        fetchData()

    }, [])

    useEffect(() => {
        fetchWished()
    }, [login])

    return (
        <>
            {isMounted ? (
                <>
                    <div className="new-items bg-light-gray py-1">
                        <div className='layout-custom'>
                            <h2>새로 들어온 신상품</h2>
                            <Tab.Group>
                                <div className="flex w-full min-h-[390px]">
                                    <Tab.List className="flex flex-col w-1/4 text-lg mr-10">
                                        {list.map((category) => (
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
                                                            {isWished[item.product_code] ? (
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
            ) : (
                <div className="h-[500px] spinner">
                    <LoadingSpinner />
                </div>
            )}

        </>
    )
}

export default newItem;