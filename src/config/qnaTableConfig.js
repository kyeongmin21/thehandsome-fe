import dayjs from 'dayjs';

export const qnaColumns = (router, isAdmin = false) => [
    {
        accessorKey: "id",
        header: "번호",
        size: 100,
        cell: ({getValue}) => (
            <div className="cell"
                 style={{textAlign: "center"}}>{getValue()}</div>
        ),
    },
    {
        accessorKey: "title",
        header: "제목",
        size: 500,
        cell: ({row}) => (
            <div className="cell"
                 style={{ cursor: 'pointer' }}
                 onClick={() => router.push(`/mypage/qna/${row.original.id}`)}>{row.original.title}</div>
        )
    },
    {
        accessorKey: "created_at",
        header: "등록일",
        size: 200,
        cell: ({getValue}) => {
            return (
                <div className="cell" style={{ textAlign: "center" }}>
                    {dayjs(getValue()).format('YYYY.MM.DD HH:mm')}
                </div>
            );
        },
    },
    {
        accessorKey: "status_label",
        header: "상태",
        size: 200,
        cell: ({getValue}) => (
            <div className="cell"
                 style={{textAlign: "center"}}>{getValue()}</div>
        ),
    },
    ...(isAdmin ? [
        {
            accessorKey: "author_id",
            header: "작성자 ID",
            size: 150,
            cell: ({getValue}) => (
                <div className="cell" style={{textAlign: "center"}}>{getValue()}</div>
            ),
        },
        {
            accessorKey: "author_name",
            header: "작성자 이름",
            size: 150,
            cell: ({getValue}) => (
                <div className="cell" style={{textAlign: "center"}}>{getValue()}</div>
            ),
        }
    ] : [])
];
