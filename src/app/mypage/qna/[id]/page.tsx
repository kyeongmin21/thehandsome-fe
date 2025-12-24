'use client'

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {useSession} from 'next-auth/react';
import QnaForm from '@/components/forms/QnaForm';
import UiButton from '@/components/ui/UiButton';
import UiTextarea from '@/components/ui/UiTextarea';
import apiHelper from '@/utils/apiHelper';


interface QnaData {
    answer: string | null;
    admin_id: string | null;
}

const QnaDetail = () => {
    const {id} = useParams();
    const [qna, setQna] = useState<QnaData | null>(null);
    const {data: session} = useSession();
    const isAdmin = session?.user?.role;
    const [isAnswerEditing, setIsAnswerEditing] = useState(false);

    // 관리자 답글 등록
    const handleAnswerSubmit = async (answer: string | null) => {
        try {
            const res = await apiHelper.post<QnaData>(
                `/mypage/qna/${id}/answer`,
                {answer: answer})
            setQna(res);
            setIsAnswerEditing(false);
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
            setQna({...qna, answer: null, admin_id: null}); // 삭제 후 상태 초기화
            setIsAnswerEditing(false);
            alert('답글이 삭제되었습니다.');
        } catch (error) {
            console.log('관리자 답글 삭제 실패', error);
            alert('답글 삭제 실패');
        }
    }

    // 모든 qna 데이터 불러오기
    useEffect(() => {
        if (!id) return;

        const fetchQna = async () => {
            try {
                const res = await apiHelper.get<QnaData>(`/mypage/qna/${id}`);
                if (res.answer) {
                    setIsAnswerEditing(false)
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
            <hr/>
            <QnaForm mode='view'/>

            {/* 작성자/클라이언트에게 답변 보여주기 */}
            {qna.answer && qna.answer.trim() !== '' && (
                <div className='mt-10 p-4 bg-gray-100'>
                    <strong>답변내용</strong>
                    <p className='mt-2 whitespace-pre-line'>{qna.answer}</p>
                </div>
            )}

            {isAdmin && (
                <div className='mt-10'>
                    관리자 답글 입력란
                    <UiTextarea
                        height={'100px'}
                        value={qna.answer || ''}
                        disabled={!!(!isAnswerEditing && qna.answer)}
                        onChange={(e) => setQna({...qna, answer: e.target.value})}
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
                                color='grayOutline'
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