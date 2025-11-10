'use client'
import apiHelper from "@/utils/apiHelper";
import UiInput from "@/components/ui/UiInput";
import UiTextarea from "@/components/ui/UiTextarea";
import UiButton from "@/components/ui/UiButton";
import Link from "next/link";
import {useState} from 'react'
import {useRouter} from "next/navigation";

const BoardWrite = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        content: "",
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async () => {
        try {
            const res = await apiHelper.post("/boards", form);
            alert(res.message);
            router.push("/boards");
        } catch (error) {
            console.error(error);
            alert("글 작성 실패");
        }
    }

    return (
        <div className="boards-wrap boards-write">
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
                    placeholder='내용을 입력해주세요.'/>

                <div className="flex justify-center gap-3 mt-5">
                    <Link href='/boards'><UiButton btnText='취소'/></Link>
                    <UiButton onClick={handleSubmit} btnText='저장' color='blackFill'/>
                </div>
            </ul>
        </div>
    )
}

export default BoardWrite;