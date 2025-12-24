import QnaForm from "@/components/forms/QnaForm";
import {Suspense} from "react";

const QnaEdit = () => {
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