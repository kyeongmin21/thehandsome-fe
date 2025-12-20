import {Router} from "next/router";

interface QnaRow {
    id: number;
    title: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    status_label: string;
    author_id?: string;
    author_name?: string;
}

interface QnaColumn {
    accessorKey: keyof QnaRow;
    header: string;
    size: number;
    onClick?: (row: QnaRow) => void;
}


export const qnaColumns = (router: Router, isAdmin = false) => [
    {
        accessorKey: "id",
        header: "번호",
        size: 100,
    },
    {
        accessorKey: "title",
        header: "제목",
        size: 500,
        onClick: (row: QnaRow) => router.push(`/mypage/qna/${row.id}`),
    },
    {
        accessorKey: "created_at",
        header: "등록일",
        size: 200,
    },
    {
        accessorKey: "status_label",
        header: "상태",
        size: 200,
    },
    ...(isAdmin
        ? [
            { accessorKey: "author_id", header: "작성자 ID", size: 150 },
            { accessorKey: "author_name", header: "작성자 이름", size: 150 },
        ]
        : []),
];
