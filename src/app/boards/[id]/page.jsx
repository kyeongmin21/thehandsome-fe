'use client'
import {useState, useEffect} from 'react';
import apiHelper from "@/utils/apiHelper";
import {useParams} from "next/navigation";
import UiButton from "@/components/ui/UiButton";
import Link from "next/link";


const BoardRead = () => {
    const [value, setValue] = useState('');
    const params = useParams();


    useEffect(() => {
        apiHelper.get(`/boards/${params.id}`)
            .then(res => {
                setValue(res);
            })
    }, [])
    return (
        <div className='boards-wrap'>
            <h2 className='title'>{value.title}</h2>
            <div className='content'>{value.content}</div>
            <div className="flex justify-center gap-3 mt-5">
                <Link href='/boards'><UiButton btnText='목록'/></Link>
            </div>
        </div>
    )
}

export default BoardRead;