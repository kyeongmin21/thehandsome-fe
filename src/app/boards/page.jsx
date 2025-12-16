'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import apiHelper from "@/utils/apiHelper";
import DataTable from "@/components/ui/UiTable";
import UiButton from "@/components/ui/UiButton";
import Link from "next/link";
import {boardColumns} from "@/config/boardTableConfig";

const BoardPage = () => {
    const router = useRouter();
    const [boards, setBoards] = useState([]);
    const fetchBoards = () => {
        apiHelper.get('/boards')
            .then((res) => {
                setBoards(res);
            })
    }

    useEffect(() => {
        fetchBoards()
    }, [])

    return (
        <div className="boards">
            <div className="boards-wrap board-list">
                <div className="boards-table">
                    <DataTable
                        columns={boardColumns(router)}
                        data={boards}
                        isSearch={true}
                    />
                </div>
                <Link href='/boards/write' aria-label='게시판 작성하기 이동'>
                    <UiButton btnText='작성하기' size='s'/>
                </Link>
            </div>
        </div>
    )
}

export default BoardPage;