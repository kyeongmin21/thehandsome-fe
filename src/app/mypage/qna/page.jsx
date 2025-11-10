'use client'

import DataTable from "@/components/ui/UiTable";
import {qnaColumns} from "@/config/qnaTableConfig";
import {useEffect, useState} from "react";
import apiHelper from "@/utils/apiHelper";
import {useRouter} from "next/navigation";

const MyQna = () => {
    const router = useRouter();
    const [qnaList, setQnaList] = useState([]);
    const fetchQna = () => {
        apiHelper.get('/qna')
            .then(res => {
                setQnaList(res.data);
            })
    }

    useEffect(() => {
        fetchQna();
    }, [])
    return (
        <div>
            <h2>1:1문의</h2>
            <hr />
            <DataTable columns={qnaColumns(router)} data={qnaList}/>
        </div>
    )
}

export default MyQna;