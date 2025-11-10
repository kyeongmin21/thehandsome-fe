'use client'
import Link from "next/link";
import UiInput from "@/components/ui/UiInput";
import UiTextarea from "@/components/ui/UiTextarea";
import UiButton from "@/components/ui/UiButton";
import {useForm} from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";


const QnaForm = ({ isEdit }) => {

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

    const onSubmit = (data) => {
        if (isEdit) {
            const fieldsToWatch = ['title', 'content'];
            fieldsToWatch.forEach(name => {
                if (data[name] === undefined) {
                    data[name] = watch(name);
                }
            });
        }
        try {
            console.log("폼 전송 데이터:", data);
        } catch (error) {
            console.log("폼 전송 데이터:", data);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='mb-7'>
                   <UiInput
                       label="제목"
                       placeholder='제목을 입력해주세요.'
                       {...register("title")} />
                   <ErrorMessage message={errors.title?.message} />
               </div>
                <UiTextarea
                    label="내용"
                    placeholder='문의하실 내용을 정확히 입력해주세요.'
                    {...register("content")} />
                <ErrorMessage message={errors.content?.message} />

                <div className="flex w-full gap-2 mt-7">
                    <Link href='/mypage/qna' className="flex-1">
                        <UiButton type='button' size='m' className="w-full" btnText='취소'/>
                    </Link>
                    <UiButton type='submit'
                              size='m'
                              color='blackFill'
                              className="flex-1 w-full"
                              btnText={isEdit ? '수정' : '등록'}/>
                </div>
            </form>
        </>
    );
}

export default QnaForm;