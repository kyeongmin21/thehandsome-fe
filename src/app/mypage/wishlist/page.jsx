'use client'

import {useState} from "react";
import {FaHeart} from "react-icons/fa";
import {SlHeart} from "react-icons/sl";
import {MdArrowForwardIos} from "react-icons/md";
import UiButton from "@/components/ui/UiButton";
import useToggleWish from "@/hooks/queries/useToggleWish";
import useWishedProducts from "@/hooks/queries/useWishedProducts";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useMyBrandList from "@/hooks/queries/useWishedBrands";
import useToggleBrand from "@/hooks/queries/useToggleBrand";
import Image from "next/image";


const WishList = () => {
    const [activeTab, setActiveTab] = useState("heart");
    const {wishedBrandList, wishedBrandMap, isWishedBrandLoading} = useMyBrandList();
    const {wishListItems, wishedMap, isWishedLoading} = useWishedProducts();
    const {toggleWish} = useToggleWish();
    const {toggleBrand} = useToggleBrand();

    const handleWishList = async (code) => {
        toggleWish(code);
    }

    const handleBrandClick = async (code) => {
        toggleBrand(code);
    }

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
                    {isWishedLoading ? (
                        <div className="h-[500px] spinner">
                            <LoadingSpinner/>
                        </div>
                    ) : (
                        wishListItems.map((item, index) => (
                            <div key={index} className="flex items-center border-b border-gray-300 pb-4 pt-4">
                                {/* 1. 상품정보 */}
                                <div className="flex w-1/2 gap-4 items-center">
                                    <Image
                                        src={item.src}
                                        alt={item.name}
                                        width={246}
                                        height={377}
                                        priority
                                        className="rounded w-[120px] h-auto"
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

                                    {wishedMap[item.product_code] ? (
                                        <FaHeart size={18}
                                                 className='cursor-pointer'
                                                 onClick={() => handleWishList(item.product_code)}/>
                                    ) : (
                                        <SlHeart size={18}
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
                    {isWishedBrandLoading ? (
                        <LoadingSpinner/>
                    ) : wishedBrandList.length === 0 ? (
                        <p className="text-center text-gray-500 py-20">저장된 브랜드가 없습니다.</p>
                    ) : (
                        wishedBrandList.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-5">
                                <div className="flex items-center">
                                    <p className='mr-2'>{item.brand_name}</p>
                                    <p>{wishedBrandMap[item.brand_code] ? (
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
                                    <span style={{padding: '3px 0 0 5px'}}><MdArrowForwardIos/></span>
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