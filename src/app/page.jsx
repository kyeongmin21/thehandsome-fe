'use client';
import {useState} from 'react';
import {FaCheck} from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Modal from "@/components/ui/Modal";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const handleSave = () => {
        console.log('저장 클릭됨');
        setShowModal(false);
    };

    return (
        <>
        <Button btnText={'모달'} size={'s'} onClick={() => setShowModal(true)}/>
            {showModal && (
                <Modal title={"제목"}
                       saveText={'수정'}
                       cancelText={'취소'}
                       onClose={() => setShowModal(false)}
                       onSave={handleSave}>
                    <div>내용이야!!</div>
                </Modal>
            )}

            <div className="page">
                <Button btnText={'버튼'} color={'primary'} size={'s'} onClick={() => alert('hi')}/>
                <Button btnText={'버튼'} color={'danger'} size={'m'} btnIcon={<FaCheck/>}/>
                <Button btnText={'버튼'} color={'success'} size={'l'} onClick={() => alert('bye')}/>
            </div>
        </>
    )
}