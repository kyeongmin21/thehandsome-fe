'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import apiHelper from "@/api/apiHelper";
import DataTable from "@/components/ui/UiTable";
import UiButton from "@/components/ui/UiButton";
import Link from "next/link";
import {boardColumns} from "@/config/boardTableConfig";

const BoardPage = () => {
    const router = useRouter();
    const [boards, setBoards] = useState([]);
    const fetchBoards = () => {
        apiHelper.axios.get('/boards')
            .then((res) => {
                setBoards(res);
            })
    }

    useEffect(() => {
        fetchBoards()
    }, [])

    return (
        <div className="board">
            <div className="board-wrap">
                <DataTable columns={boardColumns(router)} data={boards}/>
                <Link href='/boards/write'>
                    <UiButton btnText='작성하기'/>
                </Link>
            </div>
        </div>
    )
}

export default BoardPage;