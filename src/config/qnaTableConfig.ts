import {Column, QnaData} from '@/types/qna';


export const qnaColumns = (router: any, isAdmin = false): Column<QnaData>[] => {
    // 공통 컬럼 정의
    const baseColumns: Column<QnaData>[] = [
        {
            accessorKey: "id",
            header: "번호",
            size: 100,
        },
        {
            accessorKey: "title",
            header: "제목",
            size: 500,
            onClick: (row: QnaData) => router.push(`/mypage/qna/${row.id}`),
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
    ];

    // 관리자용 추가 컬럼
    const adminColumns: Column<QnaData>[] = isAdmin
        ? [
            { accessorKey: "author_id", header: "작성자 ID", size: 150 },
            { accessorKey: "author_name", header: "작성자 이름", size: 150 },
        ]
        : [];

    return [...baseColumns, ...adminColumns];
};