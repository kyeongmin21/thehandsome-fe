'use client'
import Button from "@/components/common/Button";
import {FaCheck} from 'react-icons/fa';

export default function Home() {
    return (
        <div className="page">
            <Button btnText={'버튼'} color={'secondary'} size={'s'} onClick={() => alert('hi')}/>
            <Button btnText={'버튼'} color={'danger'} size={'m'} btnIcon={<FaCheck/>}/>
            <Button btnText={'버튼'} color={'success'} disabled={true} size={'l'} onClick={() => alert('bye')}/>
        </div>
    );
}

