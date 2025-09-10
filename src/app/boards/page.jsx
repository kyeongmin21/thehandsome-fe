'use client'
import {useEffect, useState} from "react";
import apiHelper from "@/api/apiHelper";
import DataTable from "@/components/ui/UiTable";
import UiButton from "@/components/ui/UiButton";
import Link from "next/link";


const BoardPage = () => {
    const [boards, setBoards] = useState([]);
    const fetchBoards = () => {
        apiHelper.axios.get('/boards')
            .then((res) => {
            setBoards(res);
        })
    }

    const columns = [
        { accessorKey: "id", header: "번호", size: 100 },
        { accessorKey: "title", header: "제목", size: 700 },
        { accessorKey: "created_at", header: "등록일", size: 150 },
        { accessorKey: "updated_at", header: "수정일", size: 150 },
    ];

    useEffect(() => {
        fetchBoards()
    }, [])

    return (
        <div className="board">
            <div className="board-wrap">
                <DataTable columns={columns} data={boards} />
                <Link href='/boards/write'>
                    <UiButton btnText='작성하기'/>
                </Link>
            </div>
        </div>
    )
}

export default BoardPage;