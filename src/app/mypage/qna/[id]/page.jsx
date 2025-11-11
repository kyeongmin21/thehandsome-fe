'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import QnaForm from "@/components/forms/qnaForm";
import apiHelper from '@/utils/apiHelper';
import UiTextarea from "@/components/ui/UiTextarea";
import UiButton from "@/components/ui/UiButton";
import useUserStore from "@/store/userStore";

const QnaDetail = () => {
    const { id } = useParams();
    const [qna, setQna] = useState(null);
    const isAdmin = useUserStore((state) => state.role === "admin");
    const [isAnswerEditing, setIsAnswerEditing] = useState(false);

    // 관리자 답글 등록
    const handleAnswerSubmit = async (data) => {
        try {
            const res = await apiHelper.post(
                `/mypage/qna/${id}/answer`,
                {answer: data})
            setQna(res);
            setIsAnswerEditing(true);
            alert('답글이 성공적으로 등록/수정되었습니다.');
        } catch (error) {
            console.log('관리자 답글 등록 실패', error);
            alert('관리자 답글 등록 실패')
        }
    }

    // 관리자 답글 삭제
    const handleAnswerDelete = async () => {
        try {
            await apiHelper.delete(`/mypage/qna/${id}/answer`);
            setQna({ ...qna, answer: null, admin_id: null }); // 삭제 후 상태 초기화
            setIsAnswerEditing(false);
            alert('답글이 삭제되었습니다.');
        } catch (error) {
            console.log('관리자 답글 삭제 실패', error);
            alert('답글 삭제 실패');
        }
    }


    // 모든 qna 데이터 불러오기
    useEffect(() => {
        const fetchQna = async () => {
            try {
                const res = await apiHelper.get(`/mypage/qna/${id}`);
                if(res.answer) {
                    setIsAnswerEditing(true)
                }
                setQna(res);
            } catch (error) {
                console.error('QnA 불러오기 실패:', error);
            }
        };
        fetchQna();
    }, [id]);

    if (!qna) return <p>Loading...</p>;

    return (
        <>
            <h2>1:1문의 - 상세페이지</h2>
            <hr />
            <QnaForm mode='view'/>

            {/* 작성자/클라이언트에게 답변 보여주기 */}
            {qna.answer && qna.answer.trim() !== "" && (
                <div className='mt-10 p-4 bg-gray-100'>
                    <strong>관리자 ID : {qna.admin_id}</strong>
                    <p className='mt-2 whitespace-pre-line'>{qna.answer}</p>
                </div>
            )}

            {isAdmin && (
                <div className='mt-10'>
                    관리자 답글 입력란
                    <UiTextarea
                        height={'100px'}
                        value={qna.answer || ''}
                        disabled={!isAnswerEditing && qna.answer}
                        onChange={(e) => setQna({ ...qna, answer: e.target.value })}
                    />
                    <div className='mt-5 flex justify-end gap-2'>
                        {qna.answer && (
                            <UiButton
                                size='m'
                                btnText='삭제'
                                onClick={handleAnswerDelete}
                            />
                        )}
                        {qna.answer && !isAnswerEditing ? (
                            <UiButton
                                size='m'
                                color='gray'
                                btnText='수정하기'
                                onClick={() => setIsAnswerEditing(true)}
                            />
                        ) : (
                            <UiButton
                                size='m'
                                color='blackFill'
                                btnText={qna.answer ? '수정' : '등록'}
                                onClick={() => handleAnswerSubmit(qna.answer)}
                            />
                        )}

                    </div>
                </div>
            )}
        </>
    )
}
export default QnaDetail;