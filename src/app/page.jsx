'use client';
import {useState} from 'react';
import {FaCheck} from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    const handleSave = () => {
        console.log('text 상태:', text);
    };

    const toggleModal = () => setShowModal(!showModal)

    return (
        <>
        <Button btnText={'모달'}
                size={'s'}
                color={'blackOutline'}
                onClick={toggleModal}/>
            {showModal && (
                <Modal
                    isOpen={showModal}
                    setIsOpen={setShowModal}
                    title={'팝업'}
                    onSave={handleSave}
                    saveText={'저장'}
                    onCancel={toggleModal}
                    cancelText={'취소'}>
                    <p>모달안에 보여질 내용입니다.</p>
                </Modal>
            )}

            <Checkbox />
            <Input value={text}
                   onChange={(e) => setText(e.target.value)}/>
            <Button btnText={'input 저장'} color={'blackOutline'} size={'s'} onClick={handleSave}/>
            <Button btnText={'버튼'} color={'blackOutline'} size={'m'} btnIcon={<FaCheck/>}/>
            <Button btnText={'버튼'} color={'blackOutline'} size={'l'} onClick={() => alert('bye')}/>
        </>
    )
}