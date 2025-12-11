'use client'

import QnaForm from "@/components/forms/QnaForm";
import {useEffect, Suspense} from "react";

const QnaEdit = () => {

    useEffect(() => {

    }, []);

    return (
        <>
            <h2>1:1문의 수정</h2>
            <hr />
            <Suspense fallback={<p>Loading...</p>}>
                <QnaForm mode='edit' />
            </Suspense>
        </>
    )
}
export default QnaEdit;