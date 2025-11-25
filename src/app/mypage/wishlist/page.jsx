'use client'

import {useEffect, useState} from "react";
import {FaHeart} from "react-icons/fa";
import {SlHeart} from "react-icons/sl";
import {MdArrowForwardIos} from "react-icons/md";
import UiButton from "@/components/ui/UiButton";
import Image from "next/image";
import apiHelper from "@/utils/apiHelper";

const WishList = () => {
    const [activeTab, setActiveTab] = useState("heart");

    // 만약 isWished 없이 wishList (배열)만 사용한다면, 특정 상품 코드의 찜 여부를 확인하기 위해 매번 **배열 전체를 순회해야함
    // 상품 코드별 찜 여부를 나타내는 객체(Map) : "찜 되었는지" 여부
    const [wishList, setWishList] = useState([]);
    const [isWished, setIsWished] = useState({});

    const [brandList, setBrandList] = useState([]);
    const [isBrandWished, setIsBrandWished] = useState({});

    const fetchWishlistData = async () => {
        try {
            const res = await apiHelper.get('/wishlist/my-wished')
            setWishList(res);
            const wishedMap = {};
            res.forEach(item => {
                wishedMap[item.product_code] = true;
            });
            setIsWished(wishedMap);
        } catch (error) {
            console.error('마이페이지 위시리스트 조회 실패', error)
        }
    }

    const handleWishListClick= async (code) => {
        try {
            const res = await apiHelper.post('/wishlist/toggle', {product_code: code})
            setIsWished((prev) => ({
                ...prev,
                [code]: !prev[code], // 해당 상품만 토글
            }))
        } catch (error) {
            console.log('위시리스트 토글 실패', error)
        }
    }

    const handleBrandClick = async (code) => {
        try {
            const res = await apiHelper.post('/brandlike/toggle', { brand_code: code })
            setIsBrandWished((prev) => ({
                ...prev,
                [code]: !prev[code],
            }))
        } catch (error) {
            console.log('브랜드 찜 토글 실패', error)
        }

    }

    const fetchBrandList = async () => {
        try {
            const res = await apiHelper.get('/brandlike/my-brands')
            setBrandList(res);
            const brandWishedMap = {};
            res.forEach(item => {
                brandWishedMap[item.brand_code] = true;
            })
            setIsBrandWished(brandWishedMap);
        } catch (error) {
            console.error('마이페이지 브랜드 찜목록 조회 실패', error)
        }
    }

    useEffect(() => {
        fetchWishlistData();
        fetchBrandList()
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
                <div className="grid grid-cols-1 gap-6 mb-30">
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
                                        <FaHeart size={18}
                                                 className='cursor-pointer'
                                                 onClick={() => handleWishListClick(item.product_code)}/>
                                    ) : (
                                        <SlHeart size={18}
                                                 className='cursor-pointer'
                                                 onClick={() => handleWishListClick(item.product_code)}/>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === "brand" && (
                <div>
                    {brandList.length === 0 ? (
                        <p className="text-center text-gray-500 py-20">저장된 브랜드가 없습니다.</p>
                    ) : (
                     brandList.map((item, index) => (
                         <div key={index} className="flex items-center justify-between mb-5">
                             <div className="flex items-center">
                                 <p className='mr-2'>{item.brand_name}</p>
                                 <p>{isBrandWished[item.brand_code] ? (
                                         <FaHeart size={18}
                                                  className='cursor-pointer'
                                                  onClick={() => handleBrandClick(item.brand_code)}/>
                                     ) : (
                                         <SlHeart size={18}
                                                  className='cursor-pointer'
                                                  onClick={() => handleBrandClick(item.brand_code)}/>
                                     )}
                                 </p>
                             </div>
                             <p className='cursor-pointer flex'>브랜드 바로가기
                             <span style={{ padding: '3px 0 0 5px'}}><MdArrowForwardIos /></span>
                             </p>
                         </div>
                     ))
                    )}
                </div>
            )}
        </div>
    )
}

export default WishList;