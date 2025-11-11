'use client'

import QnaForm from "@/components/forms/qnaForm";
import {useEffect} from "react";

const QnaEdit = () => {

    useEffect(() => {

    }, []);

    return (
        <>
            <h2>1:1문의 수정</h2>
            <hr />
            <QnaForm mode='edit' />
        </>
    )
}
export default QnaEdit;