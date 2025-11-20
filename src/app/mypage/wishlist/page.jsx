'use client'

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {FaHeart} from "react-icons/fa";
import {SlHeart} from "react-icons/sl";
import UiButton from "@/components/ui/UiButton";
import Image from "next/image";
import apiHelper from "@/utils/apiHelper";
import useUserStore from "@/store/userStore";


const WishList = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("heart");
    const [wishList, setWishList] = useState([]);
    const [isWished, setIsWished] = useState(false);
    const login = useUserStore((state) => state.isLoginIn);

    const fetchData = async () => {
        try {
            const res = await apiHelper.get('/wishlist/my')
            setWishList(res);
            console.log('데이터', res)
            const wishedMap = {};
            res.forEach(item => {
                wishedMap[item.product_code] = true;
            });
            setIsWished(wishedMap);
        } catch (error) {
            console.error('마이페이지 위시리스트 조회 실패', error)
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
            console.log('위시리스트 토글 실패')
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h2>마이하트</h2>
            <hr/>
            {/* Tabs */}
            <div className="flex gap-4 border-b mb-6">
                <button
                    onClick={() => setActiveTab("heart")}
                    className={` w-1/2 text-center pb-2 px-2 ${
                        activeTab === "heart"
                            ? "border-b-2 border-black font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    마이하트
                </button>

                <button
                    onClick={() => setActiveTab("brand")}
                    className={`w-1/2 text-center pb-2 px-2 ${
                        activeTab === "brand"
                            ? "border-b-2 border-black font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    브랜드
                </button>
            </div>


            {/* 탭별 내용 */}
            {activeTab === "heart" && (
                <div className="grid grid-cols-1 gap-6">
                    {wishList.length === 0 ? (
                        <p className="text-center text-gray-500 py-20">저장된 마이하트가 없습니다.</p>
                    ) : (
                        wishList.map((item, index) => (
                            <div key={index} className="flex items-center border-b border-gray-300 pb-4 pt-4">
                                {/* 1. 상품정보 */}
                                <div className="flex w-1/2 gap-4 items-center">
                                    <Image
                                        src={item.src}
                                        alt={item.name}
                                        width={120}
                                        height={140}
                                        className="rounded"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-sm text-gray-800">{item.brand}</p>
                                        <p className="font-medium text-sm text-gray-700">{item.name}</p>
                                    </div>
                                </div>

                                {/* 2. 상품금액 */}
                                <div className="w-1/4 text-center">
                                    <span className='font-bold'>{item.price.toLocaleString()}</span>
                                    <span className='text-sm'> 원</span>
                                </div>

                                {/* 3. 관리 */}
                                <div className=" w-1/4 flex justify-center items-center gap-4">
                                    <UiButton btnText='쇼핑백 담기'
                                              color='blackOutline'
                                              className='py-1 px-3 hover:bg-gray-100'/>

                                    {isWished[item.product_code] ? (
                                        <FaHeart size={23}
                                                 className='cursor-pointer opacity-50'
                                                 onClick={() => handleWishList(item.product_code)}/>
                                    ) : (
                                        <SlHeart size={23}
                                                 className='cursor-pointer'
                                                 onClick={() => handleWishList(item.product_code)}/>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === "brand" && (
                <div>
                    <p className="text-gray-600">브랜드 탭 내용 들어갈 자리</p>
                </div>
            )}
        </div>
    )
}

export default WishList;