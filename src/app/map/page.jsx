'use client';
import {Map, MapMarker} from "react-kakao-maps-sdk";
import KakaoMap from '@/app/map/KakaoMap';
import UiButton from "@/components/ui/UiButton";
import UiModal from "@/components/ui/UiModal";
import UiCheckBox from "@/components/ui/UiCheckBox";
import UiSwitch from "@/components/ui/UiSwitch";
import UiInput from "@/components/ui/UiInput";
import UiTextarea from "@/components/ui/UiTextarea";
import UiSelect from "@/components/ui/UiSelect";
import {FaCheck} from "react-icons/fa";
import {useState} from "react";


export default function MapPage() {
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('')
    const [memo, setMemo] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [switchValue, setSwitchValue] = useState(true);

    const handleSave = () => console.log('text 상태:', text);
    const handleMemoSave = () => console.log('memo:', memo);
    const handleSelectSave = () => console.log('select:', selectValue);
    const toggleSwitch = () => setSwitchValue(!switchValue);
    const toggleModal = () => setShowModal(!showModal)

    return (
        <>
            <h1>카카오 지도</h1>
            <Map
                center={{lat: 36.2683, lng: 127.6358}}
                style={{width: "100%", height: "400px"}}
            >
                <MapMarker position={{lat: 36.2683, lng: 127.6358}}>
                    <div style={{color: "#000"}}>Hello World!</div>
                </MapMarker>
            </Map>
            <KakaoMap />



            <UiButton btnText={'모달'}
                      size={'s'}
                      color={'blackOutline'}
                      onClick={toggleModal}/>
            {showModal && (
                <UiModal
                    isOpen={showModal}
                    setIsOpen={setShowModal}
                    title={'팝업'}
                    onSave={handleSave}
                    saveText={'저장'}
                    onCancel={toggleModal}
                    cancelText={'취소'}>
                    <p>모달안에 보여질 내용입니다.</p>
                </UiModal>
            )}
            <UiCheckBox />
            <UiSwitch value={switchValue} onChange={toggleSwitch}/>

            <UiInput value={text} onChange={(e) => setText(e.target.value)}/>
            <UiTextarea value={memo} onChange={(e) => setMemo(e.target.value)}/>
            <UiSelect value={selectValue} onChange={(e) => setSelectValue(e.target.value)}/>

            <UiButton btnText={'input 저장'} color={'blackOutline'} size={'s'} onClick={handleSave}/>
            <UiButton btnText={'textarea 저장'} color={'blackOutline'} size={'m'} btnIcon={<FaCheck/>} onClick={handleMemoSave}/>
            <UiButton btnText={'select 버튼'} color={'blackOutline'} size={'l'} onClick={handleSelectSave}/>
        </>
    );
}