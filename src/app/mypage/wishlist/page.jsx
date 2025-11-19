'use client'
import {useEffect} from "react";
import apiHelper from "@/utils/apiHelper";

const WishList = () => {

    const fetchData = async () => {
        try {
            const res = await apiHelper.get('/wishlist/my')
            console.log('위시리스트 조회데이터', res)
        } catch (error) {
            console.error('마이페이지 위시리스트 조회 실패', error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h2>위시리스트</h2>
            <hr />
        </div>
    )
}

export default WishList;