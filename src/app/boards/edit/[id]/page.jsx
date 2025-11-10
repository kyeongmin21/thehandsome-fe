'use client'
import UiInput from "@/components/ui/UiInput";
import UiTextarea from "@/components/ui/UiTextarea";
import Link from "next/link";
import UiButton from "@/components/ui/UiButton";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import apiHelper from "@/utils/apiHelper";

const BoardEdit = () => {
    const router = useRouter();
    const params = useParams();
    const [form, setForm] = useState({ title: "", content: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiHelper.get(`/boards/${params.id}`);
                setForm({ title: data.title, content: data.content });
            } catch (error) {
                console.error('글 불러오기 실패', error);
            }
        };

        fetchData();
    }, [params.id]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            await apiHelper.put(`/boards/${params.id}`, form);
            router.push('/boards')
        } catch (error) {
            console.log(error);
            alert('글 수정 실패')
        }
    }

    return (
        <div className="boards-wrap boards-edit">
            <ul>
                <UiInput
                    name='title'
                    value={form.title}
                    onChange={handleChange}
                    placeholder='제목을 입력해주세요.'/>

                <UiTextarea
                    name='content'
                    value={form.content}
                    onChange={handleChange}
                    height="700px"
                    placeholder='내용을 입력해주세요.'/>

                <div className="flex justify-center gap-3 mt-5">
                    <Link href='/boards'><UiButton btnText='취소'/></Link>
                    <UiButton onClick={handleSubmit} btnText='수정' color='blackFill'/>
                </div>
            </ul>
        </div>
    )
}

export default BoardEdit;