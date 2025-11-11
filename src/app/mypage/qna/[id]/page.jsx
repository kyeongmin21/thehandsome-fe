'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QnaForm from "@/components/forms/qnaForm";
import apiHelper from '@/utils/apiHelper';
import UiButton from '@/components/ui/UiButton';


const QnaDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const [qna, setQna] = useState(null);

    useEffect(() => {
        const fetchQna = async () => {
            try {
                const res = await apiHelper.get(`/mypage/qna/${id}`);
                setQna(res);

                console.log('읽기 res', res)
            } catch (error) {
                console.error('QnA 불러오기 실패:', error);
            }
        };
        fetchQna();
    }, [id]);

    if (!qna) return <p>로딩 중...</p>;

    return (
        <>
            <h2>1:1문의 - 상세페이지</h2>
            <hr />
            <QnaForm mode='view'/>
        </>
    )
}
export default QnaDetail;