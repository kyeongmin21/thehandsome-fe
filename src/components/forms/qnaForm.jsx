'use client'
import Link from "next/link";
import apiHelper from "@/utils/apiHelper";
import UiInput from "@/components/ui/UiInput";
import UiTextarea from "@/components/ui/UiTextarea";
import UiButton from "@/components/ui/UiButton";
import {useRouter, useParams} from "next/navigation";
import {useForm} from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import {useEffect} from "react";

const QnaForm = ({ mode }) => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const isEdit = mode === 'edit';
    const isWrite = mode === 'write';
    const isView = mode === 'view';

    console.log('mode', mode)
    const {
        watch,
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            title: '',
            content: '',
        }
    })

    const titleValue = watch('title');
    const contentValue = watch('content');

    const handleDelete = async () => {
        if (!confirm ('정말 삭제하시겠습니까?')) return
        try {
            await apiHelper.delete(`/mypage/qna/${id}`);
            alert('삭제되었습니다.');
            router.push(`/mypage/qna`);
        } catch (error) {
            console.log('삭제 실패', error)
            alert('삭제에 실패했습니다.')
        }
    }

    const onSubmit = async (data) => {
        if (isEdit) {
            const fieldsToWatch = ['title', 'content'];
            fieldsToWatch.forEach(name => {
                if (data[name] === undefined) {
                    data[name] = watch(name);
                }
            });
        }
        try {
            if (isEdit) {
                const res = await  apiHelper.put(`/mypage/qna/${id}`, data);
            } else {
                const res = await apiHelper.post('/mypage/qna/create', data);
            }
            router.push('/mypage/qna')
            alert(`${isEdit ? '수정' : '등록'}이 완료되었습니다.`);
        } catch (error) {
            console.log("등록 실패", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiHelper.get(`/mypage/qna/${id}`);
                reset({
                    title: res.title,
                    content: res.content
                });
            } catch (error) {
                console.log('qna 불러오기 실패', error);
            }
        }
        if (!isWrite) fetchData();
    }, [id, isWrite, reset])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='mb-7'>
                   <UiInput
                       label="제목"
                       placeholder='제목을 입력해주세요.'
                       disabled={isView}
                       {...register("title")} />
                   <ErrorMessage message={errors.title?.message} />
               </div>
                <UiTextarea
                    label="내용"
                    placeholder='문의하실 내용을 정확히 입력해주세요.'
                    disabled={isView}
                    {...register("content")} />
                <ErrorMessage message={errors.content?.message} />

                <div className="flex w-full gap-2 mt-7">
                    {/* 왼쪽 버튼 */}
                    <UiButton
                        type="button"
                        size="m"
                        className="w-full flex-1"
                        btnText="목록"
                        onClick={() => router.push("/mypage/qna")}/>
                    <UiButton
                        type="button"
                        size="m"
                        className="w-full flex-1"
                        btnText="삭제"
                        onClick={handleDelete}/>

                    {/* 오른쪽 버튼: 모드에 따라 다르게 */}
                    {isView ? (
                        <Link href={`/mypage/qna/edit/${id}`} className="flex-1">
                            <UiButton
                                type="button"
                                size="m"
                                color="blackFill"
                                className="w-full"
                                btnText="수정"
                            />
                        </Link>
                    ) : (
                        <UiButton
                            type="submit"
                            size="m"
                            color="blackFill"
                            className="flex-1 w-full"
                            btnText={isEdit ? "수정" : "등록"}
                        />
                    )}
                </div>

            </form>
        </>
    );
}

export default QnaForm;