'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {qnaColumns} from "@/config/qnaTableConfig";
import {MdArrowForwardIos} from "react-icons/md";
import DataTable from "@/components/ui/UiTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Link from "next/link";
import apiHelper from "@/utils/apiHelper";


const MyQna = () => {
    const router = useRouter();
    const [qnaList, setQnaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchQna = async () => {
        setIsLoading(true);
        try {
            const res = await apiHelper.get(`/mypage/qna`);
            setQnaList(res);
        } catch (error) {
            console.error('QnA 리스트 불러오기 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQna()
    }, []);

    return (
        <div>
            <h2>1:1문의</h2>
            <hr/>
            <Link href='/mypage/qna/write'
                  className='flex justify-end mb-5'>문의하기
                <div className='pt-1 ml-2'><MdArrowForwardIos/></div>
            </Link>
            {isLoading ? (
                <LoadingSpinner fullScreen/>
            ) : (
                <DataTable columns={qnaColumns(router)} data={qnaList}/>
            )}
        </div>
    )
}

export default MyQna;