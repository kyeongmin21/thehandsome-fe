'use client'

import Link from "next/link";
import apiHelper from "@/utils/apiHelper";
import DataTable from "@/components/ui/UiTable";
import {qnaColumns} from "@/config/qnaTableConfig";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";

const MyQna = () => {
    const router = useRouter();
    const [qnaList, setQnaList] = useState([]);
    const fetchQna = () => {
        apiHelper.get('/mypage/qna')
            .then(res => {
                setQnaList(res);
                console.log('res 확인', res)
            })
    }

    useEffect(() => {
        fetchQna();
    }, [])
    return (
        <div>
            <h2>1:1문의</h2>
            <hr />
            <Link href='/mypage/qna/write'
                  className='flex justify-end mb-5'>문의하기
                <div className='pt-1 ml-2'><MdArrowForwardIos /></div>
            </Link>
            <DataTable columns={qnaColumns(router)} data={qnaList}/>
        </div>
    )
}

export default MyQna;